# Kimmere Foodhub — Full Stack Restaurant Commerce Platform

A Next.js customer storefront + Django REST operations backend for Kimmere Foodhub.

## Included
- Responsive Kimmere-branded public website and mobile-first ordering
- Database menu seeded from the supplied Kimmere menus
- Menu search/categories, variants and configurable modifier groups
- Persistent browser cart, guest checkout, pickup/delivery, delivery zones and promo codes
- Server-side total recalculation and immutable order price snapshots
- Order confirmation and tracking timeline
- Customer profile/address/order ownership data model
- Catering enquiry workflow
- Branches, opening hours, delivery zones and riders
- Promotions, payments foundation and order status history
- Staff management landing page, live-order-board/kitchen surfaces, Django Admin
- Protected staff dashboard API
- PostgreSQL-ready settings, Docker Compose, environment templates

## Run locally
### Backend
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py makemigrations
python manage.py migrate
python manage.py seed_kimmere
python manage.py createsuperuser
python manage.py runserver 8000
```

### Frontend
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```
Open http://localhost:3000. Admin: http://127.0.0.1:8000/admin/

## Production notes
Use PostgreSQL, object storage for media, HTTPS, strong `DJANGO_SECRET_KEY`, strict hosts/origins, and a production WSGI host. Mobile Money/card, SMS/WhatsApp and production email require provider credentials and are intentionally not faked. The payment/order models are ready for provider integration.

## Important menu note
The supplied artwork has an ambiguous Boiled Eggs listing. Seed data flags uncertain data for administrator review rather than inventing a price.
