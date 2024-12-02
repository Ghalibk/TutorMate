from django.urls import path, re_path
from .views import authenticated
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name = 'front'),
    re_path(r'^(?!$).*$', authenticated, name='authenticated'),
]