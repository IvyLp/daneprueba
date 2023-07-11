from pyexpat import model
from django.db import models

# Create your models here.


class User(models.Model):
    firstName = models.CharField(max_length=100)
    lastName =  models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    user = models.CharField(max_length=40)
    password = models.CharField(max_length=1024)
    def __str__(self) -> str:
        return self.user