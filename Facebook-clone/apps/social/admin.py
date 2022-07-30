from django.contrib import admin
from .models import UserPost,UserStory,Like,Comment
# Register your models here.


@admin.register(UserPost)
class PostAdmin(admin.ModelAdmin):
    list_display=["id","user","image","title","created_at","updated_at"]

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display=["id","user","post","value","create"]

admin.site.register(UserStory)
admin.site.register(Comment)