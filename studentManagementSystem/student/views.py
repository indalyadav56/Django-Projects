from django.shortcuts import render
from .models import *
from .forms import AddStaffForm, AddStudentForm

def homeView(request):
    return render(request,"student/home.html")


def addStaff(request):
    context={
        'studet_form':AddStudentForm(),
        'staff_form':AddStaffForm()
    }
    return render(request,"addStaff.html",context)

def manageStaff(request):
    objs=Staffs.objects.all()
    context={
        'staffs':objs
    }
    return render(request,"manageStaff.html",context)

def addStudent(request):
    context={
        'studet_form':AddStudentForm(),
        'staff_form':AddStaffForm()
    }
    return render(request,"student/addStudent.html",context)

def manageStudent(request):
    objs=Students.objects.all()
    context={
        'staffs':objs
    }
    return render(request,"student/manageStudent.html",context)


def addCourse(request):
    context={
        'studet_form':AddStudentForm(),
        'staff_form':AddStaffForm()
    }
    return render(request,"student/addStudent.html",context)

def manageCourse(request):
    objs=Courses.objects.all()
    context={
        'staffs':objs
    }
    return render(request,"student/manageStudent.html",context)