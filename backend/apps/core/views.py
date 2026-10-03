from decimal import Decimal
from django.db import transaction
from django.db.models import Sum,Count
from django.utils import timezone
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from apps.menu.models import Category,MenuItem,MenuVariant,ModifierOption
from apps.branches.models import Branch,DeliveryZone
from apps.orders.models import Order,OrderItem,OrderStatusHistory
from apps.promotions.models import Promotion
from apps.catering.models import CateringInquiry
from .serializers import CategorySerializer,ItemSerializer,ZoneSerializer,OrderSerializer,PromotionSerializer
@api_view(['GET'])
def health(r): return Response({'status':'ok','brand':'Kimmere Foodhub'})
@api_view(['GET'])
def categories(r): return Response(CategorySerializer(Category.objects.filter(active=True).prefetch_related('items__variants','items__modifier_groups__options'),many=True,context={'request':r}).data)
@api_view(['GET'])
def items(r):
 qs=MenuItem.objects.filter(available=True).select_related('category').prefetch_related('variants','modifier_groups__options'); q=r.GET.get('q'); cat=r.GET.get('category')
 if q: qs=qs.filter(name__icontains=q)
 if cat: qs=qs.filter(category__slug=cat)
 return Response(ItemSerializer(qs,many=True,context={'request':r}).data)
@api_view(['GET'])
def zones(r): return Response(ZoneSerializer(DeliveryZone.objects.filter(active=True),many=True).data)
@api_view(['GET'])
def promotions(r): return Response(PromotionSerializer(Promotion.objects.filter(active=True),many=True).data)
@api_view(['POST'])
def catering(r):
 d=r.data
 obj=CateringInquiry.objects.create(name=d.get('name',''),company=d.get('company',''),phone=d.get('phone',''),email=d.get('email',''),event_type=d.get('event_type',''),event_date=d.get('event_date'),guests=d.get('guests',1),location=d.get('location',''),requirements=d.get('requirements',''))
 return Response({'id':obj.id,'detail':'Catering request received.'},status=201)
@api_view(['POST'])
@transaction.atomic
def checkout(r):
 d=r.data; raw=d.get('items',[])
 if not raw or not d.get('customer_name') or not d.get('phone'): return Response({'detail':'Name, phone and cart items are required.'},status=400)
 branch=Branch.objects.filter(active=True,accepting_orders=True).first()
 if not branch:return Response({'detail':'Ordering is temporarily unavailable.'},status=400)
 subtotal=Decimal('0'); prepared=[]
 for row in raw:
  try:item=MenuItem.objects.get(pk=row.get('id'),available=True)
  except MenuItem.DoesNotExist:return Response({'detail':'A selected item is unavailable.'},status=400)
  qty=max(1,int(row.get('quantity',1))); unit=item.price; variant_name=''
  if row.get('variant_id'):
   try:v=MenuVariant.objects.get(pk=row['variant_id'],item=item,available=True); unit=v.price; variant_name=v.name
   except MenuVariant.DoesNotExist:return Response({'detail':'Invalid item variant.'},status=400)
  opts=[]
  for oid in row.get('option_ids',[]):
   try:o=ModifierOption.objects.get(pk=oid,available=True,group__items=item); unit+=o.price_delta; opts.append({'name':o.name,'price':str(o.price_delta)})
   except ModifierOption.DoesNotExist:return Response({'detail':'Invalid item option.'},status=400)
  line=unit*qty; subtotal+=line; prepared.append((item,variant_name,opts,unit,qty,line))
 fulfil=d.get('fulfilment','pickup'); zone=None; fee=Decimal('0')
 if fulfil=='delivery':
  try:zone=DeliveryZone.objects.get(pk=d.get('delivery_zone'),active=True,branch=branch); fee=zone.fee
  except DeliveryZone.DoesNotExist:return Response({'detail':'Select a valid delivery zone.'},status=400)
  if subtotal < zone.minimum_order:return Response({'detail':f'Minimum order for {zone.name} is UGX {zone.minimum_order:,.0f}.'},status=400)
 discount=Decimal('0'); code=d.get('promo_code','').strip()
 if code:
  p=Promotion.objects.filter(code__iexact=code,active=True).first()
  if p and subtotal>=p.minimum_spend:
   if p.discount_type=='percent': discount=subtotal*(p.value/Decimal('100'))
   elif p.discount_type=='fixed': discount=min(p.value,subtotal)
   elif p.discount_type=='free_delivery': fee=Decimal('0')
 order=Order.objects.create(branch=branch,customer=r.user if r.user.is_authenticated else None,customer_name=d['customer_name'].strip(),phone=d['phone'].strip(),email=d.get('email','').strip(),fulfilment=fulfil,delivery_zone=zone,address=d.get('address','').strip(),notes=d.get('notes','').strip(),payment_method=d.get('payment_method','cash'),subtotal=subtotal,discount=discount,delivery_fee=fee,total=subtotal-discount+fee)
 for item,var,opts,unit,qty,line in prepared:OrderItem.objects.create(order=order,menu_item_id_snapshot=item.pk,name=item.name,variant_name=var,unit_price=unit,quantity=qty,options=opts,line_total=line)
 OrderStatusHistory.objects.create(order=order,new_status='Pending',note='Order placed')
 return Response(OrderSerializer(order).data,status=201)
@api_view(['GET'])
def track(r,number):
 try:o=Order.objects.prefetch_related('items','history').get(order_number__iexact=number)
 except Order.DoesNotExist:return Response({'detail':'Order not found.'},status=404)
 return Response(OrderSerializer(o).data)
@api_view(['GET'])
@permission_classes([IsAdminUser])
def dashboard(r):
 today=timezone.localdate(); qs=Order.objects.filter(created_at__date=today); agg=qs.aggregate(revenue=Sum('total'),orders=Count('id'))
 return Response({'orders_today':agg['orders'] or 0,'revenue_today':agg['revenue'] or 0,'pending':qs.filter(status='Pending').count(),'preparing':qs.filter(status='Preparing').count(),'ready':qs.filter(status='Ready').count(),'completed':qs.filter(status__in=['Delivered','Completed']).count(),'recent':OrderSerializer(Order.objects.order_by('-created_at')[:20],many=True).data})

from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.models import User
from apps.accounts.models import CustomerProfile,CustomerAddress
@api_view(['POST'])
def register_customer(r):
 d=r.data
 if not d.get('username') or not d.get('password'): return Response({'detail':'Username and password are required.'},status=400)
 if User.objects.filter(username=d['username']).exists(): return Response({'detail':'Account already exists.'},status=400)
 u=User.objects.create_user(username=d['username'],email=d.get('email',''),password=d['password'],first_name=d.get('name',''))
 CustomerProfile.objects.create(user=u,phone=d.get('phone','')); login(r,u); return Response({'id':u.id,'name':u.first_name,'username':u.username},status=201)
@api_view(['POST'])
def login_customer(r):
 u=authenticate(r,username=r.data.get('username',''),password=r.data.get('password',''))
 if not u:return Response({'detail':'Invalid login details.'},status=400)
 login(r,u);return Response({'id':u.id,'name':u.first_name,'username':u.username})
@api_view(['POST'])
def logout_customer(r): logout(r); return Response({'detail':'Signed out.'})
@api_view(['GET'])
def my_orders(r):
 if not r.user.is_authenticated:return Response({'detail':'Authentication required.'},status=401)
 return Response(OrderSerializer(r.user.orders.order_by('-created_at'),many=True).data)
