from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Welcome to BookdTest!</h1><p>Django backend is running successfully.</p>")
