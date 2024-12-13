from django.db import models


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    canvas_token = models.CharField(max_length=255, null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)

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
    
class Quiz(models.Model):
    quiz_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    module_name = models.CharField(max_length=255, default='')
    difficulty = models.CharField(max_length=255, default='easy')
    num_questions = models.IntegerField(default=5)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, default=1)

    class Meta:
        db_table = "quiz"

    def __str__(self):
        return f"Quiz {self.quiz_id} for User {self.user.username}"


class Flashcard(models.Model):
    flashcard_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    module_name = models.CharField(max_length=255)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="flashcards")  # Updated related_name

    class Meta:
        db_table = "flashcard"

    def __str__(self):
        return f"Flashcard {self.flashcard_id}"


class Bulletpoint(models.Model):
    bulletpoint_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    module_name = models.CharField(max_length=255)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="bulletpoints")  # Updated related_name

    class Meta:
        db_table = "bulletpoint"

    def __str__(self):
        return f"Bulletpoint {self.bulletpoint_id}"


class Fullsummary(models.Model):
    fullsummary_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    module_name = models.CharField(max_length=255)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="fullsummaries")  # Updated related_name

    class Meta:
        db_table = "fullsummary"

    def __str__(self):
        return f"Fullsummary {self.fullsummary_id}"


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