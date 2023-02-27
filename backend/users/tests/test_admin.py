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
