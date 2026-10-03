"use client";

import Link from "next/link";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { getCart } from "@/lib/cart";

const phoneNumber = "0740044426";
const whatsappUrl = "https://wa.me/256740044426?text=Hello%20Kimmere%20Foodhub";

export default function Header() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () =>
      setCount(getCart().reduce((total, item) => total + item.quantity, 0));

    updateCount();
    addEventListener("cart-change", updateCount);
    return () => removeEventListener("cart-change", updateCount);
  }, []);

  return (
    <>
      <div className="top">
        <span>Dining · Takeaway · Delivery around Kampala</span>
        <span aria-hidden="true">|</span>
        <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          <MessageCircle size={14} /> WhatsApp
        </a>
      </div>
      <div className="container nav">
        <Link className="brand" href="/">
          <img src="/images/brand/kimmere-logo.jpg" alt="Kimmere Foodhub" />
          <span>KIMMERE</span>
        </Link>
        <nav className="links" aria-label="Main navigation">
          <Link href="/menu">Menu</Link>
          <Link href="/offers">Offers</Link>
          <Link href="/catering">Catering</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/track-order">Track Order</Link>
        </nav>
        <Link className="btn headerCart" href="/cart">
          <ShoppingBag size={17} /> Cart ({count})
        </Link>
      </div>
      <Link className="mobileCart btn" href="/cart" aria-label={`Open cart, ${count} items`}>
        <ShoppingBag size={19} /> Cart ({count})
      </Link>
    </>
  );
}