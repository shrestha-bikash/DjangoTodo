from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/$', views.TodoList.as_view()),
    url(r'^api/(?P<pk>[0-9]+)/$', views.showTodo.as_view()),
    url(r'^checktodo/(?P<todo_id>\d+)$', 'app.views.check_todo'),
    url(r'^deletetodo/(?P<todo_id>\d+)$', 'app.views.delete_todo'),

]

urlpatterns = format_suffix_patterns(urlpatterns)
