// Sistema de prompt para Hades - Chatbot de Desarrollo de Software
class HadesChatbot {
    constructor() {
        this.systemPrompt = this.getSystemPrompt();
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        
        this.init();
    }

    getSystemPrompt() {
        return {
            role: "Soy Hades, un chatbot experto en desarrollo de software. Mi especialidad incluye programación de aplicaciones web, móviles, sistemas, bases de datos, arquitecturas de software, metodologías ágiles, herramientas de desarrollo, buenas prácticas de código y soluciones a errores comunes.",
            objective: "Ayudar a desarrolladores de todos los niveles a resolver dudas relacionadas con el proceso de desarrollo de software.",
            guidelines: {
                focus: "Solo proporcionaré respuestas relacionadas con programación, herramientas de desarrollo, estructuras de datos, metodologías, o cualquier otro tema relevante dentro del campo del desarrollo de software.",
                clarity: "Mis respuestas deben ser fácilmente comprensibles, con ejemplos de código cuando sea necesario.",
                offTopic: "Si se me hacen preguntas fuera del ámbito de desarrollo de software, debo responder de manera educada pero firme.",
                bestPractices: "Enfatizaré la importancia de las buenas prácticas de desarrollo de software.",
                uncertainty: "En caso de duda, admitiré y ofreceré una alternativa o sugeriré recursos de calidad."
            },
            keywords: [
                'programación', 'código', 'software', 'desarrollo', 'aplicación', 'app', 'web', 'móvil',
                'lenguaje', 'framework', 'biblioteca', 'API', 'base de datos', 'SQL', 'arquitectura',
                'algoritmo', 'estructura de datos', 'debug', 'error', 'compilación', 'sintaxis',
                'función', 'variable', 'clase', 'objeto', 'variable', 'array', 'objeto', 'async',
                'promesa', 'callback', 'HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular',
                'Node.js', 'Python', 'Java', 'C++', 'Git', 'repo', 'repositorio', 'commit',
                'push', 'pull', 'branch', 'merge', 'deploy', 'servidor', 'cliente', 'frontend',
                'backend', 'fullstack', 'DevOps', 'Docker', 'Kubernetes', 'microservicios',
                'REST', 'GraphQL', 'JSON', 'XML', 'HTTP', 'HTTPS', 'protocolo', 'endpoint',
                'autenticación', 'autorización', 'seguridad', 'cifrado', 'hash', 'token',
                'cookies', 'session', 'cache', 'optimización', 'performance', 'rendimiento'
            ]
        };
    }

    init() {
        this.sendButton.addEventListener('click', () => this.handleSend());
        this.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });
        this.userInput.addEventListener('input', () => this.autoResize());
    }

    autoResize() {
        this.userInput.style.height = 'auto';
        this.userInput.style.height = Math.min(this.userInput.scrollHeight, 150) + 'px';
    }

    isRelatedToSoftwareDevelopment(text) {
        const lowerText = text.toLowerCase();
        return this.systemPrompt.keywords.some(keyword => 
            lowerText.includes(keyword.toLowerCase())
        );
    }

    async handleSend() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Deshabilitar input mientras procesa
        this.userInput.disabled = true;
        this.sendButton.disabled = true;

        // Mostrar mensaje del usuario
        this.addMessage(message, 'user');
        this.userInput.value = '';
        this.autoResize();

        // Mostrar indicador de escritura
        const typingIndicator = this.showTypingIndicator();

        // Procesar respuesta
        setTimeout(() => {
            this.removeTypingIndicator(typingIndicator);
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
            
            // Habilitar input
            this.userInput.disabled = false;
            this.sendButton.disabled = false;
            this.userInput.focus();
        }, 800 + Math.random() * 800); // Simular procesamiento
    }

    generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        // Detectar saludos y despedidas primero
        if (this.isGoodbye(lowerMessage)) {
            return this.getGoodbyeResponse();
        }

        if (this.isGreeting(lowerMessage)) {
            return this.getGreetingResponse();
        }

        // Verificar si está relacionado con desarrollo de software
        if (!this.isRelatedToSoftwareDevelopment(userMessage)) {
            return this.getOffTopicResponse();
        }

        if (this.isErrorQuestion(lowerMessage)) {
            return this.getErrorResponse(userMessage);
        }

        if (this.isOptimizationQuestion(lowerMessage)) {
            return this.getOptimizationResponse(userMessage);
        }

        if (this.isGeneralQuestion(lowerMessage)) {
            return this.getGeneralResponse(userMessage);
        }

        return this.getSpecificResponse(userMessage);
    }

    isGreeting(message) {
        return /^(hola|hi|hey|buenos|buenas|saludos|qué tal|como estás|qué más|buen día|buenos días|buenas tardes|buenas noches|quihubo|quihubole|qué hubo|qué pasa|buenas|buen día)/i.test(message);
    }

    isGoodbye(message) {
        return /(adios|adiós|chao|chau|nos vemos|hasta luego|hasta pronto|hasta la vista|que vaya bien|cuídate|cuídese|que esté bien|que le vaya bien|hasta después)/i.test(message);
    }

    isErrorQuestion(message) {
        return /(error|problema|bug|fallo|no funciona|no compila|exception|undefined|null|exception)/i.test(message);
    }

    isOptimizationQuestion(message) {
        return /(optimizar|mejorar|performance|rendimiento|velocidad|rápido|lento|eficiente|mejorar código)/i.test(message);
    }

    isGeneralQuestion(message) {
        return /(qué es|qué son|explica|diferencia entre|cómo funciona|qué significa)/i.test(message);
    }

    getOffTopicResponse() {
        const responses = [
            "Ay sí, disculpe pero no soy experto en ese tema. Sin embargo, puedo ayudarle con cualquier pregunta sobre desarrollo de software. ¿Hay algo relacionado con programación, herramientas de desarrollo, arquitecturas o tecnologías en las que pueda asistirle?",
            "Ay sí, con gusto pero ese tema no es de mi especialidad. Lo que sí puedo ayudarle es con cualquier cosa de desarrollo de software: programación, bases de datos, herramientas y eso. ¿En qué puedo asistirle?",
            "Ay, disculpe pero ese tema no lo manejo. Lo que sí puedo ayudarle es con desarrollo de software. ¿Hay algo de programación o tecnologías en lo que pueda asistirle?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getGreetingResponse() {
        const responses = [
            "¡Qué más! ¡Cómo así! Estoy acá para ayudarle con cualquier duda sobre desarrollo de software. Puedo asistirle con programación, arquitecturas, bases de datos, herramientas de desarrollo, optimización de código, resolución de errores y mucho más. ¿En qué puedo ayudarle hoy?",
            "¡Hola! ¡Qué tal! Con gusto le ayudo con cualquier cosa de desarrollo de software. Puedo asistirle con programación, bases de datos, herramientas y todo eso relacionado con el desarrollo. ¿Qué necesita hoy?",
            "¡Qué más! ¡Bienvenido! Estoy aquí para ayudarle con todo lo relacionado con desarrollo de software. Desde programación hasta arquitecturas y bases de datos, lo que necesite. ¿En qué puedo asistirle?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getGoodbyeResponse() {
        const responses = [
            "¡Que le vaya bien! Cualquier cosa relacionada con desarrollo de software, aquí estaré para ayudarle. ¡Cuídese mucho!",
            "¡Nos vemos! Si necesita algo más de programación o desarrollo de software, aquí estaré. ¡Que esté bien!",
            "¡Hasta luego! Cualquier duda de desarrollo de software, no dude en preguntarme. ¡Que le vaya bien y cuídese!",
            "¡Chao! Estaré acá cuando necesite ayuda con algo de desarrollo de software. ¡Que esté bien!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getErrorResponse(message) {
        // Detectar tipo de error común
        if (/sql|consulta|query|database|base de datos/i.test(message)) {
            return `Ay sí, veo que tiene un problema relacionado con bases de datos. Para ayudarle mejor, necesitaría ver el error específico que está recibiendo. Algunas causas comunes incluyen:

\`\`\`sql
-- Ejemplo de consulta problemática
SELECT * FROM usuarios WHERE nombre LIKE '%valor%';
\`\`\`

**Sugerencias generales:**
- Verifique la sintaxis SQL correcta según su motor de base de datos
- Asegúrese de que las tablas y columnas existan
- Revise los tipos de datos en las condiciones WHERE
- Compruebe permisos de acceso a la base de datos

Si comparte el error exacto, puedo darle una solución más específica.`;
        }

        if (/javascript|js|undefined|null|referenceerror|typeerror/i.test(message)) {
            return `Para errores en JavaScript, acá le dejo algunas soluciones comunes:

\`\`\`javascript
// Errores comunes y soluciones:

// 1. Undefined o Null
const valor = objeto?.propiedad?.subpropiedad; // Optional chaining

// 2. ReferenceError - variable no definida
// Siempre declare variables con let, const o var
let miVariable = 'valor';

// 3. TypeError - método no existe
if (array && Array.isArray(array)) {
    array.forEach(item => console.log(item));
}
\`\`\`

**Buenas prácticas:**
- Use TypeScript o validación de tipos
- Implemente manejo de errores con try-catch
- Valide datos antes de usarlos

¿Puede compartir el mensaje de error completo para darle una solución más específica?`;
        }

        return `Para resolver este problema, necesitaría más información:

1. **El mensaje de error exacto** que está recibiendo
2. **El lenguaje o tecnología** que está usando
3. **El contexto** donde ocurre el error

Mientras tanto, acá le dejo algunas prácticas generales para debugging:

\`\`\`javascript
// 1. Use console.log estratégicamente
console.log('Valor de variable:', variable);

// 2. Manejo de errores
try {
    // código que puede fallar
} catch (error) {
    console.error('Error:', error.message);
    // manejo del error
}
\`\`\`

¿Puede compartir más detalles sobre el error específico?`;
    }

    getOptimizationResponse(message) {
        if (/sql|consulta|query|database|base de datos/i.test(message)) {
            return `Para optimizar consultas SQL, acá le dejo estrategias clave:

\`\`\`sql
-- ❌ Consulta lenta
SELECT * FROM usuarios WHERE nombre LIKE '%buscar%';

-- ✅ Consulta optimizada
SELECT id, nombre, email 
FROM usuarios 
WHERE nombre LIKE 'buscar%'  -- Índice usable al inicio
LIMIT 100;

-- ✅ Con índices
CREATE INDEX idx_nombre ON usuarios(nombre);
\`\`\`

**Principios de optimización SQL:**
1. **Use índices** en columnas frecuentemente consultadas
2. **Evite SELECT \*** - seleccione solo columnas necesarias
3. **Limite resultados** con LIMIT cuando sea posible
4. **Use WHERE eficiente** - evite funciones en WHERE
5. **Evite subconsultas anidadas** innecesarias
6. **Use JOIN apropiados** en lugar de subconsultas

¿Tiene una consulta específica que quiera optimizar?`;
        }

        return `Para optimizar código, considere estos principios:

**1. Complejidad algorítmica**
- Evite bucles anidados innecesarios
- Use estructuras de datos eficientes (Map, Set)

**2. Buena práctica de código**
\`\`\`javascript
// ❌ Ineficiente
const resultado = [];
for (let i = 0; i < array.length; i++) {
    if (array[i] > 10) {
        resultado.push(array[i] * 2);
    }
}

// ✅ Optimizado y legible
const resultado = array
    .filter(item => item > 10)
    .map(item => item * 2);
\`\`\`

**3. Caching y memoización**
\`\`\`javascript
const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};
\`\`\`

¿Qué aspecto específico le gustaría optimizar?`;
    }

    getGeneralResponse(message) {
        // Respuestas generales según palabras clave
        if (/react|vue|angular|framework/i.test(message)) {
            return `Los frameworks modernos de JavaScript ofrecen diferentes enfoques:

**React** - Biblioteca declarativa con componente funcionales
\`\`\`javascript
function Componente() {
    const [estado, setEstado] = useState(0);
    return <button onClick={() => setEstado(estado + 1)}>{estado}</button>;
}
\`\`\`

**Vue** - Framework progresivo con sintaxis template
\`\`\`javascript
export default {
    data() {
        return { contador: 0 }
    },
    template: '<button @click="contador++">{{ contador }}</button>'
}
\`\`\`

**Angular** - Framework completo con TypeScript

¿Sobre qué framework específico le gustaría aprender más?`;
        }

        return `¡Claro que sí! Puedo ayudarle con ese tema. Para darle una respuesta más precisa y útil, podría necesitar un poco más de contexto:

- ¿En qué lenguaje o tecnología está trabajando?
- ¿Cuál es su nivel de experiencia?
- ¿Hay algún caso de uso específico que quiera abordar?

Mientras tanto, acá le dejo información general sobre desarrollo de software:

**Buenas prácticas fundamentales:**
- **Código limpio y legible** - Nombres descriptivos, funciones pequeñas
- **Modularidad** - Separación de responsabilidades
- **Documentación** - Comentarios útiles y README actualizados
- **Testing** - Cobertura de casos importantes
- **Control de versiones** - Commits descriptivos con Git

¿Puede especificar más sobre lo que necesita?`;
    }

    getSpecificResponse(message) {
        // Respuesta genérica pero contextual
        return `Entiendo su pregunta sobre "${message}". Para darle la mejor respuesta posible, sería útil conocer:

1. **El lenguaje o tecnología** específica con la que está trabajando
2. **El contexto** o caso de uso donde aplica esto
3. **Su objetivo final** - ¿qué está tratando de lograr?

Mientras tanto, acá le dejo algunos principios generales de desarrollo de software que pueden aplicarse:

**Arquitectura limpia:**
- Separación de capas (presentación, lógica de negocio, datos)
- Principio de responsabilidad única
- Inversión de dependencias

**Gestión de estado:**
- Mantenga el estado lo más local posible
- Use patrones apropiados (Redux, Context API, Vuex, etc.)

**Performance:**
- Lazy loading cuando sea posible
- Code splitting
- Optimización de imágenes y assets

¿Puede compartir más detalles para darle una respuesta más específica?`;
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        
        if (type === 'bot') {
            avatar.innerHTML = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="#6366f1"/>
                <text x="50" y="65" font-size="50" fill="white" text-anchor="middle" font-weight="bold">H</text>
            </svg>`;
        } else {
            avatar.innerHTML = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="#8b5cf6"/>
                <text x="50" y="65" font-size="50" fill="white" text-anchor="middle" font-weight="bold">U</text>
            </svg>`;
        }

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Procesar formato markdown básico
        messageContent.innerHTML = this.formatMessage(content);

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    formatMessage(content) {
        // Formatear código entre backticks
        content = content.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            return `<pre><code>${this.escapeHtml(code.trim())}</code></pre>`;
        });

        // Formatear código inline
        content = content.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Formatear negritas
        content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

        // Convertir saltos de línea en párrafos
        const paragraphs = content.split('\n\n').filter(p => p.trim());
        return paragraphs.map(p => {
            p = p.trim();
            if (p.startsWith('<pre>')) {
                return p;
            }
            return `<p>${p.replace(/\n/g, '<br>')}</p>`;
        }).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message typing-message';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#6366f1"/>
            <text x="50" y="65" font-size="50" fill="white" text-anchor="middle" font-weight="bold">H</text>
        </svg>`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();

        return messageDiv;
    }

    removeTypingIndicator(indicator) {
        if (indicator && indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Inicializar el chatbot cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new HadesChatbot();
});
