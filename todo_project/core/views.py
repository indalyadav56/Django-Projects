from django.shortcuts import render,redirect
from django.views.generic import View
from .models import Todo
from .forms import TodoCreateForm
# Create your views here.

class HomeView(View):
    
    def get(self,request):
        todo=Todo.objects.all()
        todo_form=TodoCreateForm()

        context={
            'todo':todo,
            'form':todo_form
        }
        return render(request,'core/home.html',context)
    
    def post(self,request):
        todo_form=TodoCreateForm(request.POST)
        if todo_form.is_valid():
            todo_form.save()
            return redirect("/")
        context={
            'form':todo_form
        }
        return render(request,'core/home.html',context)
    
    def delete(self,request,pk):
        todo=Todo.objects.get(id=pk)
        todo.delete()
        return render(request,"core/delete.html")