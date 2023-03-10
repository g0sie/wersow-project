"""
Tests for users in Django admin.
"""
from django.test import TestCase
from django.test import Client
from django.contrib.auth import get_user_model
from django.urls import reverse


class UserAdminTests(TestCase):
    """Tests for users in Django admin."""

    def setUp(self):
        """Login as superuser and create another user."""
        self.client = Client()
        self.admin_user = get_user_model().objects.create_superuser(
            email="admin@example.com", password="testpass123"
        )
        self.client.force_login(self.admin_user)
        self.user = get_user_model().objects.create_user(
            email="user@example.com", password="testpass123", username="user"
        )

    def test_users_list(self):
        """Test that users are listed on page."""
        url = reverse("admin:users_user_changelist")
        res = self.client.get(url)

        self.assertContains(res, self.user.username)
        self.assertContains(res, self.user.email)
        self.assertContains(res, "date_joined")
