import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

const phoneNumber = "0740044426";
const whatsappUrl = "https://wa.me/256740044426?text=Hello%20Kimmere%20Foodhub";
const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Kampala%2C%20Uganda";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footerGrid">
        <div>
          <h2>Kimmere Foodhub</h2>
          <p>Fresh local favourites, fast foods, snacks and drinks for Kampala.</p>
          <a className="footerAction" href={`tel:${phoneNumber}`}>
            <Phone size={17} /> {phoneNumber}
          </a>
          <a className="footerAction" href={whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={17} /> Chat on WhatsApp
          </a>
        </div>
        <div>
          <h3>Order</h3>
          <p><Link href="/menu">Menu</Link></p>
          <p><Link href="/track-order">Track order</Link></p>
          <p><Link href="/offers">Offers</Link></p>
        </div>
        <div>
          <h3>Visit & catering</h3>
          <p>Delivery across Kampala and nearby areas.</p>
          <div className="footerMap">
            <iframe
              title="Kampala delivery area map"
              src="https://maps.google.com/maps?q=Kampala%20Uganda&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a className="footerMapLink" href={mapsUrl} target="_blank" rel="noreferrer">
            View Kampala on Google Maps
          </a>
          <p><Link href="/catering">Catering enquiries</Link></p>
          <p><Link href="/contact">Contact</Link></p>
        </div>
      </div>
      <div className="container footerCopyright">
        © 2026 Kimmere Foodhub. All rights reserved.
      </div>
    </footer>
  );
}