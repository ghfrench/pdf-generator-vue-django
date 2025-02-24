from django.urls import path
from . import views

urlpatterns = [
    path('api/set-csrf-token', views.set_csrf_token, name='set_csrf_token'),
    path('api/login', views.login_view, name='login'),
    path('api/logout', views.logout_view, name='logout'),
    path('api/user', views.user, name='user'),
    path('api/register', views.register, name='register'),
    path('api/upload/', views.upload_pdf, name='upload_pdf'),
    path('api/list/', views.list_pdfs, name='list_pdfs'),
    path('api/download/<int:pdf_id>/', views.download_pdf, name='download_pdf')
]
