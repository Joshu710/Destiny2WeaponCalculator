"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from destiny import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/weapon/<str:search_text>/',views.search_weapons,name="weapon_search"),
    path('api/perk/<str:search_text>/',views.search_perks,name="perk_search"),
    path('api/perk//',views.all_perks,name="perk_list"),
    path('api/weapon//',views.all_weapons,name="weapon_list"),
    path('api/get-weapon-data/<int:id>/<str:table>/', views.get_weapon_data,name="weapon_data"),
    path('api/perk_weapons/<int:id>/', views.perk_weapons,name="perk_weapons"),
]
