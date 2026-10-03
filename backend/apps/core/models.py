from django.db import models
class SiteSetting(models.Model):
 business_name=models.CharField(max_length=120,default="Kimmere Foodhub"); phone=models.CharField(max_length=30,default="0740044426"); tagline=models.CharField(max_length=180,default="Great Food. Made Fresh. Delivered to You."); address=models.CharField(max_length=255,blank=True)
