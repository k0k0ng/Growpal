from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('login', index),
    path('register', index),
    path('create-tool', index),
    path('view-tool/<str:toolID>', index),
    path('growpal-admin', index)
]