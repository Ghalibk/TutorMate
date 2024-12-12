from django.core.exceptions import AppRegistryNotReady
import os
try:
    import tutormate.signals
except AppRegistryNotReady:
    pass  # Signals will be loaded when the registry is ready