# Generated by Django 3.1.7 on 2021-04-02 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(blank=True, default='profile/person.png', null=True, upload_to='profile/'),
        ),
    ]