from django.core.management.base import BaseCommand
from django.utils.text import slugify
from apps.menu.models import Category,MenuItem,MenuVariant
from apps.branches.models import Branch,DeliveryZone,BusinessHour
from apps.menu.models import ModifierGroup,ModifierOption
from apps.promotions.models import Promotion
from django.contrib.auth.models import Group
DATA={'Chips': [('Chips Plain', 10000), ('Chips Fillets', 15000), ('Chips Fish Fingers', 15000), ('Chips Sausage', 12000), ('Chips Goat', 20000)], 'Chicken': [('Chicken Luwombo', 20000)], 'Goat': [('Goat Luwombo', 20000)], 'Beef': [('Beef Luwombo', 20000), ('Beef Stew', 19000)], 'Fish': [('Fish Luwombo', 20000), ('Fish Stew', 24000), ('Dry Fish', 22000)], 'Local Foods': [('Mushroom Luwombo', 15000), ('Plain Nuts', 10000), ('Beans', 8000), ('Peas', 10000), ('Kigere (Luwombo / Mukoneno)', 15000), ('Ebo (Eitoke & Gravy)', 15000)], 'Tea & Coffee': [('African Tea', 4000), ('Black Tea', 3000), ('Milk Coffee', 7000), ('Black Coffee', 7000), ('Lemon Tea', 8000), ('Iced Tea', 10000), ('Herbal Tea', 8000)], 'Snacks': [('Chapati', 1000), ('Chap', 4000), ('Kebab', 3000), ('Samosa (1 pc)', 2000), ('Doughnuts', 2000), ('Egg Rolls', 2000), ('Sausage (1 pair)', 2500), ('Toasted Bread', 1500), ('Pizza (Small)', 5000), ('Large Pizza', 15000), ('Yellow Banana (1 pair)', 1000), ('Boiled Eggs', 1000), ('Omelette', 3000), ('Spanish Omelette', 5000), ('Scrambled Eggs', 5000), ('Cheese Omelette', 10000)], 'Fast Foods': [('Chips Plain (Fast Food)', 8000), ('Chips Chicken', 20000), ('Chicken Plain', 12000), ('Chips Chap', 12000), ('Chips Liver', 18000), ('Chips Kebab', 11000)], 'Juices & Drinks': [('Pineapple', 6000), ('Passion Fruit', 6000), ('Watermelon', 6000), ('Mango Juice', 6000), ('Cocktail', 10000), ('Rwenzori (Small)', 2000), ('Nivana', 1000), ('Sodas', 2000), ('Minute Maid (Small)', 4000), ('Minute Maid (Big)', 6000), ('Oner', 4000), ('Rockboom', 4000), ('Banana Juice', 6000)]}
class Command(BaseCommand):
 def handle(self,*args,**kwargs):
  branch,_=Branch.objects.get_or_create(code="KIM01",defaults={"name":"Kimmere Foodhub","phone":"0740044426","address":"Kampala, Uganda"})
  DeliveryZone.objects.get_or_create(branch=branch,name="Kampala Central",defaults={"fee":5000,"estimated_minutes":45})
  for i,(cat,rows) in enumerate(DATA.items()):
   c,_=Category.objects.get_or_create(slug=slugify(cat),defaults={"name":cat,"sort_order":i})
   for name,price in rows: MenuItem.objects.get_or_create(slug=slugify(name),defaults={"category":c,"name":name,"price":price,"description":"Freshly prepared by Kimmere Foodhub."})
  fish=MenuItem.objects.filter(slug="chips-fish").first()
  if not fish:
   c=Category.objects.get(slug="fast-foods"); fish=MenuItem.objects.create(category=c,name="Chips Fish",slug="chips-fish",price=28000,description="Choose small or big.")
  MenuVariant.objects.get_or_create(item=fish,name="Small",defaults={"price":28000}); MenuVariant.objects.get_or_create(item=fish,name="Big",defaults={"price":38000})
  for day in range(7): BusinessHour.objects.get_or_create(branch=branch,weekday=day,defaults={"open_time":"08:00","close_time":"22:00"})
  sides,_=ModifierGroup.objects.get_or_create(name="Choose an accompaniment",defaults={"required":False,"max_select":2})
  for n in ["Matooke","Rice","Potatoes","Cassava"]: ModifierOption.objects.get_or_create(group=sides,name=n,defaults={"price_delta":0})
  sides.items.add(*MenuItem.objects.filter(category__name__in=["Chicken","Goat","Beef","Fish","Local Foods"]))
  Promotion.objects.get_or_create(title="Welcome to Kimmere",defaults={"description":"Promotions can be configured by management.","active":False})
  for name in ["Owner","General Manager","Branch Manager","Kitchen Staff","Order Manager","Delivery Manager","Delivery Rider","Marketing Manager","Customer Support"]: Group.objects.get_or_create(name=name)
  self.stdout.write(self.style.SUCCESS("Kimmere seed data ready."))
