from django.urls import path 
from .import views 

urlpatterns = [ 
    path('dashboard/',views.dashboard, name='dashboard'), 
    path('create/', views.createview, name='create'), 
    path('search/', views.search_view, name='search'), 
    path("update/", views.update_view, name='update')
] 

