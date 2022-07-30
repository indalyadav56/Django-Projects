from django.db import models
from apps.account.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Customer(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    image=models.ImageField(upload_to="profile/image/",default="profile/default.png",null=True,blank=True)
    username=models.CharField(unique=True,blank=True,null=True,max_length=100)
    full_name=models.CharField(null=True,blank=True,max_length=100)
    mobile=models.CharField(null=True,blank=True,max_length=16)
    address=models.CharField(null=True,blank=True,max_length=200)

    def __str__(self):
        return self.user.email

@receiver(post_save,sender=User)
def create_customer(sender,instance,created,**kwargs):
    if created:
        Customer.objects.create(user=instance)



class Category(models.Model):
    title=models.CharField(max_length=200)
    image=models.ImageField(upload_to="products/",blank=True,null=True)
    description=models.TextField()
    date=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Brand(models.Model):
    title=models.CharField(max_length=100)
    logo=models.ImageField(upload_to="logo/",null=True,blank=True)
    description=models.TextField()
    create_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title

class Product(models.Model):
    title=models.CharField(max_length=200)
    image=models.ImageField(upload_to="products/")
    oldprice=models.PositiveIntegerField(blank=True,null=True)
    price=models.PositiveIntegerField()
    category=models.ManyToManyField(Category)
    brand=models.ForeignKey(Brand,on_delete=models.CASCADE)
    details=models.TextField(blank=True,null=True)
    tags=models.CharField(blank=True,null=True,max_length=100)
    time=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title


class ProductView(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    view=models.PositiveIntegerField(default=0)
    def __str__(self):
        return self.product.title


class Review(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
    title=models.TextField()

    def __str__(self):
        return self.title



class Slider(models.Model):
    name=models.CharField(max_length=200)
    details=models.TextField()
    image=models.ImageField(upload_to="slider/")
    uri=models.TextField(default="#")

    def __str__(self):
        return self.name

class TrendingProduct(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    time=models.DateTimeField(auto_now_add=True)

class Cart(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
    total=models.PositiveIntegerField()
    complete=models.BooleanField(default=False)
    date=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.customer.user.email

class CartProduct(models.Model):
    cart=models.ForeignKey(Cart,on_delete=models.CASCADE)
    product=models.ManyToManyField(Product)
    quantity=models.PositiveIntegerField()
    total=models.PositiveIntegerField()

    def __str__(self):
        return f"Cart=={self.cart.id}<==>CartProduct:{self.id}==Qualtity=={self.quantity}"

    

class Order(models.Model):
    ORDER_STATUS=(
        ("Order Recieved","Order Recieved"),
        ("Order Processing","Order Processing"),
        ("On the way","On the way"),
        ("Order Cenceled","Order Cenceled"),
    )
    cart=models.ForeignKey(Cart,on_delete=models.CASCADE)
    name=models.CharField(max_length=200)
    mobile=models.CharField(max_length=16)
    address=models.TextField()
    email=models.EmailField()
    order_status=models.CharField(max_length=100,choices=ORDER_STATUS,default="Order Recieved")
    date=models.DateTimeField(auto_now_add=True)
   