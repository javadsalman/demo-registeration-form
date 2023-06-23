from rest_framework.generics import ListAPIView
from .models import Country, City
from .serializers import CountrySerializer, CitySerializer

# Create your views here.
class CountryListView(ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    
class CityListView(ListAPIView):
    def get_queryset(self):
        return City.objects.filter(country__title=self.kwargs['country_title'])
    serializer_class = CitySerializer