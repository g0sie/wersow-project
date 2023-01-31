from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        extra_fields = {"is_staff": False,
                        "is_superuser": False, **extra_fields}

        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user = User(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields = {**extra_fields, "is_staff": True, "is_superuser": True}

        user = self.create_user(email=email, password=password, **extra_fields)

        return user


class User(AbstractUser):
    name = models.CharField(max_length=30)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None

    # overwrite to log in with email instead of username
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()
