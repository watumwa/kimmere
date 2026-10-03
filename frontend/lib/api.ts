import { demoDeliveryZones, demoMenuItems } from "@/lib/demo-data";

export const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api/v1";
export const DEMO_MODE = !["false", "0"].includes(
	process.env.NEXT_PUBLIC_DEMO_MODE?.toLowerCase() || "",
);

const DEMO_ORDERS_KEY = "kimmere-demo-orders";

function readDemoOrders() {
	if (typeof window === "undefined") return [];
	try {
		return JSON.parse(localStorage.getItem(DEMO_ORDERS_KEY) || "[]");
	} catch {
		return [];
	}
}

function writeDemoOrders(orders: any[]) {
	if (typeof window !== "undefined") {
		localStorage.setItem(DEMO_ORDERS_KEY, JSON.stringify(orders));
	}
}

function demoOrderTotal(body: any) {
	const itemsTotal = (body.items || []).reduce((total: number, line: any) => {
		const item = demoMenuItems.find((menuItem) => menuItem.id === Number(line.id));
		if (!item) return total;

		const variant = item.variants.find((choice) => choice.id === Number(line.variant_id));
		const optionTotal = item.modifier_groups
			.flatMap((group) => group.options)
			.filter((option) => (line.option_ids || []).includes(option.id))
			.reduce((sum, option) => sum + Number(option.price_delta), 0);

		return total + (Number(variant?.price || item.price) + optionTotal) * Number(line.quantity || 1);
	}, 0);

	const zone = demoDeliveryZones.find((deliveryZone) => deliveryZone.id === Number(body.delivery_zone));
	return itemsTotal + (body.fulfilment === "delivery" ? zone?.fee || 0 : 0);
}

async function demoApi(path: string, init?: RequestInit) {
	const method = (init?.method || "GET").toUpperCase();
	const body = typeof init?.body === "string" ? JSON.parse(init.body || "{}") : {};

	if (path === "/menu/items/" && method === "GET") return demoMenuItems;
	if (path === "/delivery/zones/" && method === "GET") return demoDeliveryZones;

	if (path === "/checkout/" && method === "POST") {
		const order = {
			order_number: `KIM-${new Date().getFullYear()}-${String(Date.now() % 1_000_000).padStart(6, "0")}`,
			total: demoOrderTotal(body),
			status: "confirmed",
			history: [{ new_status: "confirmed", created_at: new Date().toISOString() }],
		};
		writeDemoOrders([order, ...readDemoOrders()]);
		return order;
	}

	const trackingMatch = path.match(/^\/orders\/track\/([^/]+)\/?$/);
	if (trackingMatch && method === "GET") {
		const orderNumber = decodeURIComponent(trackingMatch[1]);
		const order = readDemoOrders().find((entry: any) => entry.order_number === orderNumber);
		if (order) return order;
		if (orderNumber === "KIM-2026-000001") {
			return {
				order_number: orderNumber,
				total: 28500,
				status: "preparing",
				history: [
					{ new_status: "received", created_at: "2026-10-03T09:00:00.000Z" },
					{ new_status: "confirmed", created_at: "2026-10-03T09:02:00.000Z" },
					{ new_status: "preparing", created_at: "2026-10-03T09:05:00.000Z" },
				],
			};
		}
		throw new Error("Demo order not found. Try KIM-2026-000001 or place an order first.");
	}

	if (path === "/catering/" && method === "POST") {
		return { id: Date.now(), message: "Demo catering request received." };
	}

	const authMatch = path.match(/^\/auth\/(login|register)\/?$/);
	if (authMatch && method === "POST") {
		return { name: body.name || body.username, username: body.username };
	}

	throw new Error(`No demo response configured for ${method} ${path}`);
}

export async function api(path: string, init?: RequestInit) {
	if (DEMO_MODE) return demoApi(path, init);

	const response = await fetch(`${API}${path}`, {
		...init,
		headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
		cache: "no-store",
	});
	const data = await response.json().catch(() => ({}));
	if (!response.ok) throw new Error(data.detail || "Request failed");
	return data;
}
