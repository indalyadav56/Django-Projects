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
    
    

def deleteTodo(request,id):
    obj=Todo.objects.get(id=id)
    obj.delete()
    return redirect('/')

def EditTodo(request,id):
    obj=Todo.objects.get(id=id)
    todo_form=TodoCreateForm(request.POST,instance=obj)
    if todo_form.is_valid():
        obj.save()
    context={
            'form':todo_form
        }
    return render(request,'core/edit.html',context)