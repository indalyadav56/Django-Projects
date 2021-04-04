from django.contrib import admin
from django.urls import path,include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("apps.social.urls")),
    path('user/', include("apps.user.urls")),
    path('user/profile/', include("apps.user_profile.urls")),
]
