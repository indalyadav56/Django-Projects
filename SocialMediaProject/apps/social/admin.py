from django.contrib import admin
from .models import PostLike,PostComment,FollowUser,UserPost

# Register your models here.


admin.site.site_header="indal Kumar yadav"
admin.site.site_title="my Admin Pannel"
admin.site.index_title="my site index title"



@admin.register(UserPost)
class UserPostAdmin(admin.ModelAdmin):
    list_display=["post","post_img","posted_by"]

@admin.register(FollowUser)
class FollowUserAdmin(admin.ModelAdmin):
    list_display=["user_profile","followed_by"]


@admin.register(PostComment)
class PostCommentAdmin(admin.ModelAdmin):
    list_display=["comment","commented_by"]


@admin.register(PostLike)
class FollowUserAdmin(admin.ModelAdmin):
    list_display=["post","liked_by"]