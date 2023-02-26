"""
Tests for models.
"""
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

import pytest


@pytest.mark.django_db
def test_create_user():
    """Test creating a user is successful."""
    email = "test@example.com"
    password = "testpass123"
    username = "testusername"
    user = get_user_model().objects.create_user(
        email=email, password=password, username=username
    )

    assert get_user_model().objects.count() == 1
    assert user.email == email
    assert user.check_password(password)
    assert user.username == username
    assert user.is_active == True
    assert user.is_staff == False


@pytest.mark.django_db
@pytest.mark.parametrize(
    "email, expected",
    [
        ("test1@EXAMPLE.com", "test1@example.com"),
        ("Test2@Example.com", "Test2@example.com"),
        ("TEST3@EXAMPLE.com", "TEST3@example.com"),
        ("test4@example.com", "test4@example.com"),
    ],
)
def test_new_user_email_normalized(email, expected):
    """Test email is normalized for new users."""
    user = get_user_model().objects.create_user(
        email=email, username="testusername", password="testpass123"
    )
    assert user.email == expected
