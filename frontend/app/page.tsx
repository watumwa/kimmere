"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bike,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Leaf,
  ShoppingBag,
  Sprout,
  Star,
  UsersRound,
  UtensilsCrossed,
} from "lucide-react";

const dishes = [
  {
    name: "Beef Stew",
    detail: "with Rice, Greens & Salad",
    image: "/images/food/local-platter.jpeg",
    position: "center",
    thumbnailPosition: "-891px -647px",
  },
  {
    name: "Chicken Luwombo",
    detail: "Slow-steamed in banana leaf",
    image: "/images/food/luwombo-open.jpeg",
    position: "center",
    thumbnailPosition: "-1038px -647px",
  },
  {
    name: "Grilled Chicken",
    detail: "with golden sides & salad",
    image: "/images/food/feast-platter.jpeg",
    position: "center",
    thumbnailPosition: "-1189px -647px",
  },
  {
    name: "Fish Luwombo",
    detail: "A slow-cooked local favourite",
    image: "/images/food/luwombo-bowl.jpeg",
    position: "center",
    thumbnailPosition: "-1339px -647px",
  },
  {
    name: "Fresh Juices",
    detail: "Cold & freshly blended",
    image: "/images/menu/menu-snacks.jpg",
    position: "right center",
    thumbnailPosition: "-1488px -647px",
  },
];

const servicePoints = [
  { icon: Sprout, title: "Freshly", detail: "Prepared Daily" },
  { icon: UtensilsCrossed, title: "Local", detail: "Favourites" },
  { icon: Bike, title: "Fast", detail: "Delivery" },
  { icon: UsersRound, title: "Perfect for", detail: "Groups & Events" },
];

export default function Home() {
  const [activeDish, setActiveDish] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveDish((current) => (current + 1) % dishes.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const selectPreviousDish = () =>
    setActiveDish((current) => (current - 1 + dishes.length) % dishes.length);

  const selectNextDish = () =>
    setActiveDish((current) => (current + 1) % dishes.length);

  const currentDish = dishes[activeDish];

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

        <div className="foodCarousel" aria-label="Featured dishes carousel">
          {activeDish !== 0 && (
            <img
              className="changingHeroDish"
              key={currentDish.name}
              src={currentDish.image}
              style={{ objectPosition: currentDish.position }}
              alt={currentDish.name}
            />
          )}

          <div className="carouselDishLabel" aria-live="polite">
            <small>Signature Dish</small>
            <strong>{currentDish.name}</strong>
            <span>{currentDish.detail}</span>
          </div>

          <button
            className="carouselArrow carouselArrowLeft"
            type="button"
            onClick={selectPreviousDish}
            aria-label="Show previous dish"
          >
            <ChevronLeft size={30} />
          </button>
          <button
            className="carouselArrow carouselArrowRight"
            type="button"
            onClick={selectNextDish}
            aria-label="Show next dish"
          >
            <ChevronRight size={30} />
          </button>

          <div className="foodCarouselRail">
            <div className="dishThumbnails">
              {dishes.map((dish, index) => (
                <button
                  className={`dishThumbnail${index === activeDish ? " active" : ""}`}
                  type="button"
                  key={dish.name}
                  onClick={() => setActiveDish(index)}
                  aria-label={`Show ${dish.name}`}
                  aria-current={index === activeDish ? "true" : undefined}
                >
                  <span
                    className="dishThumbImage"
                    style={{ backgroundPosition: dish.thumbnailPosition }}
                    aria-hidden="true"
                  />
                  <span>{dish.name}</span>
                </button>
              ))}
            </div>
            <div className="carouselDots" aria-hidden="true">
              {dishes.map((dish, index) => (
                <span className={index === activeDish ? "active" : ""} key={dish.name} />
              ))}
            </div>
          </div>
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
              <div className="ratingCopy">
                <div className="ratingStars" aria-label="4.8 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={18} fill="currentColor" />)}
                </div>
                <span><strong>4.8</strong> from 1,200+ happy customers</span>
              </div>
            </div>
          </div>

          <div className="mobileFoodVisual">
            <img
              key={currentDish.name}
              src={currentDish.image}
              style={{ objectPosition: currentDish.position }}
              alt={currentDish.name}
            />
            <span><small>Signature Dish</small><strong>{currentDish.name}</strong></span>
            <div className="mobileCarouselDots" aria-label="Choose a featured dish">
              {dishes.map((dish, index) => (
                <button
                  className={index === activeDish ? "active" : ""}
                  type="button"
                  key={dish.name}
                  onClick={() => setActiveDish(index)}
                  aria-label={`Show ${dish.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
