from django.db import models
class AuditLog(models.Model):
 action=models.CharField(max_length=120); entity=models.CharField(max_length=80); entity_id=models.CharField(max_length=80,blank=True); metadata=models.JSONField(default=dict,blank=True); created_at=models.DateTimeField(auto_now_add=True)
