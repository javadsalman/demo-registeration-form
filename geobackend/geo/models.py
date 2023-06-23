from django.db import models

# Create your models here.

class Country(models.Model):
    title = models.CharField(max_length=100)
    
    def __str__(self):
        return self.title
    
    
class City(models.Model):
    title = models.CharField(max_length=100)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def __str__(self):
        return self.title