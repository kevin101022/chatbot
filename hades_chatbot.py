"""
Hades - Chatbot Especializado en Desarrollo de Software
========================================================

Implementación principal del chatbot Hades.
"""

from hades_prompt import get_system_prompt, is_software_development_related
from config import CHATBOT_CONFIG
from typing import Optional, Callable
import os


class HadesChatbot:
    """
    Chatbot especializado en desarrollo de software.
    """
    
    def __init__(self, llm_callback: Optional[Callable[[str], str]] = None):
        """
        Inicializa el chatbot con su prompt del sistema.
        
        Args:
            llm_callback: Función opcional que recibe el mensaje del usuario
                         y retorna la respuesta del LLM. Si no se proporciona,
                         el chatbot solo validará las queries.
        """
        self.system_prompt = get_system_prompt()
        self.config = CHATBOT_CONFIG
        self.name = self.config["name"]
        self.conversation_history = []
        self.llm_callback = llm_callback
    
    def get_system_prompt(self) -> str:
        """
        Retorna el prompt del sistema.
        
        Returns:
            str: El prompt del sistema completo
        """
        return self.system_prompt
    
    def validate_query(self, query: str) -> tuple[bool, str]:
        """
        Valida si una consulta está dentro del ámbito de desarrollo de software.
        
        Args:
            query: La consulta del usuario
            
        Returns:
            tuple: (es_válida, mensaje)
        """
        if not query or not query.strip():
            return False, "Por favor, proporciona una pregunta válida."
        
        query_lower = query.lower().strip()
        
        # Verificar si es un saludo
        greetings = ["hola", "hi", "hello", "buenos días", "buenas tardes", "buenas noches"]
        if any(greeting in query_lower for greeting in greetings):
            return True, None
        
        # Validar si está relacionada con desarrollo de software
        if is_software_development_related(query):
            return True, None
        else:
            return False, self.config["responses"]["out_of_topic"]
    
    def format_response(self, response: str, include_code: bool = False, 
                       code_example: str = None) -> str:
        """
        Formatea una respuesta según las directrices del chatbot.
        
        Args:
            response: La respuesta principal
            include_code: Si se debe incluir código
            code_example: Ejemplo de código opcional
            
        Returns:
            str: Respuesta formateada
        """
        formatted = response
        
        if include_code and code_example:
            formatted += f"\n\n**Ejemplo de código:**\n```\n{code_example}\n```"
        
        return formatted
    
    def handle_query(self, query: str) -> str:
        """
        Procesa una consulta del usuario y retorna la respuesta.
        
        Args:
            query: La consulta del usuario
            
        Returns:
            str: La respuesta del chatbot
        """
        # Validar la consulta
        is_valid, validation_message = self.validate_query(query)
        
        if not is_valid:
            return validation_message
        
        # Si es un saludo, responder con el mensaje de bienvenida
        query_lower = query.lower().strip()
        greetings = ["hola", "hi", "hello", "buenos días", "buenas tardes", "buenas noches"]
        if any(greeting in query_lower for greeting in greetings):
            return self.config["responses"]["greeting"]
        
        # Si hay un callback de LLM configurado, usarlo
        if self.llm_callback:
            try:
                response = self.llm_callback(query)
                # Guardar en historial
                self.conversation_history.append({"role": "user", "content": query})
                self.conversation_history.append({"role": "assistant", "content": response})
                return response
            except Exception as e:
                return (
                    f"Error al procesar tu pregunta: {str(e)}\n"
                    "Por favor, inténtalo de nuevo o reformula tu pregunta."
                )
        
        # Si no hay LLM configurado, informar al usuario
        return (
            "✅ Tu pregunta ha sido validada y está dentro del ámbito de desarrollo de software.\n\n"
            "Para recibir una respuesta completa, necesitas configurar un proveedor de LLM.\n\n"
            "Puedes usar el prompt del sistema en 'hades_prompt.py' o 'hades_prompt.txt' "
            "con cualquier API de LLM (OpenAI, Claude, etc.).\n\n"
            "Consulta 'example_integration.py' para ver ejemplos de integración."
        )
    
    def reset_conversation(self):
        """Reinicia el historial de conversación."""
        self.conversation_history = []


# Función de utilidad para uso directo
def create_hades_instance(llm_callback: Optional[Callable[[str], str]] = None):
    """
    Crea una instancia del chatbot Hades.
    
    Args:
        llm_callback: Función opcional para integrar con un LLM.
                     Debe recibir el mensaje del usuario y retornar
                     la respuesta del LLM.
    
    Returns:
        HadesChatbot: Instancia configurada del chatbot
    """
    return HadesChatbot(llm_callback=llm_callback)


def create_openai_integration(api_key: Optional[str] = None):
    """
    Crea una función de callback para integrar con OpenAI.
    
    Args:
        api_key: API key de OpenAI. Si no se proporciona, se intenta
                obtener de la variable de entorno OPENAI_API_KEY.
    
    Returns:
        Callable: Función callback para usar con HadesChatbot
        
    Raises:
        ImportError: Si openai no está instalado
    """
    try:
        from openai import OpenAI
    except ImportError:
        raise ImportError(
            "OpenAI no está instalado. Ejecuta: pip install openai\n"
            "Luego configura tu API key con: export OPENAI_API_KEY='tu-key'"
        )
    
    api_key = api_key or os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError(
            "Se requiere una API key de OpenAI. "
            "Pásala como argumento o configura la variable de entorno OPENAI_API_KEY"
        )
    
    client = OpenAI(api_key=api_key)
    
    def llm_callback(user_query: str, model: str = "gpt-4") -> str:
        """
        Callback para enviar queries a OpenAI.
        
        Args:
            user_query: La pregunta del usuario
            model: Modelo a usar (gpt-4, gpt-3.5-turbo, etc.)
        
        Returns:
            str: Respuesta del modelo
        """
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
    
    return llm_callback


if __name__ == "__main__":
    # Ejemplo de uso
    hades = create_hades_instance()
    
    print("=" * 60)
    print("Hades - Chatbot Especializado en Desarrollo de Software")
    print("=" * 60)
    print()
    
    # Ejemplo 1: Pregunta válida
    query1 = "¿Cómo optimizo una consulta SQL?"
    print(f"Usuario: {query1}")
    print(f"Hades: {hades.handle_query(query1)}")
    print()
    
    # Ejemplo 2: Pregunta fuera de tema
    query2 = "¿Cuál es tu opinión sobre el cambio climático?"
    print(f"Usuario: {query2}")
    print(f"Hades: {hades.handle_query(query2)}")
    print()
    
    # Ejemplo 3: Saludo
    query3 = "Hola"
    print(f"Usuario: {query3}")
    print(f"Hades: {hades.handle_query(query3)}")
    print()

