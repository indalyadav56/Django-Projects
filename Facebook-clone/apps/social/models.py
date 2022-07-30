from django.db import models
from apps.account.models import NewUser as User

# Create your models here.

class UserPost(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="post")
    image=models.ImageField(upload_to="post/",blank=True,null=True)
    title=models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}--{ self.user }"

    def comment_count(self):
        return self.comment_set.all().count()

    def comment(self):
        return self.comment_set.all()
    
    def like(self):
        return self.like_set.filter(value='like').count()

class UserStory(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="story")
    image=models.ImageField(upload_to="story/")

  


LIKE_OR_UNLIKE=(
    ('like','like'),
    ('unlike','unlike'),
)
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(UserPost, on_delete=models.CASCADE)
    value = models.CharField(choices=LIKE_OR_UNLIKE,max_length=6)
    create = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{ self.post }--{ self.user }--{ self.value }"


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(UserPost, on_delete=models.CASCADE)
    value = models.CharField(max_length=200)
    create = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{ self.post }--{ self.user }--{ self.value }"




class Friend(models.Model):
    friend=models.ManyToManyField(User)
    is_friend=models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
