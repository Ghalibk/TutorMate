from django.core.exceptions import AppRegistryNotReady
try:
    import tutormate.signals
except AppRegistryNotReady:
    pass  # Signals will be loaded when the registry is ready