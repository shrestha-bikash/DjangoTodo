from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Todo(models.Model):
    todo_job = models.TextField()
    completed = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
