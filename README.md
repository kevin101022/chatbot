# Hades - Chatbot Especializado en Desarrollo de Software

Hades es un chatbot altamente preciso y eficiente diseñado para responder exclusivamente sobre desarrollo de software, manteniéndose dentro de su campo de especialización.

## 🎯 Características Principales

- **Enfoque exclusivo**: Solo responde preguntas relacionadas con desarrollo de software
- **Precisión**: Respuestas claras y concisas con ejemplos de código cuando sea necesario
- **Buenas prácticas**: Promueve estándares de calidad en el desarrollo
- **Manejo de límites**: Reconoce y redirige preguntas fuera de su especialidad de manera educada
- **Amplio conocimiento**: Cubre lenguajes, frameworks, herramientas y metodologías de desarrollo

## 📁 Estructura del Proyecto

```
chatbotk/
├── index.html           # Frontend - Interfaz web moderna
├── styles.css           # Estilos tipo inframundo (Hades)
├── app.js               # JavaScript para interacciones
├── app.py               # Servidor Flask para el frontend
├── hades_prompt.py      # Prompt del sistema completo
├── config.py            # Configuración del chatbot
├── hades_chatbot.py     # Implementación del chatbot
├── quick_start.py       # Script de inicio rápido
├── example_integration.py # Ejemplos de integración con LLMs
├── hades_prompt.txt     # Prompt en formato texto plano
├── requirements.txt     # Dependencias
└── README.md            # Documentación
```

## 🚀 Uso Rápido

### 🌐 Frontend Web (Recomendado)

**¡El chatbot ahora tiene una interfaz web moderna tipo inframundo! 🔥**

1. **Instalar dependencias:**
```bash
pip install flask flask-cors
```

2. **Iniciar el servidor:**
```bash
python app.py
```

3. **Abrir en el navegador:**
```
http://localhost:5000
```

¡Disfruta de la interfaz moderna con tema del inframundo! 🌋

### 💻 Uso Básico (Backend)

```python
from hades_chatbot import create_hades_instance

# Crear instancia del chatbot
hades = create_hades_instance()

# Hacer una pregunta
respuesta = hades.handle_query("¿Cómo optimizo una consulta SQL?")
print(respuesta)
```

### Obtener el Prompt del Sistema

```python
from hades_prompt import get_system_prompt

# Obtener el prompt completo
prompt = get_system_prompt()
print(prompt)
```

## 📝 Integración con APIs de LLM

El prompt está diseñado para ser usado directamente con APIs de modelos de lenguaje como:

- OpenAI GPT
- Anthropic Claude
- Google Gemini
- Azure OpenAI
- Otros modelos compatibles

### Ejemplo con OpenAI (requiere openai package)

```python
from openai import OpenAI
from hades_prompt import get_system_prompt

client = OpenAI(api_key="tu-api-key")

def chat_with_hades(user_query):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": get_system_prompt()},
            {"role": "user", "content": user_query}
        ]
    )
    return response.choices[0].message.content
```

## 🎓 Áreas de Especialización

Hades puede ayudar con:

- ✅ Lenguajes de programación (Python, JavaScript, Java, C++, etc.)
- ✅ Desarrollo web (frontend, backend, fullstack)
- ✅ Desarrollo móvil (Android, iOS, React Native, Flutter)
- ✅ Bases de datos (SQL, NoSQL, optimización)
- ✅ Arquitecturas de software (microservicios, monolitos, serverless)
- ✅ Metodologías (Agile, Scrum, TDD, CI/CD)
- ✅ Herramientas (Git, Docker, Kubernetes, IDEs)
- ✅ Patrones de diseño y arquitectura
- ✅ Testing (unitarios, integración, E2E)
- ✅ Seguridad en aplicaciones
- ✅ Performance y optimización
- ✅ DevOps y Cloud Computing

## ⚠️ Manejo de Preguntas Fuera de Tema

Cuando se le hace una pregunta fuera del ámbito de desarrollo de software, Hades responderá de manera educada pero firme:

> "Lo siento, no soy experto en este tema. Sin embargo, puedo ofrecerte ayuda con cualquier pregunta sobre desarrollo de software."

## 📋 Directrices de Respuesta

1. **Claridad**: Respuestas comprensibles con ejemplos cuando sea necesario
2. **Precisión**: Basadas en el lenguaje o tecnología específica mencionada
3. **Buenas prácticas**: Énfasis en código limpio, modularidad y documentación
4. **Honestidad**: Admite cuando no tiene suficiente información
5. **Recursos útiles**: Sugiere alternativas confiables cuando sea apropiado

## 🔧 Configuración

Puedes personalizar el comportamiento del chatbot editando `config.py`:

```python
CHATBOT_CONFIG = {
    "name": "Hades",
    "specialization": "Desarrollo de Software",
    # ... más configuraciones
}
```

## 📦 Dependencias

### Dependencias principales (requeridas):
```bash
pip install flask flask-cors
```

### Dependencias opcionales para LLMs:
- `openai` (para OpenAI GPT)
- `anthropic` (para Claude)
- O la librería correspondiente para tu proveedor de LLM preferido

## 🤝 Contribuciones

Este proyecto está diseñado para ser una base sólida. Puedes extenderlo con:

- Integraciones con diferentes APIs de LLM
- Sistema de memoria/conversación persistente
- Validación más sofisticada de queries
- Interfaz de usuario (web, CLI, etc.)
- Sistema de logging y métricas

## 📄 Licencia

Este proyecto está disponible para uso y modificación según tus necesidades.

## 💡 Ejemplo de Conversación

```
Usuario: ¿Cómo puedo optimizar una consulta SQL para que sea más rápida?

Hades: Puedo ayudarte con eso. Para optimizar una consulta SQL, asegúrate de 
que estás utilizando índices en las columnas que más consultas, evita los 
SELECT *, y limita el uso de subconsultas anidadas si es posible...

[Incluye ejemplos de código y mejores prácticas]
```

## 🎨 Características del Frontend

- **Diseño Moderno**: Interfaz web moderna con tema del inframundo
- **Animaciones Suaves**: Efectos visuales tipo fuego y partículas
- **Colores Temáticos**: Rojo, naranja, negro (inframundo)
- **Responsive**: Funciona en móviles y escritorio
- **Tiempo Real**: Conversación fluida con indicadores de carga
- **Formato de Código**: Resalta código en las respuestas

## 🌐 Funcionalidades del Frontend

- Chat en tiempo real con Hades
- Validación automática de queries
- Indicador de carga animado
- Fondo de partículas animado
- Scroll automático a nuevos mensajes
- Formato automático de código en respuestas

---

**Hades** - Tu asistente experto en desarrollo de software 🚀🔥

