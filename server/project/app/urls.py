from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.say_hello),
    path('goodbye/', views.say_goodbye),
    path('busETA/', views.busETA)
]