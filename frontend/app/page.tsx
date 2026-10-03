import Link from 'next/link';
import {
  ArrowRight,
  ChefHat,
  Clock3,
  Coffee,
  Gift,
  Info,
  MapPin,
  MessageCircle,
  PartyPopper,
  Phone,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Utensils,
} from 'lucide-react';

const heroLinks = [
  { href: '/menu', label: 'Menu', Icon: ChefHat },
  { href: '/offers', label: 'Offers', Icon: Gift },
  { href: '/catering', label: 'Catering', Icon: PartyPopper },
  { href: '/gallery', label: 'Gallery', Icon: Sparkles },
  { href: '/contact', label: 'Contact', Icon: MessageCircle },
];

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

export default function Home() {
  return (
    <main className="homePage">
      <section className="cjHero" aria-label="Kimmere Foodhub">
        <div className="cjHeroMedia" aria-hidden="true">
          <div className="cjPhoto cjPhotoLeft">
            <img src="/images/food/luwombo-bowl.jpeg" alt="" />
          </div>
          <div className="cjPhoto cjPhotoRight">
            <img src="/images/food/feast-platter.jpeg" alt="" />
          </div>
        </div>

        <div className="cjHeroCopy">
          <div className="cjBrandLockup">
            <img src="/images/brand/kimmere-logo.jpg" alt="Kimmere Foodhub" />
            <span>Dining • Takeaway • Delivery</span>
          </div>
          <h1>Fresh local flavour, served your way.</h1>
          <p>
            Rich Ugandan meals, quick snacks, fresh juices and coffee prepared
            for dine-in, pickup and delivery around Kampala.
          </p>
        </div>

        <Link className="cjStartOrder" href="/menu">
          <ShoppingBag size={30} />
          <span>Start order</span>
        </Link>

        <aside className="cjNavCard" aria-label="Featured navigation">
          <div className="cjLogoText">Kimmere</div>
          <p>foodhub</p>
          <nav>
            {heroLinks.map(({ href, label, Icon }) => (
              <Link href={href} key={label}>
                <Icon size={23} strokeWidth={1.7} />
                <span>{label}</span>
                <ArrowRight size={18} strokeWidth={1.8} />
              </Link>
            ))}
          </nav>
        </aside>

        <div className="cjHeroFoot">
          <span>
            <Phone size={18} /> 0740044426
          </span>
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
