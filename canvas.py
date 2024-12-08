import requests
import os
import re

class CanvasConnexion:
    
    canvas_base_url = "https://aui.instructure.com"

    def __init__(self, api_token):
        self.headers = {
            "Authorization": f"Bearer {api_token}"
        }

    def is_token_valid(self):
            url = f"{CanvasConnexion.canvas_base_url}/api/v1/users/self"
            try:
                response = requests.get(url, headers=self.headers)
                return response.status_code == 200
            except requests.RequestException as e:
                print(f"Error validating token: {e}")
                return False

    def getCourses(self):
        url = f"{CanvasConnexion.canvas_base_url}/api/v1/courses"
        params = {
            "enrollment_type": "student",
            "enrollment_state": "active",
        }
        response = requests.get(url, headers=self.headers, params=params)
        
        if response.status_code == 200:
            courses = response.json()
            course_data = []

            for course in courses:
                course_id = course.get('id')
                image_url = self.get_course_image(course_id)  # Fetch course image
                term_name = self.get_course_term(course_id)  # Fetch course term

                course_data.append({
                    "id": course_id,
                    "name": course.get('name', 'Unknown'),
                    "course_code": course.get('course_code', 'No code'),
                    "term_name": term_name,
                    "image_url": image_url,
                })
            return course_data
        else:
            print(f"Failed to fetch courses, status code: {response.status_code}")
            return None

    def get_course_image(self, course_id):
        url = f"{CanvasConnexion.canvas_base_url}/api/v1/courses/{course_id}"
        params = {
            "include": "course_image",  # Include only the course image
        }
        response = requests.get(url, headers=self.headers, params=params)
        if response.status_code == 200:
            course = response.json()
            return course.get("image_download_url", 'No image')
        return None
    

    def get_course_term(self, course_id):
        url = f"{CanvasConnexion.canvas_base_url}/api/v1/courses/{course_id}"
        params = {
            "include": "term",  # Include only the term information
        }
        response = requests.get(url, headers=self.headers, params=params)
        if response.status_code == 200:
            course = response.json()
            return course.get("term", {}).get("name", "No term")
        return None
            
    
    def getCourseAssignments(self, course_id):
        url = f"{CanvasConnexion.canvas_base_url}/api/v1/courses/{course_id}/assignments"
        response = requests.get(url, headers=self.headers)
        
        if response.status_code == 200:
            return response.json()
        else:
            return None
        
    def getCourseGrades(self, course_id):
        url = f"{CanvasConnexion.canvas_base_url}/api/v1/courses/{course_id}/assignments"
        params = {
            "include": ["submission"]
        }
        response = requests.get(url, headers=self.headers, params=params)

        if response.status_code == 200:
            assignments = response.json()
            grades = []
            for assignment in assignments:
                assignment_name = assignment["name"]
                submission = assignment.get("submission", {})
                score = submission.get("score")
                if score is None:
                    score = "Not graded yet"
                grades.append({"assignment": assignment_name, "score": score})
            return grades
        else:
            return None

    def getCourseOverallGrade(self, course_id):
        url = f"{CanvasConnexion.canvas_base_url}/api/v1/courses/{course_id}/enrollments"
        params = {"user_id": "self"}
        response = requests.get(url, headers=self.headers, params=params)

        if response.status_code == 200:
            enrollments = response.json()
            for enrollment in enrollments:
                if "grades" in enrollment:
                    grades = enrollment["grades"]
                    return {
                        "current_score": grades.get("current_score", "N/A"),
                        "current_grade": grades.get("current_grade", "N/A"),
                    }
        else:
            return None
        
    def getToDoAssignments(self):
        url = f"{CanvasConnexion.canvas_base_url}/api/v1/users/self/todo"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            try:
                todo_items = response.json()
            except ValueError:
                return None
            if todo_items and isinstance(todo_items, list):
                parsed_items = []
                for item in todo_items:
                    assignment = item.get("assignment", {})
                    parsed_items.append({
                        "todo_id": item.get("assignment").get("id"),
                        "course_id": item.get("course_id"),
                        "assignment_name": assignment.get("name", "Unnamed Assignment"),
                        "description": assignment.get("description", "No description"),
                        "due_date": assignment.get("due_at", "No Due Date"),
                        "assignment_url": item.get("html_url", "No URL Available")
                    })
                return parsed_items
            else:
                return []
        else:
            return None
        
    def sanitize_file_name(self, file_name, max_length=100):
        if not isinstance(file_name, str):
            file_name = str(file_name)
        
        sanitized = re.sub(r'[<>:"/\\|?*]', '', file_name)
        if len(sanitized) > max_length:
            sanitized = sanitized[:max_length]

        return sanitized
        
    def getCourseModules(self, course_id):
        url = f"{CanvasConnexion.canvas_base_url}/api/v1/courses/{course_id}/modules"
        params = {
            "include": ["items"]
        }
        response = requests.get(url, headers=self.headers, params=params)

        if response.status_code == 200:
            try:
                modules = response.json()
                return modules
            except ValueError:
                print("Failed to parse JSON response.")
                return None
        else:
            print(f"Failed to retrieve modules for course {course_id}: {response.status_code}")
            return None




    def downloadModuleFiles(self, download_url, file_name, download_path):
        # Construct the full file path
        file_path = os.path.join(download_path, file_name)
        
        # Check if the file already exists
        if os.path.exists(file_path):
            # Get the size of the existing file
            existing_file_size = os.path.getsize(file_path)
            # Make an actual GET request to download the file
            file_response = requests.get(download_url, headers=self.headers, stream=True)

            if file_response.status_code == 200:
                # Get the remote file size by reading the content
                remote_file_size = len(file_response.content)
                # If the sizes are the same, skip the download
                if existing_file_size == remote_file_size:
                    return
            else:
                return
        try:
            # Now, fetch the file and save it
            file_response = requests.get(download_url, headers=self.headers, stream=True)
            if file_response.status_code == 200:
                # Ensure the target directory exists
                os.makedirs(download_path, exist_ok=True)

                # Write the file content
                with open(file_path, "wb") as f:
                    for chunk in file_response.iter_content(chunk_size=8192):
                        f.write(chunk)
        except Exception as e:
            e












'''
canvas = CanvasConnexion(tokens.ghali_token)

todo_assignments = canvas.getToDoAssignments()

if todo_assignments is not None:
    if todo_assignments:
        for assignment in todo_assignments:
            print(f"Course: {assignment['course']}")
            print(f"Assignment: {assignment['assignment_name']}")
            print(f"Description: {assignment['description']}")
            print(f"Due Date: {assignment['due_date']}")
            print(f"URL: {assignment['assignment_url']}")
            print("---")
    else:
        print("No To-Do assignments available.")
else:
    print("An error occurred while fetching To-Do assignments.")

for course in canvas.getCourses():
    path = f"./downloads/{course['id']}"
    print(f"Course Name: {course['name']}, ID: {course['id']}")
    canvas.downloadModuleFiles(course['id'], path)
'''