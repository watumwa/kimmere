from django.test import TestCase
from rest_framework.test import APIClient
from apps.branches.models import Branch,DeliveryZone
from apps.menu.models import Category,MenuItem
class CommerceTests(TestCase):
 def setUp(self):
  self.client=APIClient(); self.branch=Branch.objects.create(name='Kimmere',code='KIM01'); self.zone=DeliveryZone.objects.create(branch=self.branch,name='Central',fee=5000); c=Category.objects.create(name='Chicken',slug='chicken'); self.item=MenuItem.objects.create(category=c,name='Chicken Luwombo',slug='chicken-luwombo',price=20000)
 def test_health(self): self.assertEqual(self.client.get('/api/v1/health/').status_code,200)
 def test_backend_recalculates_checkout(self):
  r=self.client.post('/api/v1/checkout/',{'customer_name':'Test','phone':'0700000000','fulfilment':'pickup','items':[{'id':self.item.id,'quantity':2,'price':1}]},format='json'); self.assertEqual(r.status_code,201); self.assertEqual(float(r.data['total']),40000)
 def test_delivery_fee(self):
  r=self.client.post('/api/v1/checkout/',{'customer_name':'Test','phone':'0700000000','fulfilment':'delivery','delivery_zone':self.zone.id,'address':'Kampala','items':[{'id':self.item.id,'quantity':1}]},format='json'); self.assertEqual(float(r.data['total']),25000)
