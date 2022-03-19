from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Tool

class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = ('id', 'title', 'description', 'image', 'url', 'created_at')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'category_name', 'created_at')


class CreateToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = ('title', 'description', 'image', 'url')


class UpdateToolSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Tool
        fields = ('id', 'title', 'description', 'image', 'url')


class RegisterAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'title', 'description', 'image', 'url')
