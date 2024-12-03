from django.db import models

# User model
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    # email = models.EmailField(unique=True)
    canvas_token = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# Material model
class Material(models.Model):
    material_id = models.AutoField(primary_key=True)
    path = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Material for {self.user.first_name} {self.user.last_name}"

# Quiz model
class Quiz(models.Model):
    quiz_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

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

# ToDo model
class ToDo(models.Model):
    todo_id = models.AutoField(primary_key=True)
    info = models.TextField()
    deadline = models.DateField()
    step = models.ForeignKey(StepsToSolve, on_delete=models.CASCADE)

    def __str__(self):
        return f"ToDo: {self.info}"

# Feedback model
class Feedback(models.Model):
    feedback_id = models.AutoField(primary_key=True)
    feedback_text = models.TextField()
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Feedback for {self.quiz.title} by {self.user.first_name}"
