
from genericpath import exists
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.shortcuts import render

from user.models import User
# Create your views here.

from .models import Questions, Options, Responses
import json

def survey(request,question_id,user_id):
    try:
        question_list = Questions.objects.order_by("no")
        question_selected = Questions.objects.filter(id = question_id).get()
        user_selected = User.objects.filter(id=user_id).get()
        options_list = Options.objects.filter(question = question_selected.id).all()
        existsResponse = Responses.objects.filter(question = question_selected, user = user_selected)
        
        responseField = ''
        responseOptionNumber = ''
        if  existsResponse.count() > 0:
            responseData = existsResponse.get()
            responseField = responseData.response
            responseOptionNumber  = responseData.optionNumber

        context = {
            "question_id": question_id,
            "question_list": question_list,
            "question_selected": question_selected,
            "options_list": options_list,
            "user_id": user_id,
            "responseField": responseField,
            "responseOptionNumber": responseOptionNumber
        }

        return render(request, "survey.html", context)
    except ObjectDoesNotExist:
        return HttpResponse("Página no existe")




def addAnswer(request):
     if request.method == 'POST':
        jsonData = json.loads(request.body)
        print(jsonData)
        user_selected = User.objects.filter(id=jsonData['userId']).get()
        question_selected = Questions.objects.filter(id = jsonData['questionId']).get()
        optionNumber = jsonData['optionNumber']
        response = jsonData['response']
        print(user_selected)
        print(question_selected)
        existData = Responses.objects.filter(user = user_selected, question = question_selected ).count()
        if existData == 0:
            rply = Responses.objects.create(question = question_selected, optionNumber = optionNumber, response = response, user = user_selected)
            rply.save();
            return JsonResponse({ 'message': 'Registro agregado correctamente', 'redirect': True }, safe=False)
        else:
            edit = Responses.objects.filter(question = question_selected, user = user_selected).update(optionNumber = optionNumber, response = response)
            return JsonResponse({ 'message': 'El registro ya se encuentra agregado', 'redirect': False }, safe=False)