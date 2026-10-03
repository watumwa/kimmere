from rest_framework import serializers
from apps.menu.models import Category,MenuItem,MenuVariant,ModifierGroup,ModifierOption
from apps.branches.models import Branch,DeliveryZone,Rider,BusinessHour
from apps.orders.models import Order,OrderItem,OrderStatusHistory
from apps.promotions.models import Promotion
class ModifierOptionSerializer(serializers.ModelSerializer):
 class Meta: model=ModifierOption; fields=['id','name','price_delta','available']
class ModifierGroupSerializer(serializers.ModelSerializer):
 options=ModifierOptionSerializer(many=True,read_only=True)
 class Meta: model=ModifierGroup; fields=['id','name','required','min_select','max_select','options']
class VariantSerializer(serializers.ModelSerializer):
 class Meta: model=MenuVariant; fields=['id','name','price','available']
class ItemSerializer(serializers.ModelSerializer):
 variants=VariantSerializer(many=True,read_only=True); modifier_groups=ModifierGroupSerializer(many=True,read_only=True); category_name=serializers.CharField(source='category.name',read_only=True)
 class Meta: model=MenuItem; fields=['id','name','slug','description','price','image','available','featured','popular','preparation_minutes','dietary_tags','category','category_name','variants','modifier_groups']
class CategorySerializer(serializers.ModelSerializer):
 items=ItemSerializer(many=True,read_only=True)
 class Meta: model=Category; fields=['id','name','slug','items']
class ZoneSerializer(serializers.ModelSerializer):
 class Meta: model=DeliveryZone; fields='__all__'
class PromotionSerializer(serializers.ModelSerializer):
 class Meta: model=Promotion; fields='__all__'
class HistorySerializer(serializers.ModelSerializer):
 class Meta: model=OrderStatusHistory; fields=['old_status','new_status','note','created_at']
class OrderItemSerializer(serializers.ModelSerializer):
 class Meta: model=OrderItem; fields=['name','variant_name','unit_price','quantity','options','line_total']
class OrderSerializer(serializers.ModelSerializer):
 items=OrderItemSerializer(many=True,read_only=True); history=HistorySerializer(many=True,read_only=True)
 class Meta: model=Order; fields='__all__'
