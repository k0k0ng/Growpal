from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Tool, UserAccount

from djoser.serializers import UserCreateSerializer


class ToolSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    
    class Meta:
        model = Tool
        fields = ('id', 'title', 'description', 'image', 'url', 'created_at')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'created_at')


class CreateToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = ('title', 'description', 'image', 'url')


class AllToolSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(read_only=True, many=True)
    id = serializers.IntegerField()

    class Meta:
        model = Tool
        fields = '__all__'


class UpdateToolSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Tool
        fields = ('id', 'title', 'description', 'image', 'url')


class RegisterAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'title', 'description', 'image', 'url')


class UserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'image', 'password')


class UserAccountInfoSerializer(serializers.ModelSerializer):
    bookmarked_tool = ToolSerializer(read_only=True, many=True)

    class Meta:
        model = UserAccount
        fields = ('email', 'bookmarked_tool')


class UpdateUserAccountNameImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserAccount
        fields = ('email', 'name', 'display_image')

