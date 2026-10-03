from django.db import models
class CateringInquiry(models.Model):
 name=models.CharField(max_length=120); company=models.CharField(max_length=120,blank=True); phone=models.CharField(max_length=30); email=models.EmailField(blank=True); event_type=models.CharField(max_length=100); event_date=models.DateField(); guests=models.PositiveIntegerField(); location=models.CharField(max_length=255); requirements=models.TextField(blank=True); created_at=models.DateTimeField(auto_now_add=True)
 def __str__(self): return f"{self.name} - {self.event_date}"
