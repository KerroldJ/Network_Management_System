from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..controllers.user_controller import register_user, get_all_users, login_user

class RegisterView(APIView):
    def post(self, request):
        user_data = register_user(request.data)
        return Response(user_data, status=status.HTTP_201_CREATED)

    def get(self, request):
        users = get_all_users()
        return Response(users, status=status.HTTP_200_OK)

class LoginUserView(APIView):
    def post(self, request):
        try:
            user_data = login_user(request.data)
            return Response(user_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)