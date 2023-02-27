"""
Tests for the Django admin modifications.
"""
from django.contrib.auth import get_user_model
from django.urls import reverse

import pytest


@pytest.fixture
def create_user(db):
    def make_user(**kwargs):
        username = kwargs.get("username", "testusername")
        email = kwargs.get("email", "user@example.com")
        password = kwargs.get("password", "testpass123")

        return get_user_model().objects.create_user(
            username=username, email=email, password=password
        )

    return make_user


def test_users_list(admin_client, create_user):
    """Test that users are listed on page."""
    user = create_user()
    url = reverse("admin:users_user_changelist")
    response = admin_client.get(url)

    assert bytes(user.username, "utf-8") in response.content
    assert bytes(user.email, "utf-8") in response.content


def test_edit_user_page(admin_client, create_user):
    """Test the edit user page works."""
    user = create_user()
    url = reverse("admin:users_user_change", args=[user.id])
    response = admin_client.get(url)

    assert response.status_code == 200


def test_create_user_page(admin_client, create_user):
    """Test the create user page works."""
    user = create_user()
    url = reverse("admin:users_user_add")
    response = admin_client.get(url)

    assert response.status_code == 200
