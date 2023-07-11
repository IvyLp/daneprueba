# Generated by Django 4.2.1 on 2023-07-11 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(max_length=100)),
                ('lastName', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('user', models.CharField(max_length=40)),
                ('password', models.CharField(max_length=1024)),
            ],
        ),
    ]
