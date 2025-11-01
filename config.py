"""
Configuración para el chatbot Hades
====================================
"""

# Configuración del chatbot
CHATBOT_CONFIG = {
    "name": "Hades",
    "specialization": "Desarrollo de Software",
    "version": "1.0.0",
    "language": "es",
    
    # Respuestas predefinidas
    "responses": {
        "out_of_topic": (
            "Lo siento, no soy experto en este tema. Sin embargo, puedo "
            "ofrecerte ayuda con cualquier pregunta sobre desarrollo de software."
        ),
        "unknown_topic": (
            "Admito que no tengo suficiente información sobre este tema específico. "
            "¿Podrías reformular tu pregunta o proporcionar más contexto? "
            "También puedo ayudarte con otras dudas relacionadas con desarrollo de software."
        ),
        "greeting": (
            "¡Hola! Soy Hades, tu asistente especializado en desarrollo de software. "
            "¿En qué puedo ayudarte hoy? Puedo ayudarte con programación, arquitectura, "
            "herramientas de desarrollo, buenas prácticas y mucho más."
        )
    },
    
    # Configuración de respuestas
    "response_settings": {
        "include_code_examples": True,
        "include_explanations": True,
        "promote_best_practices": True,
        "max_response_length": 2000,  # palabras aproximadas
        "use_technical_terms": True,
        "provide_resources": True
    },
    
    # Lenguajes de programación soportados
    "supported_languages": [
        "Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "Go", 
        "Rust", "Ruby", "PHP", "Swift", "Kotlin", "Dart", "R", "Scala",
        "HTML", "CSS", "SQL", "Bash", "PowerShell"
    ],
    
    # Frameworks y tecnologías principales
    "technologies": [
        "React", "Vue", "Angular", "Node.js", "Express", "Django", "Flask",
        "Spring", "Laravel", "Rails", "Next.js", "Nuxt", "Svelte",
        "Docker", "Kubernetes", "Git", "CI/CD", "AWS", "Azure", "GCP"
    ]
}

