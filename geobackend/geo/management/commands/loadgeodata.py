import json
from django.core.management.base import BaseCommand
from geo.models import Country, City

def get_cities(country: str, cities: list[str]):
    return [c['name'] for c in cities if c['country_name'] == country]


def load_data():
    with open('countries.json', encoding='utf-8') as file:
        countries = json.load(file)

    with open('cities.json', encoding='utf-8') as file:
        cities = json.load(file)

    country_names = [c['name'] for c in countries]
    
    for country in country_names:
        country_cities = get_cities(country, cities)
        if not country_cities: continue
        country_instance = Country.objects.create(title=country)
        city_instances = []
        for city in country_cities:
            city_instances.append(City(title=city, country=country_instance))
        City.objects.bulk_create(city_instances)
    
    print('Data loaded successfuly')
        

class Command(BaseCommand):
    help = 'Load countries and cities data'
    
    def handle(self, *args, **kwargs):
        load_data()