# 🚀 GUÍA DE INICIO RÁPIDO - HADES CHATBOT

## ⚠️ IMPORTANTE: ¿Ves el error "Error de conexión"?

Este error significa que **el servidor Flask NO está ejecutándose**.

## ✅ Solución Paso a Paso

### Paso 1: Instalar dependencias
```bash
pip install flask flask-cors
```

### Paso 2: Iniciar el servidor
```bash
python app.py
```

### Paso 3: Abrir en el navegador
**NO abras index.html directamente con doble clic**

En su lugar, abre tu navegador y ve a:
```
http://localhost:5000
```

---

## 🔍 ¿Por qué ocurre el error?

- **El frontend (HTML/JS)** necesita comunicarse con el **backend (Python/Flask)**
- Si solo abres `index.html` sin el servidor, el JavaScript intenta conectarse a `http://localhost:5000/api/chat` pero **no hay servidor escuchando**
- **Por eso aparece el error de conexión**

---

## 📋 Verificación

Cuando ejecutes `python app.py`, deberías ver:

```
🔥 Inicializando Hades...
✅ Hades está listo!

============================================================
🚀 Servidor Hades iniciado
============================================================
📍 Abre tu navegador en: http://localhost:5000
============================================================
```

Si ves esto, ¡el servidor está corriendo! ✅

---

## 🛠️ Solución de Problemas

### Error: "ModuleNotFoundError: No module named 'flask'"
**Solución:** Instala Flask: `pip install flask flask-cors`

### Error: "Address already in use"
**Solución:** El puerto 5000 está ocupado. Cambia el puerto en `app.py` línea final:
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Cambia 5000 a 5001
```

### Error: "Error de conexión" incluso con servidor corriendo
**Solución:** Asegúrate de abrir `http://localhost:5000` y NO el archivo HTML directamente

---

## 💡 Resumen

1. ✅ `pip install flask flask-cors`
2. ✅ `python app.py`
3. ✅ Abre `http://localhost:5000` en el navegador
4. ✅ ¡Disfruta de Hades! 🔥

