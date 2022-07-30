from rest_framework import serializers
from .models import Product,Category,TrendingProduct,Brand,Slider,ProductView,Customer,Review,Cart,CartProduct,Order

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields="__all__"
        depth=1

        def imageurl(self, obj):
            request = self.context.get('request')
            return request.url(image)
           
   
class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"

        def imageurl(self, obj):
            request = self.context.get('request')
            return request.url(image)
           
    
class TrendingProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=TrendingProduct
        fields="__all__"
        depth=2
        
        def imageurl(self, obj):
            request = self.context.get('request')
            return request.url(image)



class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Slider
        fields="__all__"
        
        def imageurl(self, obj):
            request = self.context.get('request')
            return request.url(image)

class MostViewsProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductView
        fields="__all__"
        depth=1
        def imageurl(self, obj):
            request = self.context.get('request')
            return request.url(image)


class SingleProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        depth = 1

    def imageurl(self, obj):
        request = self.context.get('request')
        return request.url(image)

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'customer', 'title']
        depth = 1


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"

    def getimage(self, *args, **kwargs):
        request = self.context.get('request')
        return request.url(logo)


class TrendingProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrendingProduct
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        request = self.context.get('request')
        response['product'] = ProductSerializer(
            instance.product, context={'request': request}).data
        return response


class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = "__all__"

    def getimage(self, *args, **kwargs):
        request = self.context.get('request')
        return request.url(image)

class ProductViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductView
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        request = self.context.get('request')
        response['product'] = ProductSerializer(
            instance.product, context={'request': request}).data
        return response

class CartProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=CartProduct
        fields="__all__"
        depth=2

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart
        fields="__all__"
        depth=2

class CartProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=CartProduct
        fields="__all__"
        depth=2


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"
        depth=2
    def getimage(self, *args, **kwargs):
        request = self.context.get('request')
        return request.url(image)

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields = "__all__"