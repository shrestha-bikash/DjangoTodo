from django.contrib import admin
from app.models import Todo
# Register your models here.
class todoAdmin(admin.ModelAdmin):
    list_display = ['todo_job']
    search_fields = ['todo_job']

admin.site.register(Todo, todoAdmin)
