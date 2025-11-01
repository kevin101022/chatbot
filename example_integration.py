"""
Ejemplo de Integración de Hades con APIs de LLM
================================================

Este archivo muestra ejemplos de cómo integrar el prompt de Hades
con diferentes proveedores de modelos de lenguaje.
"""

from hades_prompt import get_system_prompt
from hades_chatbot import HadesChatbot
import os
from typing import Optional


def example_with_openai():
    """
    Ejemplo de integración con OpenAI GPT.
    
    Requiere: pip install openai
    """
    try:
        from openai import OpenAI
        
        # Configurar el cliente (asegúrate de tener OPENAI_API_KEY en tu .env)
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        def chat_with_hades(user_query: str, model: str = "gpt-4") -> str:
            """
            Envía una consulta a Hades usando OpenAI.
            
            Args:
                user_query: La pregunta del usuario
                model: El modelo a usar (gpt-4, gpt-3.5-turbo, etc.)
            
            Returns:
                str: La respuesta de Hades
            """
            # Validar primero con el chatbot
            hades = HadesChatbot()
            is_valid, validation_message = hades.validate_query(user_query)
            
            if not is_valid:
                return validation_message
            
            # Si es válida, enviar al modelo
            response = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": get_system_prompt()},
                    {"role": "user", "content": user_query}
                ],
                temperature=0.7,
                max_tokens=1500
            )
            
            return response.choices[0].message.content
        
        # Ejemplo de uso
        print("=== Ejemplo con OpenAI ===")
        respuesta = chat_with_hades("¿Cómo optimizo una consulta SQL?")
        print(f"Respuesta: {respuesta}\n")
        
        return chat_with_hades
        
    except ImportError:
        print("OpenAI no está instalado. Ejecuta: pip install openai")
        return None


def example_with_anthropic():
    """
    Ejemplo de integración con Anthropic Claude.
    
    Requiere: pip install anthropic
    """
    try:
        import anthropic
        
        client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        
        def chat_with_hades(user_query: str, model: str = "claude-3-5-sonnet-20241022") -> str:
            """
            Envía una consulta a Hades usando Anthropic Claude.
            
            Args:
                user_query: La pregunta del usuario
                model: El modelo a usar
            
            Returns:
                str: La respuesta de Hades
            """
            hades = HadesChatbot()
            is_valid, validation_message = hades.validate_query(user_query)
            
            if not is_valid:
                return validation_message
            
            message = client.messages.create(
                model=model,
                max_tokens=1500,
                system=get_system_prompt(),
                messages=[
                    {"role": "user", "content": user_query}
                ]
            )
            
            return message.content[0].text
        
        # Ejemplo de uso
        print("=== Ejemplo con Anthropic ===")
        respuesta = chat_with_hades("¿Cómo optimizo una consulta SQL?")
        print(f"Respuesta: {respuesta}\n")
        
        return chat_with_hades
        
    except ImportError:
        print("Anthropic no está instalado. Ejecuta: pip install anthropic")
        return None


def example_with_azure_openai():
    """
    Ejemplo de integración con Azure OpenAI.
    
    Requiere: pip install openai azure-identity
    """
    try:
        from openai import AzureOpenAI
        from azure.identity import DefaultAzureCredential
        
        endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
        api_version = os.getenv("AZURE_OPENAI_API_VERSION", "2024-02-15-preview")
        deployment_name = os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME")
        
        client = AzureOpenAI(
            azure_endpoint=endpoint,
            api_version=api_version,
            azure_ad_token_provider=DefaultAzureCredential().get_token
        )
        
        def chat_with_hades(user_query: str) -> str:
            """
            Envía una consulta a Hades usando Azure OpenAI.
            
            Args:
                user_query: La pregunta del usuario
            
            Returns:
                str: La respuesta de Hades
            """
            hades = HadesChatbot()
            is_valid, validation_message = hades.validate_query(user_query)
            
            if not is_valid:
                return validation_message
            
            response = client.chat.completions.create(
                model=deployment_name,
                messages=[
                    {"role": "system", "content": get_system_prompt()},
                    {"role": "user", "content": user_query}
                ],
                temperature=0.7,
                max_tokens=1500
            )
            
            return response.choices[0].message.content
        
        print("=== Ejemplo con Azure OpenAI ===")
        respuesta = chat_with_hades("¿Cómo optimizo una consulta SQL?")
        print(f"Respuesta: {respuesta}\n")
        
        return chat_with_hades
        
    except ImportError:
        print("Azure OpenAI no está instalado. Ejecuta: pip install openai azure-identity")
        return None


def simple_chat_interface():
    """
    Interfaz simple de chat para interactuar con Hades.
    """
    print("=" * 60)
    print("Hades - Chatbot Especializado en Desarrollo de Software")
    print("=" * 60)
    print("Escribe 'salir' para terminar la conversación")
    print("=" * 60)
    print()
    
    hades = HadesChatbot()
    
    while True:
        user_input = input("Usuario: ").strip()
        
        if user_input.lower() in ['salir', 'exit', 'quit']:
            print("\n¡Hasta luego! Vuelve cuando tengas más preguntas sobre desarrollo de software.")
            break
        
        if not user_input:
            continue
        
        respuesta = hades.handle_query(user_input)
        print(f"Hades: {respuesta}\n")


if __name__ == "__main__":
    # Ejemplo básico sin integración con LLM
    print("Ejecutando ejemplo básico de Hades...\n")
    simple_chat_interface()
    
    # Para usar con APIs reales, descomenta la que prefieras:
    # example_with_openai()
    # example_with_anthropic()
    # example_with_azure_openai()

