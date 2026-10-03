from django.urls import path
from . import views
urlpatterns=[path('health/',views.health),path('menu/categories/',views.categories),path('menu/items/',views.items),path('delivery/zones/',views.zones),path('promotions/',views.promotions),path('catering/',views.catering),path('checkout/',views.checkout),path('orders/track/<str:number>/',views.track),path('staff/dashboard/',views.dashboard),path('auth/register/',views.register_customer),path('auth/login/',views.login_customer),path('auth/logout/',views.logout_customer),path('customer/orders/',views.my_orders)]
