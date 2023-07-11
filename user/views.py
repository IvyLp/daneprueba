from genericpath import exists
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.shortcuts import render
# Create your views here.

from .models import User
import json
import hashlib

def registerUser(request):
    return render(request, "user/register.html")

def addUser(request):
    if request.method == 'POST':
        jsonData = json.loads(request.body)
        firstName = jsonData['firstName']
        lastName = jsonData['lastName']
        email = jsonData['email']
        user = jsonData['user']
        password = jsonData['password']
        passwordMd5 = hashlib.md5(password.encode())
        passwordHex = passwordMd5.hexdigest()
        
        existsUser = User.objects.filter(email = email).count()
        print(existsUser)
        if existsUser == 0:
            usr = User.objects.create(firstName = firstName, lastName = lastName, email = email, user = user, password = passwordHex)
            usr.save();
            return JsonResponse({ 'message': 'Usuario Agregado Satisfactoriamente', 'redirect': True })
        else:
            return JsonResponse({ 'message': 'El email ya se encuentra registrado', 'redirect': False })
    

def login(request):
    if request.method == 'POST':
        jsonData = json.loads(request.body)
        user = jsonData['user']
        password = jsonData['password']
        passwordMd5 = hashlib.md5(password.encode())
        passwordHex = passwordMd5.hexdigest()
        usr = User.objects.filter(user = user).get()
        return JsonResponse({ 'message': 'Sesión Inciada', 'redirect': True })
    if request.method == 'GET':
        return render(request, "user/login.html")