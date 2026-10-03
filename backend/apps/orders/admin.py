from django.contrib import admin
from .models import Order,OrderItem,OrderStatusHistory,Payment
class OrderItemInline(admin.TabularInline): model=OrderItem; extra=0; readonly_fields=('name','variant_name','unit_price','quantity','line_total')
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
 list_display=('order_number','customer_name','fulfilment','status','payment_status','total','created_at'); list_filter=('status','fulfilment','payment_status'); search_fields=('order_number','customer_name','phone'); inlines=[OrderItemInline]
admin.site.register([OrderStatusHistory,Payment])
