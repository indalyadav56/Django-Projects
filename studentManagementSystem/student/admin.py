from django.contrib import admin
from .models import CustomUser,Staffs, Students
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Staffs)
admin.site.register(Students)