import requests
import os
import re
import tokens

class CanvasConnexion:
    
    canvas_base_url = "https://aui.instructure.com"

    def __init__(self, api_token):
        self.headers = {
            "Authorization": f"Bearer {api_token}"
        }


    def getCourses(self):
        url = f"{CanvasConnexion.canvas_base_url}/api/v1/courses"
        params = {
            "enrollment_type": "student",
            "enrollment_state": "active",
            "include": ["term"]
        }
        response = requests.get(url, headers=self.headers, params=params)
        return response.json() if response.status_code == 200 else None
    
    
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
                print(todo_items)
            except ValueError:
                return None
            
            if todo_items and isinstance(todo_items, list):
                parsed_items = []
                for item in todo_items:
                    assignment = item.get("assignment", {})
                    parsed_items.append({
                        "course": item.get("context_name", "Unknown Course"),
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
        """
        Sanitizes a file name by removing invalid characters and limiting length.
        
        Args:
            file_name (str): The original file name.
            max_length (int): The maximum length of the sanitized file name.
        
        Returns:
            str: The sanitized file name.
        """
        # Ensure file_name is a string
        if not isinstance(file_name, str):
            file_name = str(file_name)
        
        # Remove invalid characters
        sanitized = re.sub(r'[<>:"/\\|?*]', '', file_name)

        # Truncate to max_length
        if len(sanitized) > max_length:
            sanitized = sanitized[:max_length]

        return sanitized
        
    def getCourseModules(self, course_id):
        """
        Retrieves modules from a course.
        
        Args:
            course_id (int): The ID of the course.
        
        Returns:
            list: A list of modules with their items, or None if an error occurs.
        """
        url = f"{CanvasConnexion.canvas_base_url}/api/v1/courses/{course_id}/modules"
        params = {
            "include": ["items"]  # Include module items in the response
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

    
    def downloadModuleFiles(self, course_id, download_path):
        """
        Downloads all files from the modules of a given course.
        
        Args:
            course_id (int): The ID of the course.
            download_path (str): The directory where files will be saved.
        
        Returns:
            None
        """
        modules = self.getCourseModules(course_id)

        if not modules:
            print(f"No modules found for course {course_id}.")
            return
        
        os.makedirs(download_path, exist_ok=True)
        
        for module in modules:
            module_name = module.get("name", "Unnamed Module")
            print(f"Processing module: {module_name}")

            for item in module.get("items", []):
                if item.get("type") == "File":
                    metadata_url = item.get("url")  # Metadata URL for the file
                    file_name = self.sanitize_file_name(item.get("title", "Unnamed File"))

                    if metadata_url:
                        print(f"Fetching metadata for file: {file_name}")
                        metadata_response = requests.get(metadata_url, headers=self.headers)

                        if metadata_response.status_code == 200:
                            metadata = metadata_response.json()
                            download_url = metadata.get("url")  # Actual download URL
                            print(f"Downloading file from: {download_url}")

                            # Download the actual file
                            file_response = requests.get(download_url, headers=self.headers, stream=True)
                            
                            if file_response.status_code == 200:
                                file_path = os.path.join(download_path, file_name)
                                try:
                                    with open(file_path, "wb") as f:
                                        for chunk in file_response.iter_content(chunk_size=8192):
                                            f.write(chunk)
                                    print(f"File saved: {file_path}")
                                except Exception as e:
                                    print(f"Failed to save file {file_name}: {e}")
                            else:
                                print(f"Failed to download {file_name}: {file_response.status_code}")
                        else:
                            print(f"Failed to fetch metadata for {file_name}: {metadata_response.status_code}")










canvas = CanvasConnexion(tokens.ghali_token)

todo_assignments = canvas.getToDoAssignments()

'''if todo_assignments is not None:
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
    print("An error occurred while fetching To-Do assignments.")'''

for course in canvas.getCourses():
    path = f"./downloads/{course['id']}"
    print(f"Course Name: {course['name']}, ID: {course['id']}")
    canvas.downloadModuleFiles(course['id'], path)

'''# Headers for authorization
headers = {
    "Authorization": f"Bearer {api_token}"
}

# Endpoint to get the courses
url = f"{canvas_base_url}/api/v1/courses"

# Parameters to filter the courses
params = {
    "enrollment_type": "student",  # Get courses where you are enrolled as a student
    "enrollment_state": "active",  # Only active enrollments
    "include": ["term"]            # Include additional information, like the term
}

# Make the GET request
response = requests.get(url, headers=headers, params=params)

# Check for a successful response
if response.status_code == 200:
    courses = response.json()
    print("Courses you're taking:")
    for course in courses:
        print(f"- {course['name']} (ID: {course['id']})")
else:
    print(f"Failed to retrieve courses: {response.status_code}")
    print(response.text)

'''
























string = "Hello world"

print(string[0])