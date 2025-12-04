# 📘 Práctica 3 --- Migración a Arquitectura MVC

### Desarrollo Front-End + Integración Flask

**Autor:** Víctor Carazo\
**Curso:** 2025--2026

------------------------------------------------------------------------

# 📑 Índice  
1. [Introducción](#-introducción)  
2. [Estructura del Proyecto](#-estructura-del-proyecto)  
3. [Diagrama Arquitectural MVC](#-diagrama-arquitectural-mvc)  
4. [Responsabilidad de Cada Componente](#-responsabilidad-de-cada-componente)  
5. [MVC en el Backend (Flask)](#-mvc-en-el-backend-flask)  
6. [MVC en el Frontend (JavaScript ES6)](#-mvc-en-el-frontend-javascript-es6)  
7. [Carrito MVC](#-carrito-mvc)   
8. [Evidencias de la separación MVC](#-evidencias-de-la-separación-mvc)
9. [Capturas del proyecto](#-capturas-del-proyecto)
10. [Autenticación con Flask-Login](#-autenticación)  
11. [Reflexión: Beneficios y Desafíos del Patrón MVC](#-reflexión-beneficios-y-desafíos-del-patrón-mvc)  
12. [Cómo ejecutar el proyecto](#-docker)
13. [Ejercicio Adicional 1 — Exportación JSON](#ejercicio-adicional-1--buena-practica-con-json-exportacion-de-productos)
14. [Ejercicio Adicional 2 — Ejemplos de AJAX Clásico](#ejercicio-adicional-2--ejemplos-de-ajax-clásico)
15. [Ejercicio Adicional 3 — Fetch Avanzado, Seguridad y Optimización](#ejercicio-adicional-3--fetch-avanzado-seguridad-y-optimizacion)
16. [Conclusiones](#-conclusiones)

------------------------------------------------------------------------

# 🚀 Introducción

Esta práctica consiste en migrar las Prácticas 1 y 2 ---basadas en HTML,
CSS y JavaScript puros--- hacia una aplicación web estructurada mediante
el patrón Modelo--Vista--Controlador (MVC) utilizando:

-   Flask (backend)
-   SQLAlchemy + SQLite
-   Jinja2
-   Flask-Login
-   MVC en JavaScript (frontend)
-   Docker y docker-compose
-   CLI personalizada (init-db y create-user)

El objetivo final es obtener una arquitectura escalable, mantenible y
modular, respetando la experiencia de usuario y el dinamismo
implementado en las prácticas anteriores.

------------------------------------------------------------------------

# 📁 Estructura del Proyecto

    flask_mvc_login/
    ├── app/
    │   ├── __init__.py
    │   ├── models.py
    │   ├── controllers/
    │   │   ├── auth.py
    │   │   └── main.py
    │   ├── templates/
    │   │   ├── base.html
    │   │   ├── login.html
    │   │   ├── registro.html
    │   │   ├── productos.html
    │   │   ├── usuario.html
    │   │   ├── preferencias.html
    │   │   └── nuevo.html
    │   └── static/
    │       ├── css/
    │       ├── js/
    │       │   ├── app.js
    │       │   ├── loginModel.js
    │       │   ├── loginView.js
    │       │   ├── loginController.js
    │       │   ├── registerModel.js
    │       │   ├── registerView.js
    │       │   ├── registerController.js
    │       │   ├── ProductModel.js
    │       │   ├── ProductView.js
    │       │   ├── ProductController.js
    │       │   └── (carrito MVC en proceso)
    │       └── img/ & products/
    ├── wsgi.py
    ├── requirements.txt
    ├── Dockerfile
    ├── docker-compose.yml
    ├── run.py
    └── README.md

------------------------------------------------------------------------

# 🧩 Diagrama Arquitectural MVC

```
              ┌──────────────────────────────┐
              │            Usuario           │
              └──────────────┬───────────────┘
                             │
                        HTTP / Eventos
                             │
           ┌─────────────────┴────────────────────────────────────────┐
           │              Frontend                                    │
           │         (MVC en JavaScript)                              │
           ├─────────────────┬───────────────────┬────────────────────┤
           │ Model JS        │ View JS           │ Controller JS      │
           │ - Validación    │ - Renderizado     │ - Orquesta eventos │
           │ - Estado        │ - DOM             │ - Coordina módulos │
           └─────────────────┴───────────────────┴────────────────────┘
                             │
                        Peticiones
                             │
           ┌─────────────────┴────────────────────────────────────────┐
           │              Backend (Flask MVC)                         |
           ├─────────────────┬───────────────────┬────────────────────┤
           │ Model Python    │ Views (Jinja2)    │ Controllers        │
           │ - SQLAlchemy    │ - Plantillas      │ - Rutas            │
           │ - DB            │ - HTML dinámico   │ - Lógica servidor  │
           └─────────────────┴───────────────────┴────────────────────┘
                             │
                        Base de Datos
```

```
                 BACKEND (Flask)
     ┌───────────┐     ┌───────────────┐     ┌───────────────┐
     │  Modelo   │ <-->│  Controlador  │ <-->│      Vista    │
     │ SQLAlchemy│     │ (auth, main)  │     │   Jinja2 HTML │
     └───────────┘     └───────────────┘     └───────────────┘
                           ▲
                           │ JSON
                           ▼
                FRONTEND (JavaScript ES6)
     ┌───────────┐     ┌───────────────┐     ┌───────────────┐
     │  Modelo   │ <-->│  Controlador  │ <-->│      Vista    │
     │  (valid.) │     │  (eventos)    │     │ DOM / Render  │
     └───────────┘     └───────────────┘     └───────────────┘
```
------------------------------------------------------------------------

# 🎯 Responsabilidad de Cada Componente

### ✔ Modelo  
- Python: gestiona la base de datos y entidades.  
- JS: valida datos y maneja estado (login, registro, carrito).  

### ✔ Vista  
- Plantillas Jinja2 en backend.  
- Manipulación del DOM en frontend.  

### ✔ Controlador  
- Backend: rutas y lógica empresarial.  
- Frontend: escucha eventos y coordina vista/modelo.

------------------------------------------------------------------------

# 🏛 MVC en el Backend (Flask)

### ✔ Modelos (`models.py`)
- `User`: autenticación, hash de contraseña.  
- `Product`: catálogo con precio e imagen.

### ✔ Controladores
- `auth.py`: login/logout/registro.  
- `main.py`: menú, productos, preferencias, CRUD.

### ✔ Vistas
- HTML generado con Jinja2  
- Uso de plantillas base  
- Accesibilidad garantizada

---

# 🧠 MVC en el Frontend (JavaScript ES6)

### ✔ Modelos (JS)
Validan y gestionan estado.

### ✔ Vistas (JS)
Renderizan HTML dinámico y actualizan la interfaz.

### ✔ Controladores (JS)
Orquestan eventos y flujos de interacción.

---

# 🛒 Carrito MVC

### CartModel  
Maneja items, totales y persistencia en localStorage.

### CartView  
Renderiza lista, totales y botones del carrito.

### CartController  
Coordina interacciones entre vista y modelo.

------------------------------------------------------------------------

# 🏛 Arquitectura MVC (Backend)

El backend sigue estrictamente el patrón MVC:

## ✔ Modelo (`models.py`)

-   User: autenticación, hash de contraseña, integración con
    Flask-Login\
-   Product: catálogo, precio e imagen\
-   Persistencia con SQLite usando SQLAlchemy

## ✔ Controladores (`auth.py`, `main.py`)

-   Gestión de login/logout\
-   Protección de rutas con @login_required\
-   Flujo principal del menú, preferencia de usuario, productos y
    creación de nuevos

## ✔ Vistas (`templates/*.html`)

-   Plantillas Jinja2\
-   Extienden `base.html`\
-   Separan completamente lógica y presentación

---

# 📌 Evidencias de la separación MVC

- Código organizado en módulos.  
- No hay lógica de negocio en el HTML.  
- Backend y frontend aislados.  
- Carrito completamente independiente del backend.  
- Plantillas separadas de controladores.

------------------------------------------------------------------------

# 🧠 MVC en Frontend (JavaScript)

Toda la lógica se modularizó en **Model--View--Controller** en ES6:

### Modelo

Valida datos, gestiona estado, ejecuta reglas de negocio.\
(Ej.: `loginModel.js`, `registerModel.js`, `ProductModel.js`)

### Vista

Manipula DOM, renderiza productos, muestra mensajes y aplica
accesibilidad.\
(Ej.: `loginView.js`, `ProductView.js`)

### Controlador

Orquesta eventos, coordina vista y modelo.\
(Ej.: `loginController.js`, `ProductController.js`)

------------------------------------------------------------------------

# 📸 Capturas del proyecto

### Registro  
![Registro](registro.png)

### Login  
![Login](login.png)

### Menú principal  
![Menú](menu.png)
![Menú 2](menu2.png)

### Catálogo  
![Catálogo](catalogo.png)

### Preferencias
![Preferencias](preferencias.png)

### Nuevo producto
![Nuevo producto](nuevo.png)

### Usuario
![Usuario](usuario.png)

------------------------------------------------------------------------

# 🔐 Autenticación

Implementada con Flask-Login:\
- Sesiones seguras\
- Redirecciones automáticas\
- Carga de usuarios\
- Hash de contraseñas

------------------------------------------------------------------------

# 🛍️ Catálogo + Filtros + Datos desde Backend

Los productos se consultan desde SQLite y se envían al frontend como
JSON seguro:

    window.productsData = {{ products_data|tojson|safe }};

El frontend los recibe y renderiza mediante MVC.

------------------------------------------------------------------------

# 🛒 Carrito 

El carrito de P2 se integrará como:\
- CartModel.js\
- CartView.js\
- CartController.js

Con persistencia en localStorage y futura conexión al backend.

------------------------------------------------------------------------

# 🐳 Docker

## Arranque sin Docker

``` bash
python -m venv .venv
source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python run.py
# Abrir http://localhost:5000
```

## Con Docker

``` bash
cp .env.example .env
docker compose up --build
# Abrir http://localhost:5000
```

------------------------------------------------------------------------

# 🔧 CLI (Herramientas incluidas)

Crear base de datos + datos demo:

``` bash
flask --app wsgi.py init-db
```

Crear usuario adicional:

``` bash
flask --app wsgi.py create-user email password
```

------------------------------------------------------------------------

# ⚠️ Dificultades y Soluciones

### Migración del login

Solución: separar validación en MVC JS conservando accesibilidad.

### Paso Python → JS

Solución: serialización segura mediante `tojson|safe`.

### Problemas con VS Code y Jinja

Solución: ajustar el intérprete Python y usar filtros Jinja.

### Mantener experiencia responsive

Solución: conservar Bootstrap 5 y adaptar componentes.

------------------------------------------------------------------------

# Ejercicio Adicional 1 — Buena Práctica con JSON: Exportación de Productos

Se ha implementado una ruta REST para exportar información de productos en formato JSON siguiendo buenas prácticas de diseño de APIs.

Se ha añadido un endpoint REST para exportar los productos en formato JSON:

- Ruta protegida: `GET /api/products/export`
- Estructura clara: `{ "status", "total", "products": [...] }`
- No se exponen datos sensibles (solo id, nombre, precio e imagen).
- Se utiliza `jsonify` para garantizar que la respuesta tenga `Content-Type: application/json`.
- El endpoint se puede consumir fácilmente desde otro frontend, una SPA o herramientas como Postman.

## Características implementadas

- Nueva ruta añadida: GET /api/products/export
- Ruta protegida mediante @login_required.
- Uso de jsonify() para garantizar formato JSON válido.
- Exclusión de datos sensibles.
- Estructura estándar en la respuesta JSON.

## Código del controlador

```python
@main_bp.route("/api/products/export", methods=["GET"])
@login_required
def export_products():
    products = Product.query.all()
    products_data = [
        {"id": p.id, "name": p.name, "price": float(p.price), "image_path": p.image_path}
        for p in products
    ]
    return jsonify({
        "status": "success",
        "total": len(products_data),
        "products": products_data
    }), 200
```

## Ejemplo de salida JSON

```json
{
  "status": "success",
  "total": 2,
  "products": [
    {"id": 1, "name": "Cuaderno A5", "price": 3.50, "image_path": "p1.svg"},
    {"id": 2, "name": "Bolígrafo Azul", "price": 1.20, "image_path": "p2.svg"}
  ]
}
```

------------------------------------------------------------------------

# Ejercicio Adicional 2 — Ejemplos de AJAX Clásico

Se han añadido **3 ejemplos completos de AJAX clásico utilizando `XMLHttpRequest`**, cumpliendo el requerimiento de la práctica. Cada ejemplo demuestra un uso distinto e importante del AJAX tradicional.

---

## ✅ Ejemplo 1 — AJAX GET básico

Solicita productos desde la API interna mediante GET clásico.

### ✔ Archivo: `app/static/js/ajaxGetProducts.js`

```javascript
function cargarProductosAjax() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/products/export", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log("Productos recibidos vía AJAX GET:", data);
            alert("Productos cargados mediante AJAX clásico. Mira la consola.");
        }
    };

    xhr.send();
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnAjaxGet");
    if (btn) btn.addEventListener("click", cargarProductosAjax);
});
```

---

## ✅ Ejemplo 2 — AJAX POST enviando JSON

Envía un JSON al servidor y recibe otro JSON como respuesta.

### ✔ Ruta Flask:

```python
@main_bp.route("/api/echo", methods=["POST"])
@login_required
def api_echo():
    data = request.get_json()
    return jsonify({"status": "ok", "received": data}), 200
```

### ✔ Archivo JS: `app/static/js/ajaxPostJson.js`

```javascript
function enviarJsonAjax() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/echo", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    const payload = {
        mensaje: "Hola servidor desde AJAX clásico",
        timestamp: new Date().toISOString()
    };

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Respuesta del servidor (POST):", JSON.parse(xhr.responseText));
            alert("JSON enviado correctamente. Mira la consola.");
        }
    };

    xhr.send(JSON.stringify(payload));
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnAjaxPost");
    if (btn) btn.addEventListener("click", enviarJsonAjax);
});
```

---

## ✅ Ejemplo 3 — AJAX con Timeout + Abort

Control avanzado: cancela una petición automáticamente tras 2 segundos o manualmente.

### ✔ Archivo: `app/static/js/ajaxTimeoutAbort.js`

```javascript
let xhrAbortDemo = null;

function peticionConTimeoutAjax() {
    xhrAbortDemo = new XMLHttpRequest();
    xhrAbortDemo.open("GET", "/api/products/export", true);

    xhrAbortDemo.timeout = 2000;

    xhrAbortDemo.onload = function () {
        if (xhrAbortDemo.status === 200) {
            alert("Respuesta recibida antes del timeout.");
        }
    };

    xhrAbortDemo.ontimeout = function () {
        alert("⏳ La petición tardó demasiado y ha sido cancelada automáticamente (timeout).");
    };

    xhrAbortDemo.onabort = function () {
        alert("❌ La petición se canceló manualmente.");
    };

    xhrAbortDemo.send();
}

function cancelarAjax() {
    if (xhrAbortDemo) xhrAbortDemo.abort();
}

document.addEventListener("DOMContentLoaded", () => {
    const btn1 = document.getElementById("btnAjaxTimeout");
    const btn2 = document.getElementById("btnAjaxAbort");
    if (btn1) btn1.addEventListener("click", peticionConTimeoutAjax);
    if (btn2) btn2.addEventListener("click", cancelarAjax);
});
```

---

## 📌 Botones añadidos al menú

```html
<button id="btnAjaxGet" class="btn btn-outline-primary">Cargar productos vía AJAX (GET)</button>
<button id="btnAjaxPost" class="btn btn-outline-secondary">Enviar JSON vía AJAX (POST)</button>
<button id="btnAjaxTimeout" class="btn btn-outline-warning">Probar AJAX con timeout (2s)</button>
<button id="btnAjaxAbort" class="btn btn-outline-danger">Cancelar petición AJAX</button>
```

---

## ✔ Justificación técnica

- Se demuestra **AJAX clásico real**, sin `fetch()`.
- Se integran rutas Flask reales.
- Muestran control completo del ciclo AJAX:
  - Solicitud GET  
  - Envío POST  
  - Timeout  
  - Cancelación manual  

Perfecto para evaluación académica y para entender el funcionamiento interno de `XMLHttpRequest`.

------------------------------------------------------------------------

# Ejercicio Adicional 3 — Fetch Avanzado, Seguridad y Optimización (Debounce + Infinite Scroll + Caché)

Este ejercicio recoge tres bloques avanzados de programación front-end y comunicación con Flask:

- 8.5 → Fetch avanzado + dinámica de tarjetas  
- 8.7 → Seguridad: CSRF, CORS y XSS seguro  
- 8.8 → Optimización: Debounce + Infinite Scroll + Caché  

Cada bloque se explica de forma clara, con fragmentos de código y justificación técnica.

---

# 8.5 — Uso avanzado de fetch() (Catálogo dinámico)

Se añadió un catálogo adicional que:

- Obtiene productos mediante fetch.  
- Genera tarjetas dinámicamente.  
- Muestra detalle al hacer clic.  
- Permite ocultar/mostrar el catálogo.  

### Fragmento JS principal

```javascript
async function recargarCatalogoFetch() {
    try {
        const r = await fetch("/api/products/export");
        if (!r.ok) throw new Error("Error HTTP " + r.status);

        const data = await r.json();
        const productos = data.products;

        catalogoFetchContainer.innerHTML = "";

        productos.forEach(p => {
            const card = crearTarjetaProducto(p);
            catalogoFetchContainer.appendChild(card);
        });

        catalogoFetchContainer.style.display = "flex";
        toggleBtn.classList.remove("d-none");
        toggleBtn.textContent = "Ocultar catálogo";

    } catch (err) {
        console.error(err);
        alert("Error obteniendo productos con fetch.");
    }
}
```

---

# 8.7 — Seguridad: CSRF + CORS + XSS seguro

Se implementó un sistema de opiniones seguras demostrando:

- CSRF mediante cabecera personalizada.  
- Sanitización segura en frontend (`textContent`).  
- Validación en backend.  

### Ruta Flask con CSRF manual

```python
@main_bp.route("/api/opinion", methods=["POST"])
@login_required
def api_opinion():
    token = request.headers.get("X-CSRF-Token")
    if token != "TOKEN_SEGURO_DEMO":
        return jsonify({"error": "CSRF token inválido"}), 403

    data = request.get_json()
    texto = data.get("texto", "").strip()

    if not texto:
        return jsonify({"error": "La opinión no puede estar vacía"}), 400

    return jsonify({"status": "ok", "texto": texto}), 200
```

### Inserción segura

```javascript
div.textContent = data.texto;  // evita ejecución de JS malicioso
```

---

# 8.8 — Optimización: Debounce + Infinite Scroll + Caché

Incluye:

- Búsqueda optimizada (debounce).  
- Carga automática mediante scroll.  
- Caché de productos en memoria.  

### Endpoint paginado en Flask

```python
@main_bp.route("/api/products/page/<int:page>", methods=["GET"])
@login_required
def api_products_page(page):
    PER_PAGE = 4
    products = Product.query.order_by(Product.id).paginate(page=page, per_page=PER_PAGE, error_out=False)

    items = [
        {"id": p.id, "name": p.name, "price": float(p.price), "image_path": p.image_path}
        for p in products.items
    ]

    return jsonify({
        "page": page,
        "total_pages": products.pages,
        "products": items
    })
```

### Debounce

```javascript
function debounce(func, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}
```

### Infinite Scroll

```javascript
window.addEventListener("scroll", () => {
    const scrollPos = window.innerHeight + window.scrollY;
    const bottom = document.body.offsetHeight - 100;

    if (scrollPos >= bottom) {
        cargarPagina(paginaActual + 1);
    }
});
```

### Caché

```javascript
cacheProductos = [...cacheProductos, ...data.products];
```

---

# Scripts adicionales para pruebas

## Script para crear productos de prueba  
**/scripts/seed_products.py**

Uso:

```bash
python scripts/seed_products.py
```

Resultado:

```
20 productos añadidos correctamente.
```

---

## Script para eliminar solo productos generados por seed  
**/scripts/delete_seed_products.py**

Uso:

```bash
python scripts/delete_seed_products.py
```

Resultado:

```
Productos eliminados: 20
```

---

Estos scripts se usan únicamente para pruebas del ejercicio 8.8 y no afectan a la estructura MVC del proyecto.

------------------------------------------------------------------------

# 📌 Conclusiones

-   El proyecto pasó de un frontend monolítico a una arquitectura
    completa MVC + MVC JS.\
-   Prácticas adicionales demuestran dominio de AJAX clásico, Fetch avanzado, seguridad y optimización.\
-   Integración total Flask + JavaScript ES6.\ 
-   Flask gestiona seguridad, datos y rutas.\
-   El frontend gestiona dinamismo modular.\
-   Docker asegura portabilidad profesional.\
-   La aplicación es ahora escalable, mantenible y clara.\     
-   El proyecto es escalable, modular y profesional.\

---

# 🏁 Resumen Final

La aplicación evoluciona desde páginas estáticas hacia una arquitectura **full-stack MVC**, con:

- Autenticación segura  
- Catálogo dinámico  
- Carrito persistente  
- Modularidad backend–frontend  
- Despliegue con Docker  

Una base profesional y lista para ampliarse.

---

# 💭 Reflexión: Beneficios y Desafíos del Patrón MVC

### ✔ Beneficios
- Código más limpio y organizado.  
- Escalabilidad.  
- Posibilidad de trabajar por capas.  
- Facilita pruebas y mantenimiento.

### ✔ Desafíos
- Mayor número de archivos.  
- Necesidad de disciplina en la separación.  
- Curva inicial para organizar código.

------------------------------------------------------------------------

**Fin del README**
