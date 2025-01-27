
import os
import dj_database_url
from pathlib import Path 

INSTALLED_APPS = [
    'django.contrib.admin', 
      'django.contrib.auth',  
      'django.contrib.contenttypes',  
      'django.contrib.sessions',
      'django.contrib.messages',
    
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'dj_rest_auth',
    'dj_rest_auth.registration',
    'venues',
    'bookings',
    'messaging',
    'users'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ✅ CORS support
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'allauth.account.middleware.AccountMiddleware', 
]

ORS_ALLOWED_ORIGINS = [
    "https://bookdtest-1.onrender.com",  # ✅ React frontend on Render
    "https://bookdtest.onrender.com",  # ✅ Backend on Render
    "http://localhost:3000",  # ✅ Local development
]

CSRF_TRUSTED_ORIGINS = [
    "https://bookdtest-1.onrender.com",
    "https://bookdtest.onrender.com",
    "http://localhost:3000",
]

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
)


DATABASES = {
    'default': dj_database_url.config(default='sqlite:///db.sqlite3')
}
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'fallbacksecretkey')

ALLOWED_HOSTS = ['bookdtest.onrender.com',
                 'localhost',
                 '127.0.0.1']
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
SITE_ID = 1

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],  # ✅ Optional: Custom templates directory
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',  # ✅ Required for Django-Allauth
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
ROOT_URLCONF = 'bookdtest.urls'

DEBUG = True

# Disable email verification for user registration
ACCOUNT_EMAIL_VERIFICATION = 'none'
ACCOUNT_AUTHENTICATION_METHOD = 'username'
ACCOUNT_EMAIL_REQUIRED = False
