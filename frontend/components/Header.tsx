"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bike,
  ChefHat,
  Clock3,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getCart } from "@/lib/cart";

const phoneNumber = "0740044426";
const whatsappUrl =
  "https://wa.me/256740044426?text=Hello%20Kimmere%20Foodhub";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/offers", label: "Offers" },
  { href: "/catering", label: "Catering" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/track-order", label: "Track Order" },
];

export default function Header() {
  const pathname = usePathname();
  const [count, setCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCount = () =>
      setCount(getCart().reduce((total, item) => total + item.quantity, 0));

    updateCount();
    addEventListener("cart-change", updateCount);
    return () => removeEventListener("cart-change", updateCount);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="siteHeader">
      <div className="utilityBar">
        <div className="utilityInner">
          <div className="utilityGroup">
            <span><MapPin size={17} /> Kampala</span>
            <i aria-hidden="true" />
            <span><Bike size={18} /> Delivery • Takeaway • Dine-in</span>
            <i aria-hidden="true" />
            <span><Clock3 size={18} /> Open Daily: 8:00 AM – 10:00 PM</span>
          </div>
          <div className="utilityGroup utilityContact">
            <a href={`tel:${phoneNumber}`}><Phone size={17} /> {phoneNumber}</a>
            <i aria-hidden="true" />
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mainNav">
        <Link className="kimmereBrand" href="/" aria-label="Kimmere Foodhub home">
          <ChefHat className="brandHat" aria-hidden="true" />
          <span className="brandName">Kimmere</span>
          <small>foodhub</small>
        </Link>

        <nav className={`desktopNav${menuOpen ? " mobileNavOpen" : ""}`} aria-label="Main navigation">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link className={active ? "active" : ""} href={item.href} key={item.href}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="navActions">
          <Link className="navIcon" href="/menu" aria-label="Search the menu"><Search size={24} /></Link>
          <Link className="navIcon" href="/account" aria-label="Your account"><UserRound size={24} /></Link>
          <Link className="referenceCartButton" href="/cart">
            <ShoppingCart size={24} /> <span>Cart ({count})</span>
          </Link>
          <button
            className="navMenuToggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>
    </header>
  );
}
