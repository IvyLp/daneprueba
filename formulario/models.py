from django.db import models

from user.models import User

# Create your models here.


class Questions(models.Model):
    CHAPTER_CHOICES = [
        ("1", "Cápitulo 1"),
        ("2", "Cápitulo 2"),
        ("3", "Cápitulo 3"),
        ("4", "Cápitulo 4"),
        ("5", "Cápitulo 5"),
        ("6", "Cápitulo 6"),
        ("7", "Cápitulo 7"),
        ("8", "Cápitulo 8"),
        ("9", "Cápitulo 9"),
    ]

    CHAPTER_INSTRUCTION = [
        ("1", "Escriba una respuesta."),
        ("2", "Por favor seleccione solo una opción"),
        ("3", "Puede seleccionar más de una opción"),
    ]

    CHAPTER_INPUT = [
        ("1", "Input"),
        ("2", "Radio"),
        ("3", "Check"),
    ]

    no = models.IntegerField()
    chapter = models.CharField(max_length=100, choices=CHAPTER_CHOICES, default=1)
    question = models.CharField(max_length=1000)
    instruction = models.CharField(max_length=100, choices=CHAPTER_INSTRUCTION, default=1)
    type = models.CharField(max_length=30, choices=CHAPTER_INPUT)
    isRequired = models.BooleanField()
    isInteger = models.BooleanField()

    def __str__(self) -> str:
        return str(self.no) +' '+ self.question

class Options(models.Model):
    question = models.ForeignKey(Questions, on_delete=models.CASCADE)
    option = models.CharField(max_length=2000)
    redirectQuestion = models.IntegerField(null=True, blank=True)

    def __str__(self) -> str:
        return self.option

class Responses(models.Model):
    question = models.ForeignKey(Questions, on_delete=models.CASCADE)
    optionNumber = models.CharField(max_length=1000, null=True, blank=True)
    response = models.CharField('res', max_length=1000, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)