from django.contrib import admin
from django.db.models.fields import TextField
from .models import NewUser
from django.contrib.auth.admin import UserAdmin


class UserAdminConfig(UserAdmin):
    ordering = ('-start_date',)
    list_display = ('email', 'is_active', 'is_staff')
    search_fields = ('eamil',)
    list_filter = ('email', 'is_active')

    fieldsets = (
        (None, {'fields': ('email',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Personal', {'fields': ('about',)}),

    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_active', 'is_staff'),
        }),
    )


admin.site.register(NewUser, UserAdminConfig)
