"""
Tests for models.
"""
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

import pytest


@pytest.fixture
def example_email():
    return "test@example.com"


@pytest.fixture
def example_password():
    return "test@example.com"


@pytest.fixture
def example_username():
    return "testusername"


@pytest.mark.django_db
def test_create_user(example_email, example_password, example_username):
    """Test creating a user is successful."""
    user = get_user_model().objects.create_user(
        email=example_email, password=example_password, username=example_username
    )

    assert get_user_model().objects.count() == 1
    assert user.email == example_email
    assert user.check_password(example_password)
    assert user.username == example_username
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
def test_new_user_email_normalized(email, expected, example_password, example_username):
    """Test email is normalized for new users."""
    user = get_user_model().objects.create_user(
        email=email, username=example_username, password=example_password
    )
    assert user.email == expected


@pytest.mark.django_db()
def test_new_user_without_username_raises_error(example_email, example_password):
    """Test that creating a user without a username raises a TypeError."""
    with pytest.raises(TypeError):
        user = get_user_model().objects.create_user(
            email=example_email, password=example_password
        )


@pytest.mark.django_db()
def test_new_user_without_email_raises_error(example_username, example_password):
    """Test that creating a user without an email raises a TypeError."""
    with pytest.raises(TypeError):
        user = get_user_model().objects.create_user(
            username=example_username, password=example_password
        )


@pytest.mark.django_db()
def test_new_user_without_password_raises_error(example_username, example_email):
    """Test that creating a user without a password raises a TypeError."""
    with pytest.raises(TypeError):
        user = get_user_model().objects.create_user(
            username=example_username, email=example_email
        )


@pytest.mark.django_db()
def test_create_superuser(example_username, example_email, example_password):
    """Test creating a superuser."""
    user = get_user_model().objects.create_superuser(
        username=example_username, email=example_email, password=example_password
    )

    assert user.is_superuser == True
