from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
import requests
import re

@receiver(user_logged_in)
def update_or_create_user(sender, request, user, **kwargs):
    from .models import User
    from .views import get_graph_token

    graph_token = get_graph_token()  # Ensure this function is defined elsewhere
    id = None

    if graph_token:
        # Make a request to the Microsoft Graph API
        user_url = f"https://graph.microsoft.com/v1.0/users/{user.username}"
        headers = {
            "Authorization": f"Bearer {graph_token['access_token']}",
            "Content-Type": "application/json",
        }
        user_response = requests.get(url=user_url, headers=headers).json()

        # Extract data from the response
        display_name = user_response.get("displayName", "Unknown User")

        # Optionally extract a custom ID from displayName
        match = re.search(r"<\s*(\d+)\s*>", display_name)
        id = match.group(1) if match else None
        request.session["id"] = id
        request.session["first_name"] = user_response['givenName']
        request.session["last_name"] = user_response['surname']
        request.session["email"] = user_response['mail']


    # Check if the user exists in the custom User model
    if not User.objects.filter(user_id=id).exists():
        User.objects.create(
            user_id=id,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            canvas_token=None,
        )
