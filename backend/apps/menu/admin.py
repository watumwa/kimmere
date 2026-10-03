from django.contrib import admin
from .models import Category,MenuItem,MenuVariant,ModifierGroup,ModifierOption
admin.site.register([Category,MenuItem,MenuVariant,ModifierGroup,ModifierOption])
