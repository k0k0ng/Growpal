from django.urls import path
from .views import UpdateTool, ViewTools, CreateCategoryAPIView, ViewCategories, CreateToolsAPIView, GetTool, MyTokenObtainPairView, GetAllTools, BookmarkedTool, UserAccountInfo
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
    path('view-tools', ViewTools.as_view()),
    path('view-categories', ViewCategories.as_view()),
    
    path('get-user-info', UserAccountInfo.as_view()),
    path('register-account-credentials', views.register, name='register-account'),


    path('get-tools', GetAllTools.as_view()),
    path('create-tool', views.addTool, name='add-tool'),
    path('get-tool', GetTool.as_view()),
    path('update-tool', UpdateTool.as_view()),

    path('add-to-bookmark', BookmarkedTool.as_view()),

]