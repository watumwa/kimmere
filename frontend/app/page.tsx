import Link from 'next/link';
import {
  ArrowRight,
  Clock3,
  Coffee,
  Info,
  MapPin,
  Phone,
  ShoppingBag,
  Star,
  Truck,
  Utensils,
} from 'lucide-react';

const favourites = [
  {
    title: 'Local lunch plates',
    text: 'Luwombo, fish, beef, goat, beans and sides served hot.',
    href: '/menu',
    image: '/images/food/local-platter.jpeg',
    tag: 'From UGX 8,000',
  },
  {
    title: 'Luwombo favourites',
    text: 'Steamed banana-leaf dishes with rich sauce and proper sides.',
    href: '/menu',
    image: '/images/food/luwombo-open.jpeg',
    tag: 'House favourite',
  },
  {
    title: 'Group meals',
    text: 'Easy planning for office lunches, events and family gatherings.',
    href: '/catering',
    image: '/images/food/feast-platter.jpeg',
    tag: 'Catering',
  },
];

const guestNotes = [
  {
    quote: 'The luwombo was full of flavour and still warm when lunch arrived.',
    source: 'Office lunch · Kampala',
  },
  {
    quote: 'Ordering for the whole team was easy, and everyone found a favourite.',
    source: 'Team catering',
  },
  {
    quote: 'A proper local plate that made a busy workday feel like home.',
    source: 'Lunch regular',
  },
];

export default function Home() {
  return (
    <main className="homePage">
      <section className="cjHero" aria-label="Kimmere Foodhub">
        <div className="cjHeroMedia" aria-hidden="true">
          <div className="cjPhoto cjPhotoLeft">
            <img
              className="heroPhotoFish"
              src="/images/food/feast-platter.jpeg"
              alt=""
              fetchPriority="high"
            />
            <img
              className="heroPhotoBeef"
              src="/images/food/local-platter.jpeg"
              alt=""
            />
          </div>
        </div>

        <div className="cjHeroCopy">
          <div className="cjBrandLockup">
            <img src="/images/brand/kimmere-logo.jpg" alt="Kimmere Foodhub" />
            <span>Fresh from Kampala</span>
          </div>
          <h1>Unwrap a little Kampala warmth.</h1>
          <p>
            Banana-leaf luwombo, generous lunch plates and fresh juice, made for
            sharing or enjoying all to yourself.
          </p>
          <div className="heroActions">
            <Link className="cjStartOrder" href="/menu">
              <ShoppingBag size={22} />
              <span>Start your order</span>
              <ArrowRight size={20} />
            </Link>
            <a className="cjCallLink" href="tel:0740044426">
              <Phone size={18} /> Call 0740044426
            </a>
          </div>
        </div>

        <div className="cjHeroFoot">
          <span>
            <Clock3 size={18} /> Freshly prepared daily
          </span>
          <span>
            <MapPin size={18} /> Kampala
          </span>
        </div>
      </section>

      <section className="section homeIntro">
        <div className="container introGrid">
          <div>
            <div className="eyebrow">Kimmere Foodhub</div>
            <h2 className="title">Big meals, quick bites and event-ready plates.</h2>
          </div>
          <p className="lead">
            Local favourites, snacks, juices and coffee are ready for lunch
            rushes, family dinners, office meals and easy takeaways.
          </p>
        </div>
      </section>

      <section className="section menuShowcase">
        <div className="container">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">Menu highlights</div>
              <h2 className="title">Popular picks from the menu.</h2>
            </div>
            <Link className="textLink" href="/menu">
              View full menu <ArrowRight size={18} />
            </Link>
          </div>

          <div className="featureCards">
            {favourites.map((item) => (
              <Link className="featureCard" href={item.href} key={item.title}>
                <img src={item.image} alt={item.title} />
                <div className="featureCardBody">
                  <span>{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section orderModes">
        <div className="container modeGrid">
          <div className="modeItem">
            <Utensils size={28} />
            <h3>Dine in</h3>
            <p>Settle in for a proper plate and fresh drink.</p>
          </div>
          <div className="modeItem">
            <ShoppingBag size={28} />
            <h3>Takeaway</h3>
            <p>Order ahead and pick up without the wait.</p>
          </div>
          <div className="modeItem">
            <Truck size={28} />
            <h3>Delivery</h3>
            <p>Send meals to home, work or your next meeting.</p>
          </div>
          <div className="modeItem">
            <Coffee size={28} />
            <h3>Snacks</h3>
            <p>Tea, coffee, juices and quick bites all day.</p>
          </div>
        </div>
      </section>

      <section className="section reviewsSection">
        <div className="container">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">Around the lunch table</div>
              <h2 className="title">Made for the moments you share.</h2>
            </div>
            <span className="reviewSampleLabel">Sample guest notes</span>
          </div>
          <div className="reviewSlider" aria-label="Sample guest feedback">
            {guestNotes.map((note) => (
              <article className="reviewSlide" key={note.source}>
                <div className="reviewStars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>“{note.quote}”</blockquote>
                <p>{note.source}</p>
              </article>
            ))}
          </div>
          <p className="reviewDisclosure">Demo testimonials shown for preview; replace with verified customer reviews.</p>
        </div>
      </section>

      <section className="section finalCta">
        <div className="container finalCtaInner">
          <div>
            <div className="eyebrow">Ready when you are</div>
            <h2 className="title">Start with the menu or call the team.</h2>
          </div>
          <div className="actions">
            <Link className="btn" href="/menu">
              <Star size={18} /> Order online
            </Link>
            <Link className="btn secondary" href="/contact">
              <Info size={18} /> Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
