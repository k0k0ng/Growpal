# Generated by Django 4.0.2 on 2022-03-07 06:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_categories_tool_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='categories',
            name='category_name',
            field=models.CharField(default='', max_length=200),
        ),
    ]
