from django.urls import path
from .views import *

urlpatterns = [
    path('',homeView,name="login"),
    path('add/staff/',addStaff,name="add_staff"),
    path('manage/staff/',manageStaff,name="manage_staff"),
    path('add/student/',addStudent,name="add_student"),
    path('manage/student/',manageStudent,name="manage_student"),
]
