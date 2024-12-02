'''
    Views to access Microsoft Graph API for user details.
'''
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
import os
import re

import requests

def get_graph_token():
    '''Get token from Microsoft AAD URL.'''
    try:
        url = settings.AD_URL

        headers = {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'}

        data = {
            'grant_type': 'client_credentials',
            'client_id': settings.CLIENT_ID,
            'client_secret': settings.CLIENT_SECRET,
            'scope': 'https://graph.microsoft.com/.default',
        }

        return requests.post(url=url, headers=headers, data=data).json()
    except:
        return None

def login_successful(request):
    if request.user.is_authenticated:
        ''' Get User details from Microsoft Graph APIs.'''
        graph_token = get_graph_token()
        print(graph_token)
        
        if graph_token:
            # Step 1: Fetch User Details
            user_url = f"https://graph.microsoft.com/v1.0/users/{request.user.username}"
            headers = {
                "Authorization": f"Bearer {graph_token['access_token']}",
                "Content-Type": "application/json",
            }
            user_response = requests.get(url=user_url, headers=headers).json()
            print("User Details:", user_response)

            # Step 2: Fetch User Profile Picture
            photo_url = f"https://graph.microsoft.com/v1.0/users/{request.user.username}/photo/$value"
            photo_response = requests.get(url=photo_url, headers=headers)

            if photo_response.status_code == 200:
                # Profile picture retrieved successfully
                with open("profile_picture.jpg", "wb") as f:
                    f.write(photo_response.content)
                print("Profile picture saved as 'profile_picture.jpg'")
                return HttpResponse("User profile and photo retrieved successfully.")
            else:
                # Handle errors (e.g., no profile picture exists)
                print(f"Failed to retrieve profile picture: {photo_response.status_code}")
                return HttpResponse("Failed to retrieve profile picture.", status=photo_response.status_code)
        else:
            return HttpResponse("Failed to retrieve token.", status=400)
    else:
        return HttpResponse("User not authenticated.", status=401)
    
def get_user_photo(request):
    if request.user.is_authenticated:
        graph_token = get_graph_token()
        if graph_token:
            photo_url = f"https://graph.microsoft.com/v1.0/users/{request.user.username}/photo/$value"
            headers = {"Authorization": f"Bearer {graph_token['access_token']}"}
            photo_response = requests.get(url=photo_url, headers=headers)
            if photo_response.status_code == 200:
                return HttpResponse(photo_response.content, content_type="image/jpeg")
            else:
                return HttpResponse("No profile picture available.", status=404)
    return HttpResponse("User not authenticated.", status=401)

def get_user_info(request):
    id = ""
    name = ""
    email = ""
    if request.user.is_authenticated:
        graph_token = get_graph_token()
        if graph_token:
            user_url = f"https://graph.microsoft.com/v1.0/users/{request.user.username}"
            headers = {
                "Authorization": f"Bearer {graph_token['access_token']}",
                "Content-Type": "application/json",
            }
            user_response = requests.get(url=user_url, headers=headers).json()
            match = re.search(r"<\s*(\d+)\s*>", user_response['displayName'])
            if match:
                id = match.group(1)
            name = user_response['givenName'] + ' ' + user_response['surname']
            mail = user_response['mail']
    data = {
        'id': id,
        'name': name,
        'email': mail,
    }
    return JsonResponse(data)


def login(request):
    # Redirect to the ADFS login page
    return redirect(settings.LOGIN_URL) 

@api_view(['GET'])
def fetch_courses(request):
    data = {
        'courseID': 'CSC 3351 02',
        'courseName': 'Operating Systems',
        'courseSem': 'FA 24',
    }
    return Response(data)


def react_view(request, path=None):
    # Serve the React app's index.html for all frontend routes
    index_path = os.path.join(settings.BASE_DIR, 'frontend/tutormate/dist', 'index.html')
    with open(index_path, 'r') as f:
        return HttpResponse(f.read(), content_type='text/html')
