import openai
import os
from dotenv import load_dotenv
import logging

# Load environment variables from the .env file
load_dotenv()

# Set up logging for error tracking
logger = logging.getLogger(__name__)

# Ensure you load the API key from the environment
openai.api_key = os.getenv("OPENAI_API_KEY")

if not openai.api_key:
    logger.error("OpenAI API key is missing.")
    raise ValueError("OpenAI API key is missing from environment variables.")

def safe_openai_call(prompt, engine="text-davinci-003", max_tokens=300, temperature=0.7):
    try:
        response = openai.Completion.create(
            engine=engine,
            prompt=prompt,
            max_tokens=max_tokens,
            temperature=temperature,
        )
        if not response.choices:
            logger.error(f"OpenAI API returned an empty response for prompt: {prompt}")
            return "No response from the AI."
        return response.choices[0].text.strip()
    except openai.error.OpenAIError as e:
        logger.error(f"OpenAI API error: {e}")
        return f"An error occurred: {e}"

def generate_quiz(topic):
    """
    Generates a quiz about the specified topic.
    """
    if not topic:
        return "Topic is required to generate a quiz."
    prompt = f"Create a quiz about {topic}. Include multiple-choice questions."
    return safe_openai_call(prompt)

def generate_todo_help(content):
    """
    Generates steps or help for the to-do list based on the extracted content.
    """
    if not content:
        return "Content is required for generating to-do help."
    prompt = f"Generate steps to complete the task based on the following content:\n\n{content}"
    return safe_openai_call(prompt)

def process_with_ai(extracted_text):
    """
    Passes the extracted content to the AI model.
    """
    ai_quiz = generate_quiz(extracted_text)
    ai_todo_help = generate_todo_help(extracted_text)
    return {
        'quiz': ai_quiz,
        'todo_help': ai_todo_help
    }
