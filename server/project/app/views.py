from django.shortcuts import render
from django.http import HttpResponse

def say_hello(request):
    return HttpResponse('Hello World')

def say_goodbye(request):
    return HttpResponse('Goodbye')

def apistuff(request):
    return HttpResponse('API Result')