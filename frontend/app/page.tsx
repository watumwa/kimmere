import Link from "next/link";
import {
  ArrowRight,
  Bike,
  CirclePlay,
  Leaf,
  ShoppingBag,
  Sprout,
  Star,
  UsersRound,
  UtensilsCrossed,
} from "lucide-react";

const servicePoints = [
  { icon: Sprout, title: "Freshly", detail: "Prepared Daily" },
  { icon: UtensilsCrossed, title: "Local", detail: "Favourites" },
  { icon: Bike, title: "Fast", detail: "Delivery" },
  { icon: UsersRound, title: "Perfect for", detail: "Groups & Events" },
];

export default function Home() {
  return (
    <main className="warmthHome">
      <section className="warmthHero" aria-labelledby="warmth-title">
        <Leaf className="botanical botanicalOne" aria-hidden="true" />
        <Leaf className="botanical botanicalTwo" aria-hidden="true" />

        <div className="referenceHeroArt" role="img" aria-label="Beef stew with rice, greens and salad">
          <img
            src="/images/reference/kimmere-kampala-warmth.png"
            alt=""
            aria-hidden="true"
          />
        </div>

        <div className="warmthHeroInner">
          <div className="warmthCopy">
            <div className="freshEyebrow">
              <span><Leaf size={20} /></span>
              Fresh from Kampala
            </div>

            <h1 id="warmth-title">
              <span className="headlineLine headlineLineOne">Unwrap a little</span>
              <span className="headlineLine headlineLineTwo"><em>Kampala</em> warmth.</span>
            </h1>
            <span className="orangeSwoosh" aria-hidden="true" />

            <p className="warmthLead">
              Banana-leaf luwombo, generous lunch plates and fresh juice,<br className="desktopBreak" />
              made for sharing or enjoying all to yourself.
            </p>

            <div className="warmthActions">
              <Link className="startOrderButton" href="/menu">
                <ShoppingBag size={21} />
                <span>Start your order</span>
                <ArrowRight size={23} />
              </Link>
              <Link className="storyButton" href="/about">
                <CirclePlay size={22} /> Watch our story
              </Link>
            </div>

            <div className="servicePoints" aria-label="Why order from Kimmere">
              {servicePoints.map(({ icon: Icon, title, detail }) => (
                <div className="servicePoint" key={title}>
                  <span className="serviceIcon"><Icon size={24} /></span>
                  <span><strong>{title}</strong><small>{detail}</small></span>
                </div>
              ))}
            </div>

            <div className="customerProof">
              <div className="customerFaces customerFacesReference" aria-hidden="true" />
              <div className="ratingCopy">
                <div className="ratingStars" aria-label="4.8 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={18} fill="currentColor" />)}
                </div>
                <span><strong>4.8</strong> from 1,200+ happy customers</span>
              </div>
            </div>
          </div>

          <div className="mobileFoodVisual">
            <img src="/images/food/local-platter.jpeg" alt="Beef stew with rice, greens and salad" />
            <span><small>Signature Dish</small><strong>Beef Stew</strong></span>
          </div>
        </div>
      </section>
    </main>
  );
}
