from .models import User
from .models import Course
from .models import Enroll
from .models import Module
from .models import Todo
from canvas import CanvasConnexion

import requests
import os

def canvasSync(userID):
    user = User.objects.get(user_id=userID)
    canvas = CanvasConnexion(user.canvas_token)
    courses = canvas.getCourses()
    for course in courses:
        course_exists = Course.objects.filter(course_id=course['id']).exists()
        if not course_exists:
            new_course = Course(
                course_id=course['id'],
                name=course['name'], 
                course_code=course['course_code'],
                term_name=course['term_name'],
                image_url=course['image_url']
            )
            new_course.save()
        overall_grade = canvas.getCourseOverallGrade(course['id'])
        Enroll.objects.update_or_create(
            user_id=userID,
            course_id=course['id'],
            defaults={
                'letter_grade': overall_grade.get('current_grade', 'N/A'),
                'percent': overall_grade.get('current_score', 0)
            }
        )
        for module in canvas.getCourseModules(course['id']):
            for item in module.get("items", []):
                if item.get("type") == "File":
                    item_id = item.get("id")
                    metadata_url = item.get("url") 
                    file_n = canvas.sanitize_file_name(item.get("title", "Unnamed File"))
                    if metadata_url:
                        metadata_response = requests.get(metadata_url, headers=canvas.headers)
                        if metadata_response.status_code == 200:
                            metadata = metadata_response.json()
                            download_url = metadata.get("url")
                            path =  f"./modules/{course['id']}"
                            canvas.downloadModuleFiles(download_url, file_n, path)
                            Module.objects.update_or_create(
                                id = item_id,
                                course= Course.objects.get(course_id=course['id']), 
                                file_name= file_n, 
                            )
    todo = canvas.getToDoAssignments()
    for item in todo:
        course_id = item.get("course_id")
        try:
            course = Course.objects.get(course_id=course_id)
        except Course.DoesNotExist:
            continue
        todo_id = item.get("todo_id")
        description = item.get("description")
        assignment_name = item.get("assignment_name", "Unnamed Assignment")
        due_date = item.get("due_date", "No Due Date")
        assignment_url = item.get("assignment_url", "No URL Available")
        Todo.objects.update_or_create(
            todo_id=todo_id,
            course=course,
            defaults={
                "assignment_name": assignment_name,
                "due_date": due_date,
                "assignment_url": assignment_url
            }
        )
        course_dir = f"./todo/{course_id}"
        if not os.path.exists(course_dir):
            os.makedirs(course_dir)
        file_path = os.path.join(course_dir, f"{assignment_name}.txt")
        with open(file_path, "w") as file:
            file.write(description)
