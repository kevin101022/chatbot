// ============================================
// HADES - Frontend JavaScript
// ============================================

// Configuración
const API_URL = '/api/chat';

// Elementos del DOM (se inicializarán cuando el DOM esté listo)
let chatForm, userInput, chatMessages, sendButton, loadingIndicator;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    chatForm = document.getElementById('chatForm');
    userInput = document.getElementById('userInput');
    chatMessages = document.getElementById('chatMessages');
    sendButton = document.getElementById('sendButton');
    loadingIndicator = document.getElementById('loadingIndicator');
    
    // Inicializar funcionalidades
    initParticleBackground();
    setupEventListeners();
    
    // Enfocar el input
    if (userInput) {
        userInput.focus();
    }
});

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    chatForm.addEventListener('submit', handleSubmit);
    
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event('submit'));
        }
    });
    
    userInput.addEventListener('input', () => {
        if (userInput.value.trim()) {
            sendButton.disabled = false;
        } else {
            sendButton.disabled = true;
        }
    });
}

// ============================================
// HANDLE SUBMIT
// ============================================

async function handleSubmit(e) {
    e.preventDefault();
    
    const message = userInput.value.trim();
    if (!message) return;
    
    // Deshabilitar input
    userInput.disabled = true;
    sendButton.disabled = true;
    
    // Mostrar mensaje del usuario
    addUserMessage(message);
    
    // Limpiar input
    userInput.value = '';
    
    // Mostrar loading
    showLoading();
    
    try {
        // Enviar mensaje al backend
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        
        // Ocultar loading
        hideLoading();
        
        // Mostrar respuesta
        if (data.success) {
            addBotMessage(data.response);
        } else {
            addBotMessage(data.error || 'Error al procesar tu mensaje.');
        }
        
    } catch (error) {
        hideLoading();
        addBotMessage('❌ Error de conexión. Asegúrate de que el servidor esté ejecutándose.');
        console.error('Error:', error);
    } finally {
        // Rehabilitar input
        userInput.disabled = false;
        sendButton.disabled = false;
        userInput.focus();
    }
}

// ============================================
// MESSAGE DISPLAY
// ============================================

function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <div class="avatar-icon">👤</div>
        </div>
        <div class="message-content">
            <div class="message-bubble">
                <p>${escapeHtml(text)}</p>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    // Formatear el texto (preservar saltos de línea y formatear código)
    const formattedText = formatMessage(text);
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <div class="avatar-icon">⚡</div>
        </div>
        <div class="message-content">
            <div class="message-bubble">
                ${formattedText}
            </div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function formatMessage(text) {
    // Convertir saltos de línea a <br>
    let formatted = escapeHtml(text);
    
    // Formatear código entre ```
    formatted = formatted.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre class="code-block"><code>${escapeHtml(code.trim())}</code></pre>`;
    });
    
    // Formatear código inline entre `
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    
    // Convertir saltos de línea a <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Formatear texto en negrita **texto**
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    return formatted;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function scrollToBottom() {
    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
    });
}

// ============================================
// LOADING INDICATOR
// ============================================

function showLoading() {
    loadingIndicator.classList.add('active');
}

function hideLoading() {
    loadingIndicator.classList.remove('active');
}

// ============================================
// PARTICLE BACKGROUND
// ============================================

function initParticleBackground() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    // Ajustar tamaño del canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Partículas
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '#ff3b3b' : '#ff6b35';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animación
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

