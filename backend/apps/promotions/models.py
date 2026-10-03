from django.db import models
class Promotion(models.Model):
 TYPES=[('percent','Percentage'),('fixed','Fixed amount'),('free_delivery','Free delivery')]; title=models.CharField(max_length=120); code=models.CharField(max_length=30,blank=True,unique=True,null=True); description=models.TextField(blank=True); discount_type=models.CharField(max_length=20,choices=TYPES,default='percent'); value=models.DecimalField(max_digits=10,decimal_places=2,default=0); minimum_spend=models.DecimalField(max_digits=10,decimal_places=2,default=0); active=models.BooleanField(default=True); starts_at=models.DateTimeField(null=True,blank=True); ends_at=models.DateTimeField(null=True,blank=True)
 def __str__(self): return self.title
