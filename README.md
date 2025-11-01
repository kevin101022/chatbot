# Hades - Chatbot Especializado en Desarrollo de Software

Hades es un chatbot altamente preciso y eficiente diseñado para responder exclusivamente sobre desarrollo de software, manteniéndose dentro de su campo de especialización.

## 🎯 Características Principales

- **Enfoque exclusivo**: Solo responde preguntas relacionadas con desarrollo de software
- **Precisión**: Respuestas claras y concisas con ejemplos de código cuando sea necesario
- **Buenas prácticas**: Promueve estándares de calidad en el desarrollo
- **Manejo de límites**: Reconoce y redirige preguntas fuera de su especialidad de manera educada
- **Amplio conocimiento**: Cubre lenguajes, frameworks, herramientas y metodologías de desarrollo
- **UI Moderna**: Interfaz web increíble con Tailwind CSS y efectos visuales

## 📁 Estructura del Proyecto

```
chatbotk/
├── index.html           # Frontend - Interfaz web moderna con Tailwind CSS
├── styles.css           # Estilos complementarios
├── app.js.example       # Plantilla de app.js (cópiala y configura tu API key)
├── app.js               # JavaScript con integración a OpenAI API (NO subir a Git)
├── hades_prompt.txt     # Prompt del sistema completo
├── .gitignore          # Archivos a ignorar en Git
└── README.md            # Documentación
```

## 🚀 Inicio Rápido

### Requisitos

1. **Cuenta de OpenAI**: Necesitas una API key de OpenAI para usar el chatbot
   - Regístrate en: https://platform.openai.com/
   - Obtén tu API key desde: https://platform.openai.com/api-keys

### Configuración desde GitHub

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/chatbotk.git
   cd chatbotk
   ```

2. **Configura tu API key de OpenAI**:
   
   **Opción 1: Copiar el archivo de ejemplo**
   ```bash
   cp app.js.example app.js
   ```
   
   Luego edita `app.js` y reemplaza:
   ```javascript
   const OPENAI_API_KEY = 'tu-api-key-aqui';
   ```
   
   Con tu API key real:
   ```javascript
   const OPENAI_API_KEY = 'sk-tu-api-key-real-aqui';
   ```
   
   **Opción 2: Crear app.js manualmente** copiando el contenido de `app.js.example` y configurando tu API key.

3. **Abre `index.html` en tu navegador**:
   
   Puedes:
   - Abrirlo directamente haciendo doble clic en `index.html`
   - O usar un servidor local simple:
     ```bash
     # Con Python (si lo tienes instalado)
     python -m http.server 8000
     
     # O con Node.js (si lo tienes instalado)
     npx http-server -p 8000
     ```
   
   Luego abre: `http://localhost:8000`

### ⚠️ Importante sobre la API Key

Por seguridad, **NUNCA** subas tu API key a repositorios públicos:

1. El archivo `app.js` con tu API key está protegido en `.gitignore`
2. Usa `app.js.example` como plantilla (ya está en el repositorio)
3. **NUNCA** hagas commit de `app.js` con tu API key real
4. Si accidentalmente subiste tu API key, cámbiala inmediatamente en OpenAI

> 💡 **Tip**: Si quieres colaborar al proyecto, puedes enviar PRs usando `app.js.example` como referencia.

## 💡 Ejemplos de Uso

Una vez configurado, puedes hacer preguntas como:

- **Optimización**: "¿Cómo puedo optimizar una consulta SQL para que sea más rápida?"
- **Conceptos**: "¿Qué es un closure en JavaScript?"
- **Buenas prácticas**: "¿Cuáles son las mejores prácticas para manejar errores en Node.js?"
- **Arquitectura**: "¿Cuándo debería usar microservicios en lugar de una arquitectura monolítica?"
- **Herramientas**: "¿Cómo configuro Docker para una aplicación React?"

### Ejemplo de Respuesta

**Pregunta:** "¿Cómo optimizo una consulta SQL?"

**Respuesta de Hades:**
```
Puedo ayudarte con eso. Para optimizar una consulta SQL, hay varias estrategias:

1. Usar índices en columnas frecuentemente consultadas
2. Evitar SELECT * y seleccionar solo columnas necesarias
3. Limitar el uso de subconsultas anidadas
4. Usar JOINs eficientes en lugar de múltiples consultas

Ejemplo de optimización:

❌ Ineficiente:
SELECT * FROM usuarios WHERE edad > 18;

✅ Optimizado:
SELECT id, nombre, email FROM usuarios 
WHERE edad > 18 AND estado = 'activo';
```

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **Tailwind CSS**: Framework CSS moderno (via CDN)
- **JavaScript (ES6+)**: Lógica del frontend
- **OpenAI API**: Integración con GPT-4 o GPT-3.5-turbo
- **Highlight.js**: Resaltado de sintaxis para código
- **Canvas API**: Animación de partículas en el fondo

## 📝 Personalización del Prompt

El prompt del sistema está en `hades_prompt.txt`. Puedes editarlo para:

- Ajustar el comportamiento del chatbot
- Agregar o modificar áreas de especialización
- Cambiar el tono de las respuestas
- Personalizar el manejo de preguntas fuera de tema

El archivo se carga automáticamente cuando inicias la aplicación.

## 🔧 Configuración Avanzada

### Cambiar el Modelo de OpenAI

En `app.js`, puedes cambiar el modelo:

```javascript
const MODEL = 'gpt-4';  // Modelo más potente pero más costoso
// o
const MODEL = 'gpt-3.5-turbo';  // Más económico
```

### Ajustar Parámetros de la API

Puedes modificar los parámetros en la función `sendToOpenAI()`:

```javascript
temperature: 0.7,      // Creatividad (0-1, más alto = más creativo)
max_tokens: 2000       // Máximo de tokens en la respuesta
```

## 🚫 Manejo de Preguntas Fuera de Tema

Si preguntas algo fuera del ámbito de desarrollo de software, Hades responderá educadamente:

**Ejemplo:**
- **Pregunta**: "¿Cuál es tu opinión sobre el cambio climático?"
- **Respuesta**: "Lo siento, no soy experto en este tema. Sin embargo, puedo ayudarte con cualquier duda relacionada con desarrollo de software."

## 🎨 Personalización Visual

### Colores del Tema

Los colores del tema "inframundo" están definidos en `index.html`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'inferno-red': '#ff3b3b',
                'inferno-orange': '#ff6b35',
                'inferno-yellow': '#ffa726',
            }
        }
    }
}
```

Puedes cambiarlos para personalizar la apariencia.

## 📋 Áreas de Especialización de Hades

- ✅ Programación: lenguajes (Python, JavaScript, Java, C++, C#, Go, Rust, HTML, CSS, etc.)
- ✅ Desarrollo web: frontend, backend, fullstack
- ✅ Desarrollo móvil: Android, iOS, React Native, Flutter
- ✅ Bases de datos: SQL, NoSQL, diseño de esquemas, optimización
- ✅ Arquitecturas: microservicios, monolitos, serverless
- ✅ Metodologías: Agile, Scrum, TDD, CI/CD
- ✅ Herramientas: Git, Docker, Kubernetes, IDEs
- ✅ Patrones de diseño y arquitectura
- ✅ Testing: unitarios, integración, E2E
- ✅ Seguridad en aplicaciones
- ✅ Performance y optimización
- ✅ DevOps y Cloud Computing

## 🐛 Solución de Problemas

### El chatbot no responde

1. Verifica que tu API key esté configurada correctamente en `app.js`
2. Asegúrate de tener créditos disponibles en tu cuenta de OpenAI
3. Verifica tu conexión a internet
4. Abre la consola del navegador (F12) para ver errores

### Error de CORS

Si ves errores de CORS, asegúrate de estar sirviendo los archivos desde un servidor HTTP (no solo abriendo el archivo directamente). Usa:

```bash
python -m http.server 8000
# o
npx http-server -p 8000
```

### El prompt no se carga

Si el archivo `hades_prompt.txt` no se puede cargar, el sistema usará un prompt por defecto. Asegúrate de que el archivo esté en el mismo directorio que `index.html`.

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso libre.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Siéntete libre de:

- Reportar bugs
- Sugerir mejoras
- Enviar pull requests

## 📧 Soporte

Si tienes preguntas o problemas, puedes:

1. Revisar la sección de solución de problemas
2. Verificar la consola del navegador para errores
3. Asegurarte de tener la última versión del código

---

**🔥 Hades está listo para ayudarte con tus dudas de desarrollo de software! 🔥**
