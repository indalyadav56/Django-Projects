from django.http import request
from django.http.response import HttpResponseRedirect
from .models import UserPost,PostLike,PostComment
from django.shortcuts import redirect, render
from django.views.generic import TemplateView
from django.views.generic import CreateView,ListView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from apps.user.models import User
from apps.user_profile.models import Profile
from .models import FollowUser
from django.db.models import Q
from .forms import PostCommentForm

@method_decorator(login_required,name="dispatch")
class HomeView(TemplateView):
    template_name="social/home.html"

    def get_context_data(self, **kwargs) :
        context =super().get_context_data(**kwargs)
        followedList=FollowUser.objects.filter(followed_by=self.request.user)
        followedList2=[]
        for e in followedList:
            followedList2.append(e.user_profile)


        posts=UserPost.objects.filter(Q(posted_by__in=followedList2))
        for p in posts:
            p.liked=False
            ob=PostLike.objects.filter(post=p,liked_by=self.request.user)
            
            if ob:
                p.liked=True
            ob=PostLike.objects.filter(post=p)
            p.likedno=ob.count()

        # user post comment
        c_form=PostCommentForm()

        context={
            "followed_user":followedList,
            "posts":posts,
            "c_form":c_form

        }
        return context


    def post(self):
        form=PostCommentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("/")


def post_comment(request,pk):
    comment=PostComment.objects.get(id=pk)
    return render(request)
    


def like_user(request,pk):
    post=UserPost.objects.get(id=pk)
    PostLike.objects.create(post=post,liked_by=request.user)
    return redirect("/")

def dislike_user(request,pk):
    post=UserPost.objects.get(id=pk)
    PostLike.objects.filter(post=post,liked_by=request.user).delete()
    return redirect("/")


def follow_user(request,pk):
    user=User.objects.get(id=pk)
    FollowUser.objects.create(user_profile=user,followed_by=request.user)
    return redirect("/")


def unfollow_user(request,pk):
    user=User.objects.get(id=pk)
    FollowUser.objects.filter(user_profile=user,followed_by=request.user).delete()
    return redirect("/")


@method_decorator(login_required,name="dispatch")
class PostCreateView(CreateView):
    template_name="social/user_post.html"
    model=UserPost
    fields=["post","post_img"]
    success_url="/"

    def form_valid(self,form):
        self.object = form.save()
        self.object.posted_by = self.request.user
        self.object.save()
        return HttpResponseRedirect(self.get_success_url())


@method_decorator(login_required,name="dispatch")
class PostListView(ListView):
    model=UserPost
    template_name="social/allPost.html"




class AllUserListView(ListView):
    model=User
    template_name="social/all_user_list.html"

    def get_queryset(self):
        users=self.request.GET.get("search_user")
        if users == None:
            users = ""
        profileList=User.objects.filter(Q(email__icontains=users))

        for p in profileList:
            p.followed=False
            ob=FollowUser.objects.filter(user_profile=p,followed_by=self.request.user)
            if ob:
                p.followed=True
        return profileList
                
