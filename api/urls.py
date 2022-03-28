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
    
    path('get-user-bookmarked-tools', GetUserBookmarkedTools.as_view()),
    path('register-account-credentials', views.register, name='register-account'),


    path('create-tool', views.addTool, name='add-tool'),
    path('get-tool', GetTool.as_view()),
    path('update-tool', UpdateTool.as_view()),
    path('get-all-tools', GetAllTools.as_view()),
    path('get-searched-tool', views.get_searched_tool, name='search-tool'),
    path('get-tool-by-category', views.get_tool_by_category, name='tool-by-category'),

    path('add-to-bookmark', BookmarkedTool.as_view()),

]