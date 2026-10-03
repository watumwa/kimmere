from django.db import models
class Branch(models.Model):
 name=models.CharField(max_length=120); code=models.CharField(max_length=20,unique=True); address=models.CharField(max_length=255,blank=True); phone=models.CharField(max_length=30,blank=True); email=models.EmailField(blank=True); active=models.BooleanField(default=True); accepting_orders=models.BooleanField(default=True); delivery_enabled=models.BooleanField(default=True); pickup_enabled=models.BooleanField(default=True)
 def __str__(self): return self.name
class BusinessHour(models.Model):
 branch=models.ForeignKey(Branch,on_delete=models.CASCADE,related_name="hours"); weekday=models.PositiveSmallIntegerField(choices=[(i,n) for i,n in enumerate(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'])]); open_time=models.TimeField(null=True,blank=True); close_time=models.TimeField(null=True,blank=True); closed=models.BooleanField(default=False)
 class Meta: unique_together=('branch','weekday'); ordering=['weekday']
class DeliveryZone(models.Model):
 branch=models.ForeignKey(Branch,on_delete=models.CASCADE,related_name="delivery_zones"); name=models.CharField(max_length=100); fee=models.DecimalField(max_digits=10,decimal_places=2,default=0); minimum_order=models.DecimalField(max_digits=10,decimal_places=2,default=0); estimated_minutes=models.PositiveIntegerField(default=45); active=models.BooleanField(default=True)
 def __str__(self): return self.name
class Rider(models.Model):
 branch=models.ForeignKey(Branch,on_delete=models.PROTECT,related_name='riders'); name=models.CharField(max_length=120); phone=models.CharField(max_length=30); active=models.BooleanField(default=True); available=models.BooleanField(default=True)
 def __str__(self): return self.name
