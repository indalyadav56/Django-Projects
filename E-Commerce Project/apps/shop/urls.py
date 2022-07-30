from django.urls import path
from .views import *


urlpatterns = [
    path('categoryproducts/', CategoryProductView.as_view()),
    path('categoris/', CategorisView.as_view()),
    path('brands/', BrandAPIView.as_view()),
    path('singlecategoris/<int:pk>/', SingleCategoryView.as_view()),
    path('singlebrands/<int:pk>/', SingleBrandsProducts.as_view()),
    path('singleproduct/<int:pk>/', SingleProductView.as_view()),
    path('brandsname/', BrandSNameView.as_view()),
    path('trandingproducts/', TrandingProductsView.as_view()),
    path('sliders/', SliderView.as_view()),
    path('addproductview/', AddViewProduct.as_view()),
    path('mostviewproducts/', MostViewsProducts.as_view()),
    path('cart/', CartAPIView.as_view()),
    path('cart/product/', CartProductAPIView.as_view()),
    path('search/<str:q>/', SearchView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('cart/', CartAPIView.as_view()),
    path('add/review/', ReviewAPIView.as_view()),
    path('order/', OrderAPIView.as_view()),
   

]