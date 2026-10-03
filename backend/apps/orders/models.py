from django.conf import settings
from django.db import models
from apps.branches.models import Branch,DeliveryZone,Rider
class Order(models.Model):
 STATUS=[(x,x) for x in ["Pending","Awaiting Payment","Payment Confirmed","Confirmed","Preparing","Ready","Out for Delivery","Delivered","Completed","Cancelled","Rejected","Refunded"]]; FULFIL=[("delivery","Delivery"),("pickup","Pickup")]
 branch=models.ForeignKey(Branch,on_delete=models.PROTECT); customer=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True,blank=True,related_name='orders'); order_number=models.CharField(max_length=30,unique=True,blank=True); customer_name=models.CharField(max_length=120); phone=models.CharField(max_length=30); email=models.EmailField(blank=True); fulfilment=models.CharField(max_length=20,choices=FULFIL); delivery_zone=models.ForeignKey(DeliveryZone,on_delete=models.SET_NULL,null=True,blank=True); rider=models.ForeignKey(Rider,on_delete=models.SET_NULL,null=True,blank=True); address=models.TextField(blank=True); notes=models.TextField(blank=True); status=models.CharField(max_length=30,choices=STATUS,default="Pending"); payment_method=models.CharField(max_length=30,default='cash'); payment_status=models.CharField(max_length=30,default='Pending'); subtotal=models.DecimalField(max_digits=12,decimal_places=2,default=0); discount=models.DecimalField(max_digits=12,decimal_places=2,default=0); delivery_fee=models.DecimalField(max_digits=12,decimal_places=2,default=0); total=models.DecimalField(max_digits=12,decimal_places=2,default=0); created_at=models.DateTimeField(auto_now_add=True); updated_at=models.DateTimeField(auto_now=True)
 def save(self,*args,**kwargs):
  super().save(*args,**kwargs)
  if not self.order_number: self.order_number=f"KIM-{self.created_at.year}-{self.pk:06d}"; super().save(update_fields=['order_number'])
 def __str__(self): return self.order_number or 'New order'
class OrderItem(models.Model):
 order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name='items'); menu_item_id_snapshot=models.PositiveIntegerField(null=True); name=models.CharField(max_length=120); variant_name=models.CharField(max_length=80,blank=True); unit_price=models.DecimalField(max_digits=10,decimal_places=2); quantity=models.PositiveIntegerField(default=1); options=models.JSONField(default=list,blank=True); line_total=models.DecimalField(max_digits=12,decimal_places=2)
class OrderStatusHistory(models.Model):
 order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name='history'); old_status=models.CharField(max_length=30,blank=True); new_status=models.CharField(max_length=30); note=models.TextField(blank=True); actor=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True,blank=True); created_at=models.DateTimeField(auto_now_add=True)
class Payment(models.Model):
 order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name='payments'); provider=models.CharField(max_length=40); reference=models.CharField(max_length=120,blank=True); amount=models.DecimalField(max_digits=12,decimal_places=2); status=models.CharField(max_length=30,default='Pending'); created_at=models.DateTimeField(auto_now_add=True)
