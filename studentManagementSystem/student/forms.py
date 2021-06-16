from django import forms
from .models import Staffs, Students

class AddStudentForm(forms.ModelForm):
    class Meta:
        model= Students
        fields='__all__'

class AddStaffForm(forms.ModelForm):
    class Meta:
        model= Staffs
        fields='__all__'