from django.contrib import admin

# Register your models here.
from .models import Questions, Options, Responses

class OptionsInline(admin.TabularInline):
    model = Options
    extra = 1

class QuestionAdmin(admin.ModelAdmin):
    list_display = ['no', 'chapter', 'question']
    list_filter = ["chapter"]

    inlines = [OptionsInline]

class ResponseAdmin(admin.ModelAdmin):
    list_display = ['question', 'optionNumber', 'response', 'user']

admin.site.register(Questions, QuestionAdmin)
admin.site.register(Responses, ResponseAdmin)