from rest_framework import serializers
from .models import Categories, Tools

class ToolsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tools
        fields = ('id', 'title', 'description', 'img_src', 'url', 'created_at')


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ('id', 'category_name', 'created_at')


class CreateToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tools
        fields = ('title', 'description', 'img_src', 'url')


class UpdateToolSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    img_src = serializers.CharField(validators=[])

    class Meta:
        model = Tools
        fields = ('id', 'title', 'description', 'img_src', 'url')
