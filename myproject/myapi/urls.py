from django.urls import path
from . import views

urlpatterns = [
    path('hello-world/', views.hello_world, name='hello_world'),
    path('fetch-drugs/', views.fetch_drug_maps, name='fetch_drug_maps'),
]