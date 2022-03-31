from django.contrib import admin
from .models import *

class ToolAdmin(admin.ModelAdmin):
    list_display = ('title', 'url')

class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', 'is_staff', 'is_superuser')


from rest_framework_simplejwt import token_blacklist

class OutstandingTokenAdmin(token_blacklist.admin.OutstandingTokenAdmin):

    def has_delete_permission(self, *args, **kwargs):
        return True # or whatever logic you want

admin.site.unregister(token_blacklist.models.OutstandingToken)
admin.site.register(token_blacklist.models.OutstandingToken, OutstandingTokenAdmin)






admin.site.site_header = "Growpal"
admin.site.site_title = "Growpal Admin"

admin.site.register(Tool, ToolAdmin)
admin.site.register(Category)
admin.site.register(UserAccount, UserAccountAdmin)