from django.db import models
from apps.user.models  import User
from apps.user_profile.models import Profile

class UserPost(models.Model):
    post=models.TextField(blank=True,null=True)
    post_img=models.ImageField(upload_to="posts/",blank=True,null=True)
    posted_by=models.ForeignKey(User,on_delete=models.CASCADE,null=True, blank=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.posted_by.email



class PostComment(models.Model):
    comment=models.CharField(max_length=255)
    commented_by=models.ForeignKey(User,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)


class PostLike(models.Model):
    post = models.ForeignKey(UserPost, on_delete=models.CASCADE)
    liked_by=models.ForeignKey(User,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.liked_by.email


class FollowUser(models.Model):
    user_profile=models.ForeignKey(User,on_delete=models.CASCADE,related_name="follow_user")
    followed_by=models.ForeignKey(User,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    
    
    
 