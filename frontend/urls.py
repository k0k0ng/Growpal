from django.urls import path
from .views import index

urlpatterns = [
    path('growpal-admin', index),
    path('create-tool', index),

    path('login', index),
    path('register', index),
    path('forgot-password', index),
    path('activate/<str:uid>/<str:token>', index),
    path('password/reset/confirm/<str:uid>/<str:token>', index),

    path('', index),
    path('view-tool/<str:toolID>', index),
    path('profile', index),
    path('blog', index),
    path('blog/<str:blogID>', index),
]