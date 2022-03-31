from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('login', index),
    path('register', index),
    path('activate/<str:uid>/<str:token>', index),
    path('forgot-password', index),
    path('password/reset/confirm/<str:uid>/<str:token>', index),
    path('create-tool', index),
    path('view-tool/<str:toolID>', index),
    path('growpal-admin', index),
    path('profile', index),
]