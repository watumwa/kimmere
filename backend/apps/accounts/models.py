from django.conf import settings
from django.db import models
class CustomerProfile(models.Model):
 user=models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='customer_profile'); phone=models.CharField(max_length=30,blank=True); marketing_opt_in=models.BooleanField(default=False)
class CustomerAddress(models.Model):
 user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='addresses'); label=models.CharField(max_length=60,default='Home'); address=models.TextField(); landmark=models.CharField(max_length=160,blank=True); is_default=models.BooleanField(default=False)
