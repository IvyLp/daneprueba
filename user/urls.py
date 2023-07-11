from django.urls import path, include
from . import views

app_name = "user"

urlpatterns = [
    path("", views.registerUser, name="user"),
    path("add/", views.addUser, name="addUser"),
    path("login/", views.login, name="login")
]
