# tutormate/apps.py

from django.apps import AppConfig
import threading
import os
from django.db import connection
from django.db.models.signals import post_migrate
from django.dispatch import receiver

class TutorMateConfig(AppConfig):
    name = 'tutormate'

    def ready(self):
        print("AppConfig ready!")
        # Ensure that the database connection is fully set up before starting the sync thread
        from django.db import connection
        from .sync import run_periodic_sync  # Import sync logic after the app is initialized
        
        def check_db_connection():
            # Check if the database connection is ready
            try:
                with connection.cursor():
                    if not os.environ.get('RUN_MAIN'):
                        print("Database connection is ready.")
                        threading.Thread(target=run_periodic_sync, daemon=True).start()
            except Exception as e:
                print(f"Error with the database connection: {e}")

        # Ensure the database connection is established, then start sync thread
        check_db_connection()
