"""
Script de Inicio Rápido - Hades Chatbot
=========================================

Este script muestra cómo usar Hades de manera simple.
"""

from hades_chatbot import create_hades_instance, create_openai_integration
from hades_prompt import get_system_prompt


def main():
    """
    Función principal que demuestra el uso de Hades.
    """
    print("=" * 70)
    print("🚀 Hades - Chatbot Especializado en Desarrollo de Software")
    print("=" * 70)
    print()
    
    # Opción 1: Sin LLM (solo validación)
    print("📋 Opción 1: Uso básico (solo validación de queries)")
    print("-" * 70)
    hades_basic = create_hades_instance()
    
    queries_basic = [
        "¿Cómo optimizo una consulta SQL?",
        "¿Cuál es tu opinión sobre el cambio climático?",
        "Hola"
    ]
    
    for query in queries_basic:
        print(f"\nUsuario: {query}")
        print(f"Hades: {hades_basic.handle_query(query)}")
    
    print("\n" + "=" * 70)
    print()
    
    # Opción 2: Con OpenAI (si está configurado)
    print("🤖 Opción 2: Uso con OpenAI (requiere API key)")
    print("-" * 70)
    
    import os
    api_key = os.getenv("OPENAI_API_KEY")
    
    if api_key:
        try:
            print("\n✅ API key encontrada. Configurando integración con OpenAI...\n")
            llm_callback = create_openai_integration(api_key)
            hades_llm = create_hades_instance(llm_callback=llm_callback)
            
            # Ejemplo de consulta con LLM
            query = "¿Cómo puedo optimizar una consulta SQL?"
            print(f"Usuario: {query}")
            print(f"\nHades: {hades_llm.handle_query(query)}\n")
            
        except ImportError:
            print("⚠️  OpenAI no está instalado. Ejecuta: pip install openai")
        except Exception as e:
            print(f"⚠️  Error al conectar con OpenAI: {e}")
    else:
        print("\n⚠️  No se encontró OPENAI_API_KEY en las variables de entorno.")
        print("   Para usar OpenAI, configura: export OPENAI_API_KEY='tu-key'")
        print("   O instala python-dotenv y crea un archivo .env")
    
    print("\n" + "=" * 70)
    print()
    
    # Mostrar el prompt del sistema
    print("📝 Prompt del Sistema:")
    print("-" * 70)
    print("Para ver el prompt completo, puedes usar:")
    print("  from hades_prompt import get_system_prompt")
    print("  print(get_system_prompt())")
    print()
    print("O abrir el archivo 'hades_prompt.txt'")
    print("=" * 70)


if __name__ == "__main__":
    main()

