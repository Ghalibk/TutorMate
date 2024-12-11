from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    canvas_token = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = "user"  # Explicitly match the existing table name in the database

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
  
class Course(models.Model):
    course_id = models.AutoField(primary_key=True)  # auto-incremented primary key
    name = models.CharField(max_length=255)
    course_code = models.CharField(max_length=50)
    term_name = models.CharField(max_length=255)
    image_url = models.TextField()

    class Meta:
        db_table = "course"

    def __str__(self):
        return self.name
    
class Enroll(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # ForeignKey is enough
    course = models.ForeignKey(Course, on_delete=models.CASCADE)  # ForeignKey is enough
    letter_grade = models.CharField(max_length=4)  # For example, A, B, C, etc.
    percent = models.DecimalField(max_digits=5, decimal_places=2)

    # Use unique_together to create a composite primary key or unique constraint
    class Meta:
        db_table = "enroll"
        constraints = [
            models.UniqueConstraint(fields=['user', 'course'], name='unique_enrollment')
        ]

class Module(models.Model):
    id = models.IntegerField(primary_key=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)  # Foreign key to Course model
    file_name = models.CharField(max_length=255)  # File name with a max length of 255 characters

    class Meta:
        db_table = "module"

    def __str__(self):
        return f"{self.file_name} for {self.course.name}"
    
# ToDo model
class Todo(models.Model):
    todo_id = models.IntegerField(primary_key=True)  # Assignment ID as the primary key
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="todos")  # Foreign key to Course table
    assignment_name = models.CharField(max_length=255)  # Assignment name
    due_date = models.CharField(max_length=255)  # Due date of the assignment
    assignment_url = models.TextField()  # URL of the assignment

    class Meta:
        db_table = "todo"

    def __str__(self):
        return f"{self.assignment_name} ({self.due_date})"

# # Material Model
class Material(models.Model):
    material_id = models.AutoField(primary_key=True)
    path = models.TextField()  # File path or URL
    file_type = models.CharField(max_length=10, null=True, blank=True)  # E.g., 'pdf', 'pptx', 'docx'
    content = models.TextField(null=True, blank=True)  # Extracted content for processing
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Material: {self.path} (Uploaded by {self.user.first_name})"

# # UploadedFile Model
# class UploadedFile(models.Model):
#     file_id = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=255)  # Original filename
#     file = models.FileField(upload_to='uploads/')  # Save to the "uploads" directory
#     file_type = models.CharField(max_length=10)  # E.g., 'pdf', 'pptx', 'docx'
#     content = models.TextField(null=True, blank=True)  # Extracted text from file
    uploaded_at = models.DateTimeField(auto_now_add=True)  # Timestamp of upload

    def __str__(self):
        return self.name

# Quiz model
class Quiz(models.Model):
    quiz_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    material = models.ForeignKey(Material, on_delete=models.CASCADE, null=True, blank=True)  # Optional link to Material
    def __str__(self):
        return self.title

# Question model
class Question(models.Model):
    question_id = models.AutoField(primary_key=True)
    question_text = models.TextField()
    Ai_answer = models.TextField()  
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)

    def __str__(self):
        return self.question_text

# UserAnswer model
class UserAnswer(models.Model):
    answer_id = models.AutoField(primary_key=True)
    answer_text = models.TextField()
    is_correct = models.BooleanField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Answer by {self.user.first_name}"

# StepsToSolve model
class StepsToSolve(models.Model):
    step_id = models.AutoField(primary_key=True)
    step_number = models.IntegerField()
    step_description = models.TextField()
    # todo = models.ForeignKey('ToDo', on_delete=models.CASCADE)

    def __str__(self):
        return f"Step {self.step_number}: {self.step_description}"

# Feedback model
class Feedback(models.Model):
    feedback_id = models.AutoField(primary_key=True)
    feedback_text = models.TextField()
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Feedback for {self.quiz.title} by {self.user.first_name}"
