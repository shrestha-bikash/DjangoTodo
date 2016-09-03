from rest_framework import serializers
from app.models import Todo

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'todo_job', 'completed', 'created_date' )

    def create(self, validated_data):
        todo_job = validated_data.get('todo_job', None)
        user = self.context.get("user")
        completed = validated_data.get('completed', None)
        created_date = validated_data.get('created_date', None)
        return Todo.objects.create(todo_job=todo_job, completed=completed, created_date=created_date)
