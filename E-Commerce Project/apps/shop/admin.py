from django.contrib import admin
from .models import Customer,Category,Cart,Product,ProductView,Brand,Order,CartProduct,Review,Slider,TrendingProduct
# Register your models here.
admin.site.register(
    (Customer,Category,Product,ProductView,Brand,Order,Review,Slider,TrendingProduct)
    )

class CartProductAdmin(admin.ModelAdmin):
    list_display=("id","cart","quantity")

admin.site.register(CartProduct, CartProductAdmin)

class CartAdmin(admin.ModelAdmin):
    list_display=("id","customer")

admin.site.register(Cart, CartAdmin)