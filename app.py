"""
Hades - Servidor Flask para el Frontend
========================================

Servidor simple que conecta el frontend con el backend del chatbot.
"""

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from hades_chatbot import create_hades_instance, create_openai_integration
import os

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# Inicializar Hades
print("🔥 Inicializando Hades...")

# Intentar usar OpenAI si está disponible
llm_callback = None
api_key = os.getenv('OPENAI_API_KEY')

if api_key:
    try:
        llm_callback = create_openai_integration(api_key)
        print("✅ Integración con OpenAI configurada")
    except Exception as e:
        print(f"⚠️  No se pudo configurar OpenAI: {e}")
        print("   El chatbot funcionará solo con validación de queries")

hades = create_hades_instance(llm_callback=llm_callback)
print("✅ Hades está listo!\n")


@app.route('/')
def index():
    """Ruta principal que sirve el HTML."""
    return app.send_static_file('index.html')


@app.route('/api/chat', methods=['POST'])
def chat():
    """Endpoint para recibir mensajes del chat."""
    try:
        data = request.get_json()
        message = data.get('message', '').strip()
        
        if not message:
            return jsonify({
                'success': False,
                'error': 'Por favor, envía un mensaje válido.'
            }), 400
        
        # Procesar mensaje con Hades
        response = hades.handle_query(message)
        
        return jsonify({
            'success': True,
            'response': response
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Error al procesar el mensaje: {str(e)}'
        }), 500


@app.route('/api/health', methods=['GET'])
def health():
    """Endpoint de salud del servidor."""
    return jsonify({
        'status': 'ok',
        'name': 'Hades',
        'llm_configured': llm_callback is not None
    })


if __name__ == '__main__':
    print("=" * 60)
    print("🚀 Servidor Hades iniciado")
    print("=" * 60)
    print(f"📍 Abre tu navegador en: http://localhost:5000")
    print("=" * 60)
    print()
    
    app.run(debug=True, host='0.0.0.0', port=5000)

