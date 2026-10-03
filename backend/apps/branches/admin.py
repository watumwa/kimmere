from django.contrib import admin
from .models import Branch,BusinessHour,DeliveryZone,Rider
admin.site.register([Branch,BusinessHour,DeliveryZone,Rider])
