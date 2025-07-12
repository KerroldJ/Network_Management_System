from rest_framework import serializers
from ..models.user_model import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'fullname', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            fullname=validated_data['fullname'],
        )
        user.set_password(validated_data['password'])  # 🔐 Hash password
        user.save()
        return user
