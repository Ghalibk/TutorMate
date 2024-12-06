'''
    Views to access Microsoft Graph API for user details.
'''

# Django Imports
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.conf import settings

# REST Framework Imports
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status

# Application Imports
from .models import User, Course, Enroll
from .sync import canvasSync
from .utils import summarize_course  # Import the summarization function

# External Imports
import json
import os
import requests
from canvas import *

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
        id = request.session["id"]
        name = request.session["first_name"] + ' ' + request.session["last_name"]
        email = request.session["email"]
    data = {
        'id': id,
        'name': name,
        'email': email,
    }
    return JsonResponse(data)


def login(request):
    # Redirect to the ADFS login page
    return redirect(settings.LOGIN_URL) 

@api_view(['GET'])
def fetch_courses(request):
    # Ensure user is authenticated
    if not request.user.is_authenticated:
        return Response({"status": "error", "message": "User is not authenticated"}, status=401)

    try:
        # Get user info from the session
        user = User.objects.get(user_id=request.session["id"])

        # Fetch courses from the database
        courses = Course.objects.all()  # You can add any filters if necessary
        course_data = []

        for course in courses:
            # Fetch the enrollment data for the user and course using user_id and course_id
            enrollment = Enroll.objects.filter(user=user, course=course).first()

            if enrollment:
                course_details = {
                    "id": course.course_id,
                    "name": course.name,
                    "term_name": course.term_name,
                    "image_url": course.image_url,
                    "overall_grade": enrollment.letter_grade,
                }
                course_data.append(course_details)

        if course_data:
            print(course_data)
            return Response(course_data)
        else:
            return Response({"status": "error", "message": "No courses found."}, status=404)

    except:
        return Response({"status": "error", "message": "User not found in the database."}, status=404)

def check_canvas_token(request):
    if request.user.is_authenticated:
        try:
            # Fetch the User object for the logged-in user
            user = User.objects.get(user_id=request.session["id"])

            # Check if canvas_token is null or initialized
            token_status = "initialized" if user.canvas_token else "null"
            if(token_status == "initialized"):
                if(not CanvasConnexion(user.canvas_token).is_token_valid()):
                    token_status = "not valid"
            response = {
                "status": "success",
                "token_status": token_status,
            }
        except User.DoesNotExist:
            # Handle case where the User does not exist in the database
            response = {
                "status": "error",
                "message": "User not found in the database."
            }

    return JsonResponse(response)

def validate_canvas_token(request):
    if request.method == "POST":
        try:
            # Parse the token from the request body
            data = json.loads(request.body)
            canvas_token = data.get("token")

            if not canvas_token:
                return JsonResponse({"status": "error", "message": "Token is required."}, status=400)

            # Validate the token using CanvasConnexion
            is_valid = CanvasConnexion(canvas_token).is_token_valid()

            if is_valid:
                # Update the user's canvas_token in the database
                if request.user.is_authenticated:
                    try:
                        user = User.objects.get(user_id=request.session["id"])
                        user.canvas_token = canvas_token
                        user.save()
                        canvasSync(request.session["id"])
                        return JsonResponse({"status": "success", "message": "Token is valid."})
                    except User.DoesNotExist:
                        return JsonResponse({"status": "error", "message": "User not found in the database."}, status=404)
                else:
                    return JsonResponse({"status": "error", "message": "User is not authenticated."}, status=401)
            else:
                return JsonResponse({"status": "error", "message": "Token is not valid."}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"status": "error", "message": "Invalid JSON format."}, status=400)

    return JsonResponse({"status": "error", "message": "Invalid request method."}, status=405)

def react_view(request, path=None):
    # Serve the React app's index.html for all frontend routes
    index_path = os.path.join(settings.BASE_DIR, 'frontend/tutormate/dist', 'index.html')
    with open(index_path, 'r') as f:
        return HttpResponse(f.read(), content_type='text/html')

class SummarizeCourseView(APIView):
    def post(self, request):
        """
        Summarizes the course content provided in the POST request.

        Expects 'content' field in the request body with the course material.
        Returns the summarized content in the response.
