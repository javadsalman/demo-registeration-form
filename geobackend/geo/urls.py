from django.urls import path
from . import views

urlpatterns = [
    path('countries/', views.CountryListView.as_view()),
    path('country/<str:country_title>/cities/', views.CityListView.as_view())
]
