from django.shortcuts import render
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAdminUser,IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from app.models import Todo
from rest_framework import status, generics
from app.serializers import PostSerializer
from django.views.decorators.csrf import requires_csrf_token

# Create your views here.
def index(request):
    return render(request, 'index.html')

class TodoList(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = PostSerializer

    def get(self, request, format=None):
        print 'In get handler with request'
        queryset = self.get_queryset()
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)


    @permission_classes((AllowAny, ))
    def post(self, request, format=None):
        print 'In post hander'
        user = request.user
        serializer = PostSerializer(data=request.data, context={'user':user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)


class showTodo(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = PostSerializer
def delete_todo(request,todo_id):
    Todo.objects.get(id=todo_id).delete()
    return HttpResponseRedirect('/')

def check_todo(request,todo_id):
    Todo.objects.filter(id=todo_id).update(completed='true')
    return HttpResponseRedirect('/')
