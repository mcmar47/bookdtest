
import dj_database_url
import os

DATABASES = {
    'default': dj_database_url.config(default=os.environ.get('DATABASE_URL'))
}

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'fallbacksecretkey')

ALLOWED_HOSTS = ['bookdtest.onrender.com']
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'