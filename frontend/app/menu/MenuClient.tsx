"use client";

import { useEffect, useMemo, useState } from "react";
import { api, DEMO_MODE } from "@/lib/api";
import { addCart } from "@/lib/cart";

type Item = {
  id: number;
  name: string;
  price: string;
  description: string;
  category_name: string;
  category: number;
  variants: any[];
  modifier_groups: any[];
  popular: boolean;
};

const menuPhotos = [
  "/images/food/luwombo-open.jpeg",
  "/images/food/luwombo-bowl.jpeg",
  "/images/food/local-platter.jpeg",
  "/images/food/feast-platter.jpeg",
  "/images/food/luwombo-wraps.jpeg",
];

function itemImage(item: Item) {
  const category = item.category_name.toLowerCase();
  const name = item.name.toLowerCase();

  if (category.includes("luwombo") || name.includes("luwombo")) {
    return "/images/food/luwombo-open.jpeg";
  }

  if (category.includes("fish") || category.includes("beef") || name.includes("beef")) {
    return "/images/food/local-platter.jpeg";
  }

  if (category.includes("goat") || category.includes("chicken")) {
    return "/images/food/feast-platter.jpeg";
  }

  return menuPhotos[item.id % menuPhotos.length];
}

export default function MenuClient() {
  const [items, setItems] = useState<Item[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [pick, setPick] = useState<Item | null>(null);
  const [variant, setVariant] = useState<any>(null);
  const [opts, setOpts] = useState<number[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api("/menu/items/").then(setItems).catch((e) => setMsg(e.message));
  }, []);

  const cats = ["All", ...Array.from(new Set(items.map((x) => x.category_name)))];
  const shown = useMemo(
    () =>
      items.filter(
        (x) =>
          (cat === "All" || x.category_name === cat) &&
          x.name.toLowerCase().includes(q.toLowerCase()),
      ),
    [items, q, cat],
  );

  function add() {
    if (!pick) return;
    const os = pick.modifier_groups
      .flatMap((g) => g.options)
      .filter((o: any) => opts.includes(o.id));
    const price =
      Number(variant?.price || pick.price) +
      os.reduce((s: number, o: any) => s + Number(o.price_delta), 0);

    addCart({
      id: pick.id,
      name: pick.name,
      price,
      quantity: 1,
      variant_id: variant?.id,
      variant_name: variant?.name,
      option_ids: opts,
      options: os.map((o: any) => ({ name: o.name, price: Number(o.price_delta) })),
    });
    setPick(null);
    setOpts([]);
  }

  return (
    <>
      <input
        className="search"
        placeholder="Search chicken, luwombo, juice..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {DEMO_MODE && (
        <p className="notice">Demo menu and simulated ordering are active.</p>
      )}
      <div className="filters">
        {cats.map((c) => (
          <button
            className={"filter " + (c === cat ? "active" : "")}
            onClick={() => setCat(c)}
            key={c}
          >
            {c}
          </button>
        ))}
      </div>
      {msg && <p className="notice error">{msg}</p>}
      <div className="grid">
        {shown.map((x) => (
          <article className="card" key={x.id}>
            <img src={itemImage(x)} alt={x.name} />
            <div className="cardBody">
              <div className="row">
                <span className="pill">{x.category_name}</span>
                {x.popular && <span className="pill">Popular</span>}
              </div>
              <h3>{x.name}</h3>
              <p className="lead">
                {x.description || "Freshly prepared by Kimmere Foodhub."}
              </p>
              <div className="row">
                <span className="price">UGX {Number(x.price).toLocaleString()}</span>
                <button
                  className="btn"
                  onClick={() => {
                    if (x.variants.length === 0 && x.modifier_groups.length === 0) {
                      addCart({
                        id: x.id,
                        name: x.name,
                        price: Number(x.price),
                        quantity: 1,
                        option_ids: [],
                        options: [],
                      });
                      return;
                    }
                    setPick(x);
                    setVariant(null);
                    setOpts([]);
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {pick && (
        <div className="modal" onClick={() => setPick(null)}>
          <div className="modalBox" onClick={(e) => e.stopPropagation()}>
            <div className="row">
              <h2>{pick.name}</h2>
              <button className="filter" onClick={() => setPick(null)}>
                Close
              </button>
            </div>
            {pick.variants.length > 0 && (
              <>
                <h4>Choose size</h4>
                {pick.variants.map((v) => (
                  <label key={v.id} style={{ display: "block", padding: 8 }}>
                    <input type="radio" name="v" onChange={() => setVariant(v)} />{" "}
                    {v.name} — UGX {Number(v.price).toLocaleString()}
                  </label>
                ))}
              </>
            )}
            {pick.modifier_groups.map((g) => (
              <div key={g.id}>
                <h4>{g.name}</h4>
                {g.options.map((o: any) => (
                  <label key={o.id} style={{ display: "block", padding: 8 }}>
                    <input
                      type="checkbox"
                      checked={opts.includes(o.id)}
                      onChange={() =>
                        setOpts((s) =>
                          s.includes(o.id) ? s.filter((i) => i !== o.id) : [...s, o.id],
                        )
                      }
                    />{" "}
                    {o.name}{" "}
                    {Number(o.price_delta) > 0 &&
                      `(+UGX ${Number(o.price_delta).toLocaleString()})`}
                  </label>
                ))}
              </div>
            ))}
            <button className="btn" style={{ width: "100%", marginTop: 15 }} onClick={add}>
              Add to cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
