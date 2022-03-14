from django.db import models

# Create your models here.
class Tools(models.Model):
    title = models.CharField(max_length=200, default="")
    description = models.CharField(max_length=200, default="")
    img_src = models.CharField(max_length=200, unique=True, default="")
    url = models.CharField(max_length=200, default="")
    created_at = models.DateTimeField(auto_now_add=True)


class Categories(models.Model):
    category_name = models.CharField(max_length=200, default="")
    created_at = models.DateTimeField(auto_now_add=True)


class Tool_Category(models.Model):
    tool_ID = models.CharField(max_length=100)
    category_ID = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)