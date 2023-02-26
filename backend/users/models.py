"""
Database models.
"""
from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)


class UserManager(BaseUserManager):
    """Manager for users."""

    def create_user(self, username, email, password=None, **extra_fields):
        """Create, save and return a new user."""
        extra_fields = {"is_staff": False, "is_superuser": False, **extra_fields}

        if not username:
            raise ValueError("User must have a username")
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(
            username=username, email=self.normalize_email(email), **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields = {**extra_fields, "is_staff": True, "is_superuser": True}

        user = self.create_user(
            username=username, email=email, password=password, **extra_fields
        )

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """User in the system."""

    username = models.CharField(
        max_length=30,
        validators=[MinLengthValidator(3)],
    )
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # overwrite to log in with email instead of username
    USERNAME_FIELD = "email"

    objects = UserManager()
