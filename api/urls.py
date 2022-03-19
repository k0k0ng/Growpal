from django.urls import path
from .views import UpdateTool, ViewTools, CreateToolView, CreateCategoryAPIView, ViewCategories, CreateToolsAPIView, GetTool

urlpatterns = [
    path('create-tools-api', CreateToolsAPIView.as_view()),
    path('view-tools', ViewTools.as_view()),
    path('create-categories-api', CreateCategoryAPIView.as_view()),
    path('view-categories', ViewCategories.as_view()),
    path('create-tool', CreateToolView.as_view()),
    path('get-tool', GetTool.as_view()),
    path('update-tool', UpdateTool.as_view())
]