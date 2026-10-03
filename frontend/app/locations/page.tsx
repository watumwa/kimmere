import { Clock3, MapPin } from "lucide-react";

const deliveryZones = [
  {
    title: "Central hub",
    areas: ["Kampala Boulevard", "Parliamentary Avenue"],
    time: "30–40 mins",
  },
  {
    title: "Outskirts",
    areas: ["Naalya / Namugongo", "Entebbe Road Corridor"],
    time: "About 60 mins",
  },
];

export default function LocationsPage() {
  return (
    <main className="section locationsPage">
      <div className="container">
        <div className="eyebrow">Kampala delivery</div>
        <h1 className="title">Our delivery zones</h1>
        <p className="lead">
          We bring Kimmere favourites across Kampala. Times are estimates and can
          vary with traffic and order volume.
        </p>

        <div className="locationsMap">
          <iframe
            title="Kampala delivery area map"
            src="https://maps.google.com/maps?q=Kampala%20Uganda&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="locationZones">
          {deliveryZones.map((zone) => (
            <article className="locationZone" key={zone.title}>
              <div className="eyebrow"><MapPin size={15} /> {zone.title}</div>
              <ul>
                {zone.areas.map((area) => <li key={area}>{area}</li>)}
              </ul>
              <p className="locationTime"><Clock3 size={17} /> Estimated delivery: <strong>{zone.time}</strong></p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}