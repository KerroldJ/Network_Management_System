from ..serializer.user_serializer import UserSerializer
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from ..models.user_model import User

def register_user(data):
    serializer = UserSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return serializer.data

def get_all_users():
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return serializer.data

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def login_user(data):
    email = data.get('email')
    password = data.get('password')

    user = authenticate(username=email, password=password)
    if user is None:
        raise AuthenticationFailed("Invalid email or password.")

    tokens = get_tokens_for_user(user)
    serializer = UserSerializer(user)

    return {
        "user": serializer.data,
        "tokens": tokens
    }