# Generated by Django 3.1 on 2022-01-14 03:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ChatModel',
            new_name='Chat',
        ),
    ]