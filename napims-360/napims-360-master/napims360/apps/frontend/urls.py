from django.urls import re_path, path
from napims360.apps.frontend.views import HomeView

urlpatterns = [
    re_path(r'^(?:.*/)?$', HomeView.as_view(), name='home'),
    path('', HomeView.as_view(), name='home'),
]
