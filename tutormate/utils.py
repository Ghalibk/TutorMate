import openai
from django.conf import settings
import logging

# Set up logging for error tracking
logger = logging.getLogger(__name__)

# Ensure you load the API key from your settings
openai.api_key = settings.OPENAI_API_KEY

def safe_openai_call(prompt, engine="text-davinci-003", max_tokens=300, temperature=0.7):
    """
    Makes a safe call to the OpenAI API with the provided parameters.
    Handles errors and logs them.

    Args:
        prompt (str): The input text for OpenAI's model.
        engine (str): The OpenAI model to use (default: "text-davinci-003").
        max_tokens (int): The maximum number of tokens for the response (default: 300).
        temperature (float): Controls randomness in the output (default: 0.7).

    Returns:
        str: The OpenAI response or an error message.
    """
    try:
        response = openai.Completion.create(
            engine=engine,
            prompt=prompt,
            max_tokens=max_tokens,
            temperature=temperature,
        )
        return response.choices[0].text.strip()
    except openai.error.OpenAIError as e:
        logger.error(f"OpenAI API error: {e}")
        return f"An error occurred: {e}"

def generate_quiz(topic):
    """
    Generates a quiz about the specified topic.

    Args:
        topic (str): The topic for the quiz.

    Returns:
        str: The generated quiz or an error message.
    """
    if not topic:
        return "Topic is required to generate a quiz."
    prompt = f"Create a quiz about {topic}. Include multiple-choice questions."
    return safe_openai_call(prompt)

def summarize_course(content):
    """
    Summarizes the provided course content.

    Args:
        content (str): The course content to summarize.

    Returns:
        str: The summarized content or an error message.
    """
    if not content:
        return "Course content is required for summarization."
    prompt = f"Summarize the following course content:\n\n{content}"
    return safe_openai_call(prompt)

def generate_study_schedule(preferred_times, topics, total_hours):
    """
    Generates a study schedule based on preferred times, topics, and total hours.

    Args:
        preferred_times (list): A list of preferred time slots.
        topics (list): A list of topics to study.
        total_hours (int): The total number of hours available for study.

    Returns:
        dict: A dictionary with the schedule or an error message.
    """
    if not topics or not preferred_times or total_hours <= 0:
        return "Invalid input! Ensure topics, preferred times, and total hours are valid."
    
    hours_per_topic = total_hours // len(topics)
    schedule = {}
    for i, topic in enumerate(topics):
        time_slot = preferred_times[i % len(preferred_times)]
        schedule.setdefault(time_slot, []).append(f"{topic} ({hours_per_topic} hours)")
    return schedule
