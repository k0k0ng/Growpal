from django.db import models

class Category(models.Model):
    name        = models.CharField(max_length=100)
    updated_at  = models.DateTimeField(auto_now=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Tool(models.Model):
    title       = models.CharField(max_length=200)
    description = models.TextField()
    image       = models.ImageField(blank=True, null=True)
    url         = models.CharField(max_length=200)
    categories  = models.ManyToManyField(Category, blank=True)
    updated_at  = models.DateTimeField(auto_now=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
