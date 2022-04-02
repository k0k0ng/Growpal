from django.urls import path
from .views import UpdateTool, ViewToolsAPIView, CreateCategoryAPIView, ViewCategoriesAPIView, CreateToolsAPIView, GetTool, MyTokenObtainPairView, GetAllTools, BookmarkedTool, GetUserBookmarkedTools
from .import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Extends to API View
    path('create-tools-api', CreateToolsAPIView.as_view()),
    path('create-categories-api', CreateCategoryAPIView.as_view()),
    path('view-tools', ViewToolsAPIView.as_view()),
    path('view-categories', ViewCategoriesAPIView.as_view()),
    
    path('get-account-name-image', views.get_user_name_and_display_image, name='get-account-name-image'),
    path('get-user-bookmarked-tools', GetUserBookmarkedTools.as_view()),
    path('register-account-credentials', views.register, name='register-account'),
    path('update-account-name-image', views.update_user_account_info, name='update-account-name-image'),


    path('create-tool', views.addTool, name='add-tool'),
    path('get-tool-info', GetTool.as_view()),
    path('update-tool-info', UpdateTool.as_view()),
    path('get-all-tools', GetAllTools.as_view()),
    path('get-searched-tool', views.get_searched_tool, name='search-tool'),
    path('get-tool-by-category', views.get_tool_by_category, name='tool-by-category'),
    path('get-tool-alternative-tools', views.get_tool_alternative_tools, name='get-alternative-tools'),

    path('add-remove-tool-to-bookmark', BookmarkedTool.as_view()),

]