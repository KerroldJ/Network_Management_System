from django.urls import path
from .views.user_view import RegisterView, LoginUserView
from .views.network_stat import get_realtime_network_stats
from .views.network_optimize import optimize_network

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('optimize-network/', optimize_network, name='optimize-network'),
    path("network-stats/", get_realtime_network_stats, name="network_stats"),
]
