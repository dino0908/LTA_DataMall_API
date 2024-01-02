from django.shortcuts import render
from django.http import HttpResponse

def say_hello(request):
    return HttpResponse('Hello World')

def say_goodbye(request):
    return HttpResponse('Goodbye')

def busETA(request):
    bus_stop_code = request.POST.get('BusStopCode')
    print("Bus Stop Code:", bus_stop_code)

    return HttpResponse('send help')
