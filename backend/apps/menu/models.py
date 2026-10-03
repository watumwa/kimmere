from django.db import models
class Category(models.Model):
 name=models.CharField(max_length=80); slug=models.SlugField(unique=True); sort_order=models.PositiveIntegerField(default=0); active=models.BooleanField(default=True)
 class Meta: ordering=["sort_order","name"]; verbose_name_plural="categories"
 def __str__(self): return self.name
class MenuItem(models.Model):
 category=models.ForeignKey(Category,on_delete=models.PROTECT,related_name="items"); name=models.CharField(max_length=120); slug=models.SlugField(unique=True); description=models.TextField(blank=True); price=models.DecimalField(max_digits=10,decimal_places=2); image=models.ImageField(upload_to="menu/",blank=True); available=models.BooleanField(default=True); featured=models.BooleanField(default=False); popular=models.BooleanField(default=False); needs_review=models.BooleanField(default=False); preparation_minutes=models.PositiveIntegerField(default=25); dietary_tags=models.CharField(max_length=160,blank=True)
 def __str__(self): return self.name
class MenuVariant(models.Model):
 item=models.ForeignKey(MenuItem,on_delete=models.CASCADE,related_name="variants"); name=models.CharField(max_length=80); price=models.DecimalField(max_digits=10,decimal_places=2); available=models.BooleanField(default=True)
 def __str__(self): return f"{self.item} - {self.name}"
class ModifierGroup(models.Model):
 name=models.CharField(max_length=100); required=models.BooleanField(default=False); min_select=models.PositiveIntegerField(default=0); max_select=models.PositiveIntegerField(default=1); items=models.ManyToManyField(MenuItem,related_name="modifier_groups",blank=True)
 def __str__(self): return self.name
class ModifierOption(models.Model):
 group=models.ForeignKey(ModifierGroup,on_delete=models.CASCADE,related_name="options"); name=models.CharField(max_length=100); price_delta=models.DecimalField(max_digits=10,decimal_places=2,default=0); available=models.BooleanField(default=True)
 def __str__(self): return self.name
