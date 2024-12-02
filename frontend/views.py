from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

def index(request, *args, **kwargs):
    return render(request, 'index.html')



def authenticated(request):
    if request.user.is_authenticated:
        return render(request, 'index.html')
    else:
        return redirect('/')

