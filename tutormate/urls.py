"""
URL configuration for website project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.urls import path, include, re_path
from . import views
from django.conf import settings
from django.conf.urls.static import static
#from .views import SummarizeCourseView, upload_file

urlpatterns = [
    path('login/', views.login, name='login'),  # Login route handled by Django
    path('api/fetch-courses/', views.fetch_courses, name='dashboard-stats'),
    path('api/check-canvas-token/', views.check_canvas_token, name='check_canvas_token'),
    path('api/validate-canvas-token/', views.validate_canvas_token, name='validate_canvas_token'),
    path('api/todo/', views.fetch_todo, name='fetch_todo'),
    path('api/profile/', views.get_user_info, name='user-info'),
    path('api/user-photo/', views.get_user_photo, name='user-photo'),
    path('api/course-name/', views.get_course_name, name='get_course_name'),
    path("api/modules/", views.get_modules, name="get_modules"),
    path("api/todo-course/", views.get_todo, name="get_todo"),
    path("api/generate-quiz/", views.generate_quiz_view, name="generate_quiz"),
    path("api/generate-flashcards/", views.generate_flashcards_view, name="generate_quiz"),
    path("api/generate-bulletpoints/", views.generate_bulletpoints_view, name="generate_bulletpoints"),
    path("api/generate-fullsummary/", views.generate_fullsummary_view, name="generate_fullsummary"),
    path("api/generate-steps/", views.generate_steps_for_todos_view, name="generate_steps"),
    path('api/get-user-quizzes/', views.get_user_quizzes_view, name='get-user-quizzes'),
    path("api/get-quiz/", views.get_quiz_view, name="get_quiz"),
    path("api/get-summaries/", views.get_summaries_view, name="get_summaries"),
    path("api/get-flashcard/", views.get_flashcard_view, name="get_flashcard"),
    path("api/get-bulletpoint/", views.get_bulletpoint_view, name="get_bulletpoint"),
    path('api/get-fullsummary/', views.get_fullsummary_view, name='get-fullsummary'),
    path('oauth2/', include('django_auth_adfs.urls')),
    #path('upload-file/', upload_file, name='upload_file'), # pptx, pdf, word
    #path('summarize-course/', SummarizeCourseView.as_view(), name='summarize-course'), # Add the SummarizeCourseView URL
    path('', include('frontend.urls')),  # React frontend routes
]


# Serve media files during development
if settings.DEBUG:  # Only add this in development mode
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)