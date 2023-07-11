from django.urls import path, include
from . import views

app_name = "survey"

urlpatterns = [
    path("<int:question_id>/q/<int:user_id>/u/", views.survey, name=""),
    path("addanswer", views.addAnswer, name="addanswerd")
]
