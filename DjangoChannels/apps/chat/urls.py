from django.urls import path,include

from .views import ChatAPIView

urlpatterns = [
    path('',ChatAPIView.as_view() )
]
