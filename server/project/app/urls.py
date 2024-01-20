from django.urls import path
from . import views

urlpatterns = [
    path('busETA/', views.busETA),
    path('carpark/', views.carpark)
]