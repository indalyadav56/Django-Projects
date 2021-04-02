from django.shortcuts import render
from django.views.generic import TemplateView, ListView,DetailView,CreateView,DeleteView,UpdateView
from .models import Post
from django.contrib.auth.mixins import LoginRequiredMixin,UserPassesTestMixin
# Create your views here.


class HomeView(ListView):
    template_name="blog/index.html"
    model=Post
    context_object_name="posts"
    ordering=['-id']
    

class PostDetails(DetailView):
    template_name="blog/post_details.html"
    model=Post

class CreatePost(LoginRequiredMixin,CreateView):
    template_name="blog/newpost.html"
    model=Post
    fields=['title','content']
    success_url="/"

    def form_valid(self,form):
        form.instance.author = self.request.user
        return super().form_valid(form)


class DeletePost(LoginRequiredMixin,UserPassesTestMixin,DeleteView):
    model=Post
    template_name="blog/delete_view.html"

    def test_func(self):
        post=self.get_object()
        if self.request.user == post.author:
            return True
        return False
        
    success_url="/"

class UpdatePost(LoginRequiredMixin,UserPassesTestMixin,UpdateView):
    model=Post
    fields=['title','content']
    template_name="blog/update_post.html"

    def form_valid(self,form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def test_func(self):
        post=self.get_object()
        if self.request.user == post.author:
            return True
        return False
    
    success_url="/"


class AboutView(TemplateView):
    template_name="blog/about.html"
 

class ContactView(TemplateView):
    template_name="blog/contact.html"
  