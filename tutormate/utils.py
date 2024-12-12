import openai
import os
from dotenv import load_dotenv
import logging
import re

# Load environment variables from the .env file
load_dotenv()

# Set up logging for error tracking
logger = logging.getLogger(__name__)

# Ensure you load the API key from the environment
openai.api_key = os.getenv("OPENAI_API_KEY")

import re

def extract_code_snippet(input_string):
    # First attempt to match the specific pattern
    match = re.search(r'```json(.*?)```', input_string, re.DOTALL)
    
    if match:
        return match.group(1).strip()
    
    # If the first pattern fails, try the second pattern
    match = re.search(r"\{.*\}", input_string, re.DOTALL)
    
    return match.group(0).strip() if match else ""


if not openai.api_key:
    logger.error("OpenAI API key is missing.")
    raise ValueError("OpenAI API key is missing from environment variables.")

def safe_openai_call(prompt, model="gpt-3.5-turbo", max_tokens=3000, temperature=0.7):
    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=max_tokens,
            temperature=temperature,
        )
        if not response.choices:
            logger.error(f"OpenAI API returned an empty response for prompt: {prompt}")
            return "No response from the AI."
        return response.choices[0].message["content"].strip()
    except openai.error.OpenAIError as e:  # Use OpenAIError for catching API errors
        logger.error(f"OpenAI API error: {e}")
        return f"An error occurred: {e}"
    except Exception as e:
        logger.error(f"Unexpected Error: {e}")
        return f"An unexpected error occurred: {e}"

def generate_quiz(difficulty, num_questions, extracted_text):
    prompt = (
                f"Create a {difficulty} quiz with {num_questions} questions based on the "
                f"following content with the correct answers:\n\n{extracted_text} "
                f"""\n\nit should be in a JSON file in a format like the following: {{
  "quiz": {{
    "title": "Quiz Title",
    "questions": [
      {{
        "question_id": 1,
        "question_text": "Question text goes here.",
        "options": [
          {{ "option_id": "a", "text": "Option A text" }},
          {{ "option_id": "b", "text": "Option B text" }},
          {{ "option_id": "c", "text": "Option C text" }},
          {{ "option_id": "d", "text": "Option D text" }}
        ],
        "correct_option": "a",
        "explanation": "Explanation for the correct answer goes here."
      }}
    ]
  }}
}}"""
                f"\n Make Sure you generate only a JSON file and nothing else in your answer and also make sure to change the order of the correct and not always put the correct answer in choice A"
            )

    return extract_code_snippet(safe_openai_call(prompt))

def generate_todo_help(assignment_name, description):
    prompt = (
                f"Give steps to solve assigment with the following name{assignment_name}"
                f" and the following description:\n\n{description} "
                f"""it should be in a JSON file in a format like the following: {{
  "todo_id": 1,
  "assignment_name": "Build a Calculator App",
  "steps": [
    {{
      "step_number": 1,
      "description": "Understand the requirements and functionalities of the calculator app."
    }},
    {{
      "step_number": 2,
      "description": "Design a user interface with buttons for numbers and operations."
    }},
    {{
      "step_number": 3,
      "description": "Write the code for handling arithmetic operations like addition, subtraction, multiplication, and division."
    }},
    {{
      "step_number": 4,
      "description": "Test the application for bugs or errors."
    }},
    {{
      "step_number": 5,
      "description": "Deploy the app and gather feedback for improvements."
    }}
  ]
}}"""
                f"\n Make Sure you generate only a JSON file and nothing else"
            )

    return extract_code_snippet(safe_openai_call(prompt))

def generate_flashcard(extracted_text):
    prompt = (
                f"Create a flashcard summary (each card has a front and back and should have a min of 300 words and a max of 600 words in both back and) "
                f"You can generate between 1 to 10 flash card of the following content:\n\n{extracted_text} "
                f"""\n\nit should be in a JSON file in a format like the following: {{
  "flashcards": [
    {{
      "id": 1,
      "frontHTML": "Question or topic for the front of the card.",
      "backHTML": "Answer or detailed explanation for the back of the card."
    }},
    {{
      "id": 2,
      "frontHTML": "Another question or topic.",
      "backHTML": "Corresponding explanation or answer."
    }}
  ]
}}
"""
                f"\n Make Sure you generate only a JSON file and nothing else in your answer."
            )

    return extract_code_snippet(safe_openai_call(prompt))

def generate_bulletpoints(extracted_text):
    prompt = (
                f"Create a bullet point summary "
                f"about the following content:\n\n{extracted_text} "
                f"""\n\n it should be in a JSON file in a format like the following: {{
  "bullet_points": [
    {{
      "id": 1,
      "text": "A concise point summarizing a key concept or topic."
    }},
    {{
      "id": 2,
      "text": "Another concise point summarizing another key concept."
    }},
    {{
      "id": 3,
      "text": "A third concise point providing additional context or information."
    }}
  ]
}}
"""
                f"\n Make Sure you generate only a JSON file and nothing else in your answer."
            )

    return extract_code_snippet(safe_openai_call(prompt))


def generate_full_summary(extracted_text):
    prompt = (
                f"Create a full detailed summary quiz "
                f"of the following content:\n\n{extracted_text} "
                f"""it should be in a JSON format like the following:
{{
  "summary": {{
    "title": "Document Title",
    "content": "A detailed summary of the document.",
    "sections": [
      {{
        "section_title": "Section 1 Title",
        "section_summary": "Brief summary of Section 1, highlighting its key points and main ideas."
      }},
      {{
        "section_title": "Section 2 Title",
        "section_summary": "Brief summary of Section 2, highlighting its key points and main ideas."
      }}
    ],
    "conclusion": "A concise conclusion summarizing the entire document."
  }}
}}"""
                f"\n Make Sure you generate only a JSON file and nothing else in your answer and also make sure to change the order of the correct and not always put the correct answer in choice A"
            )

    return extract_code_snippet(safe_openai_call(prompt))