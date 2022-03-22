from django.contrib import admin
from .models import *

class ToolAdmin(admin.ModelAdmin):
    list_display = ('title', 'url')

class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'is_superuser')






admin.site.site_header = "Growpal"
admin.site.site_title = "Growpal Admin"

admin.site.register(Tool, ToolAdmin)
admin.site.register(Category)
admin.site.register(UserAccount, UserAccountAdmin)