from django.shortcuts import render
from rest_framework.views import APIView
from .serializations import *
from .models import *
from rest_framework.response import Response
from django.db.models import Q
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class CategoryProductAPIView(APIView):

    def get(self,request):
        category=Category.objects.all()
        category_serializer=CategorySerializer(category,many=True,context={'request':request}).data

        data=[]

        for ct in category_serializer:

            product_obj= Product.objects.filter(category=ct['id'])

            ct['product']=ProductSerializer(
                product_obj, many=True, context={'request': request}).data
            data.append(ct)

        return Response(category_serializer)

class SingleCategoryView(APIView):
    def get(self, request, pk):
        category_obj = Category.objects.filter(id=pk)
        category_serializer = CategorySerializer(
            category_obj, many=True, context={'request': request}).data
        data = []
        for cata in category_serializer:
            product_obj = Product.objects.filter(category=cata['id'])
            cata['products'] = ProductSerializer(
                product_obj, many=True, context={'request': request}).data
            data.append(cata)
        return Response(data)

class CategoryAPIView(APIView):

    def get(self,request):
        category=Category.objects.all()
        category_serializer=CategorySerializer(category,many=True,context={'request': request})
        return Response(category_serializer.data)




class TrendingProductAPIView(APIView):

    def get(self,request):
        trending_product=TrendingProduct.objects.all()
        trending_product_serializer=TrendingProductSerializer(trending_product,many=True,context={'request': request})
        data=trending_product_serializer.data
        return Response(data)

class BrandAPIView(APIView):

    def get(self,request):
        brand=Brand.objects.all()
        brand_serializer=BrandSerializer(brand,many=True,context={'request':request})
        return Response(brand_serializer.data)


class SliderAPIView(APIView):

    def get(self,request):
        slider=Slider.objects.all()
        slider_serializer=SliderSerializer(slider,many=True,context={'request':request})
        return Response(slider_serializer.data)


class ProductAPIView(APIView):
    
    def get(self,request,pk=None):
        
        if pk:
            product=Product.objects.filter(id=pk)
            product_serializer=ProductSerializer(product,many=True,context={'request':request})
            return Response(product_serializer.data)
        else:
            product=Product.objects.all()
            product_serializer=ProductSerializer(product,many=True,context={'request':request})
            return Response(product_serializer.data)

class MostViewedProductAPIView(APIView):
    
    def get(self,request):
            product_view=ProductView.objects.all()
            product_view_serializer=MostViewsProductSerializer(product_view,many=True,context={'request':request})
            return Response(product_view_serializer.data)




class CategoryProductView(APIView):
    def get(self, request):
        category_obj = Category.objects.all()
        category_serializer = CategorySerializer(category_obj, many=True).data
        data = []
        for cata in category_serializer:
            product_obj = Product.objects.filter(category=cata['id'])
            cata['products'] = ProductSerializer(
                product_obj, many=True, context={'request': request}).data
            data.append(cata)
        return Response(data)


class SingleCategoryView(APIView):

    def get(self, request, pk):
        category_obj = Category.objects.filter(id=pk)
        category_serializer = CategorySerializer(
            category_obj, many=True, context={'request': request}).data
        data = []
        for cata in category_serializer:
            product_obj = Product.objects.filter(category=cata['id'])
            cata['products'] = ProductSerializer(
                product_obj, many=True, context={'request': request}).data
            data.append(cata)
        return Response(data)


class CategorisView(APIView):
    def get(self, request):
        categoris_obj = Category.objects.all()
        category_serializer = CategorySerializer(
            categoris_obj, many=True, context={'request': request}).data
        return Response(category_serializer)

class BrandSNameView(APIView):
    def get(self, request):
        brand_obj = Brand.objects.all()
        brand_serializers = BrandSerializer(
            brand_obj, many=True, context={'request': request}).data
        return Response(brand_serializers)


class SingleProductView(APIView):
    def get(self, request, pk):
        product_obj = Product.objects.filter(id=pk)
        data = []
        product_serializer = SingleProductSerializer(
            product_obj, many=True, context={'request': request}).data
        for prod in product_serializer:
            prod_view = ProductView.objects.filter(product=prod['id']).first()
            # print('prod_view', prod_view)
            if prod_view:
                prod['view'] = prod_view.view
            else:
                prod['view'] = 0
            prod_review = Review.objects.filter(product=prod['id'])
            prod_review_serializer = ReviewSerializer(
                prod_review, many=True).data
            prod['review'] = prod_review_serializer

            data.append(prod)
        return Response(data)

class SingleBrandsProducts(APIView):
    def get(self, request, pk):
        brand_obj = Brand.objects.filter(id=pk)
        brand_serializer = BrandSerializer(
            brand_obj, many=True, context={'request': request})
        data = []
        for brand in brand_serializer.data:
            brandProducts = Product.objects.filter(brand=brand['id'])
            brandProducts_serializer = ProductSerializer(
                brandProducts, many=True, context={'request': request})
            brand['products'] = brandProducts_serializer.data
            data.append(brand)
        return Response(data)


class TrandingProductsView(APIView):
    def get(self, request):
        products_obj = TrendingProduct.objects.all()[:12]
        product_serializer = TrendingProductSerializer(
            products_obj, many=True, context={'request': request}).data
        return Response(product_serializer)


class SliderView(APIView):
    def get(self, request):
        slider_obj = Slider.objects.all()
        slider_serializer = SliderSerializer(
            slider_obj, many=True, context={'request': request}).data
        return Response(slider_serializer)

class AddViewProduct(APIView):
    def post(self, request):
        p_id = request.data['id']
        p_obj = Product.objects.get(id=p_id)
        p_view_obj = ProductView.objects.filter(product=p_obj).first()
        if p_view_obj:
            p_view_obj.view += 1
            p_view_obj.save()
        else:
            ProductView.objects.create(product=p_obj, view=1)
        return Response({'error': False, 'message': 'Success'})


class MostViewsProducts(APIView):

    def get(self, request):
        p_obj = ProductView.objects.all().order_by('-view')[:12]
        p_obj_data = ProductViewSerializer(
            p_obj, many=True, context={'request': request}).data
        return Response(p_obj_data)



class CartAPIView(APIView):

    def get(self, request,id):
        p_obj = Cart.objects.get(customer=id)
        p_obj_data = CartSerializer(
            p_obj,context={'request': request}).data
        return Response(p_obj_data)
    

        
        

class SearchView(APIView):

    def get(self, request, q):
        data = {}
        posts_lookup = (Q(title__icontains=q))
        prod_obj = Product.objects.filter(posts_lookup)
        data['products'] = ProductSerializer(
            prod_obj, many=True, context={'request': request}).data
        category_lookup = (Q(title__icontains=q))
        category_obj = Category.objects.filter(category_lookup)
        data['category'] = CategorySerializer(
            category_obj, many=True, context={'request': request}).data

        brand_lookup = (Q(title__icontains=q))
        brand_obj = Brand.objects.filter(category_lookup)
        data['brand'] = BrandSerializer(
            brand_obj, many=True, context={'request': request}).data

        return Response(data)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        customer_obj = Customer.objects.get(user=request.user)
        customer_ser = CustomerSerializer(customer_obj, context={'request': request}).data
        return Response(customer_ser)
    
    def put(self, request):
        customer_obj = Customer.objects.get(user=request.user)
        customer_ser = CustomerSerializer(customer_obj,data=request.data)

        if customer_ser.is_valid():
            customer_ser.save()
            return Response({'error':'false','message':"success"})
            
        return Response({'error':'true','message':"some error occured!"})


class CartAPIView(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self,request):
       
        product_id = request.data['id']
        product_obj = Product.objects.get(id=product_id)
        cart= Cart.objects.filter(customer=request.user.customer).filter(complete=False).first()
        cart_product_obj = CartProduct.objects.filter(product__id=product_id).first()

        if cart:
            this_product_in_cart = cart.cartproduct_set.filter(product=product_obj)
            if this_product_in_cart.exists():
                cartprod_uct = CartProduct.objects.filter(product=product_obj).filter(cart__complete=False).first()
                cartprod_uct.quantity +=1
                cartprod_uct.total +=product_obj.price
                cartprod_uct.save()
                cart.total +=product_obj.price
                cart.save()
            else:

                cart_product_new=CartProduct.objects.create(
                        cart = cart,
                        quantity = 1,
                        total = product_obj.price
                    )
                cart_product_new.product.add(product_obj)
                cart.total +=product_obj.price
                cart.save()

        else:
            Cart.objects.create(customer=request.user.customer,total=0,complete=False)
            new_cart = Cart.objects.filter(customer=request.user.customer).filter(complete=False).first()

            cart_product_new=CartProduct.objects.create(
                        cart = new_cart,
                        quantity = 1,
                        total = product_obj.price
                    )
            cart_product_new.product.add(product_obj)
            new_cart.total +=product_obj.price
            new_cart.save()
        return Response({'error':False,'message':"Product add to card successfully"})
        
        



class CartProductAPIView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self,request):
        cart_customer=Cart.objects.filter(customer=request.user.customer).filter(complete=False).first()
        cart_product=CartProduct.objects.filter(cart=cart_customer)
        cart_product_ser=CartProductSerializer(cart_product,many=True,context={'request':request})
        return Response(cart_product_ser.data)
    

    def delete(self,request):
        pk=request.data['id']
        cart_product=CartProduct.objects.get(id=pk)
        cart=Cart.objects.filter(customer=request.user.customer).filter(complete=False).first()

        data={
            'customer':request.user.customer,
            'total':cart.total-request.data['total']
        }
        cart_ser=CartSerializer(cart,data=data)
        if cart_ser.is_valid():
            cart_ser.save()
        cart_product.delete()
        return Response({'error':'false','message':'successfully deleted!'})

        


class ReviewAPIView(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self,request):
        product=Product.objects.get(id=request.data['id'])
        review = Review.objects.create(
            product=product,
            customer=request.user.customer,
            title=request.data['title']
            )
        return Response({
            'error':'false',
            'message':'Success'
        })
           

class OrderAPIView(APIView):
    permission_classes = [IsAuthenticated, ]
    
    def post(self,request):
        name=request.data['name']
        mobile=request.data['mobile']
        address=request.data['address']
        email=request.data['email']
        cart=Cart.objects.get(customer=request.user.customer)

        data={
            "customer":cart.customer,
            "total":cart.total,
            "complete":True
        }
        cart_ser=CartSerializer(cart,data=data)
        if cart_ser.is_valid():
            cart_ser.save()
        
        order=Order.objects.create(
            cart=cart,
            name=name,
            mobile=mobile,
            address=address,
            email=email
        )
        return Response({"error":False,"message":"Your Order Successfully registered"})
