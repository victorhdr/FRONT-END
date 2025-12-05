# 📘 Ejercicio Extra — Preguntas y Respuestas sobre Express.js
### Práctica — Buenas prácticas con Express, JSON y JavaScript   
**Autor:** Víctor Carazo  

Este documento responde de forma razonada a las preguntas del README de **Express** que acompaña a los 6 ejemplos (`ejemplo1` … `ejemplo6`).  
La idea es demostrar que entiendes **qué hace cada ejemplo**, cómo funciona Express y cómo podrías **extenderlo**.

---

## 📑 Índice

1. [Introducción](#introducción)  
2. [Preguntas Generales sobre Express](#preguntas-generales-sobre-express)  
3. [Ejemplo 1 — Hola Mundo](#ejemplo-1--hola-mundo)  
4. [Ejemplo 2 — Parámetros de Ruta](#ejemplo-2--parámetros-de-ruta)  
5. [Ejemplo 3 — Parámetros de Consulta (Query Params)](#ejemplo-3--parámetros-de-consulta-query-params)  
6. [Ejemplo 4 — Formularios con POST](#ejemplo-4--formularios-con-post)  
7. [Ejemplo 5 — Archivos Estáticos](#ejemplo-5--archivos-estáticos)  
8. [Ejemplo 6 — API JSON + Fetch](#ejemplo-6--api-json--fetch)  
9. [Resumen de lo aprendido](#resumen-de-lo-aprendido)  

---

## Introducción

Los ejemplos que se proporcionan en el ZIP muestran distintos conceptos básicos de **Express.js**:

- Cómo arrancar un servidor HTTP con Node + Express.
- Cómo servir archivos estáticos desde una carpeta `public`.
- Cómo trabajar con **rutas con parámetros** (`/saludo/:nombre`).
- Cómo leer **query params** (`/suma?a=1&b=2`).
- Cómo procesar **formularios** enviados por `POST`.
- Cómo exponer una **API REST que devuelve JSON** y consumirla desde el navegador con `fetch()`.

En las secciones siguientes respondo a las preguntas propuestas, ampliando cada una con explicaciones y pequeños fragmentos de código.

---

## Preguntas Generales sobre Express

### 1. ¿En qué línea se configura la carpeta `public` como estática en cada servidor?

En todos los ejemplos, hay una línea similar a esta en `server.js`:

```js
app.use(express.static("public"));
```

- `app.use(...)` indica a Express que use un **middleware**.
- `express.static("public")` crea un middleware que sirve **archivos estáticos** (HTML, CSS, JS, imágenes, etc.) desde la carpeta `public`.
- Gracias a esta línea, cualquier archivo dentro de `public` se puede pedir directamente desde el navegador, por ejemplo:
  - `public/index.html` → `http://localhost:3001/`
  - `public/script.js` → `http://localhost:3001/script.js`

Sin esta línea, el navegador no podría acceder a esos archivos directamente.

---

### 2. ¿Qué pasa si cambias el puerto (por ejemplo de 3001 a 4000) y no actualizas nada más?

Normalmente, en cada `server.js` hay algo como:

```js
app.listen(3001, () => {
  console.log("Servidor escuchando en http://localhost:3001");
});
```

Si cambio el puerto a `4000`:

```js
app.listen(4000, () => {
  console.log("Servidor escuchando en http://localhost:4000");
});
```

ocurren estas cosas:

- El servidor deja de escuchar en `http://localhost:3001` y pasa a escuchar en `http://localhost:4000`.
- Si sigo entrando a `http://localhost:3001`, **no veré nada**, porque ahí ya no hay servidor.
- Tengo que abrir el navegador en la **URL correcta**: `http://localhost:4000`.

En estos ejemplos, como el front solo es HTML estático, no hay ninguna referencia directa al puerto en el código del cliente, así que no hace falta cambiar nada más; sólo la URL que escribo en el navegador.

---

### 3. ¿Cómo harías para que el servidor muestre un mensaje en consola cada vez que recibe una petición?

Añadiría un **middleware global de logging** antes de las rutas:

```js
app.use((req, res, next) => {
  console.log(`Petición recibida: ${req.method} ${req.url}`);
  next(); // continuamos con el siguiente middleware o ruta
});
```

Explicación:

- `req.method` → muestra el verbo HTTP (`GET`, `POST`, etc.).  
- `req.url` → muestra la URL solicitada (`/`, `/saludo/Pepe`, etc.).  
- `next()` → es obligatorio para que Express continúe procesando la petición.

Así, cada vez que el navegador accede a cualquier ruta, se registra en consola un mensaje como:

```txt
Petición recibida: GET /
Petición recibida: GET /script.js
Petición recibida: POST /procesar
```

---

## Ejemplo 1 — Hola Mundo

### 1. Cambia el texto del botón por "Di hola por consola" y haz que en vez de `alert` haga `console.log`

En `public/index.html` del ejemplo 1 tendríamos un botón similar a:

```html
<button id="btnHola">Haz algo</button>
```

Lo cambio por:

```html
<button id="btnHola">Di hola por consola</button>
```

Y en `public/script.js`:

```js
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnHola");

  btn.addEventListener("click", () => {
    console.log("Hola desde el cliente (frontend) usando Express para servir los archivos.");
  });
});
```

- Antes era típico hacer `alert("Hola")`; ahora lo hemos cambiado a `console.log(...)`.
- Esto demuestra que sé modificar la lógica del frontend.

---

### 2. Añade otro botón que cambie el contenido de un `<p>` en la página

En `index.html`:

```html
<p id="mensaje">Texto original de la página.</p>
<button id="btnCambiarTexto">Cambiar texto</button>
```

En `script.js`:

```js
document.addEventListener("DOMContentLoaded", () => {
  const btnCambiar = document.getElementById("btnCambiarTexto");
  const pMensaje = document.getElementById("mensaje");

  btnCambiar.addEventListener("click", () => {
    pMensaje.textContent = "El texto ha sido actualizado dinámicamente con JavaScript.";
  });
});
```

Así se demuestra interacción básica cliente/DOM servida por Express.

---

### 3. Haz que el servidor tenga otra ruta `/adios` que devuelva otro HTML sencillo

En `server.js`:

```js
app.get("/adios", (req, res) => {
  res.send(`
    <!doctype html>
    <html>
      <head><meta charset="utf-8"><title>Adiós</title></head>
      <body>
        <h1>¡Adiós desde Express!</h1>
        <p>Esta es otra ruta independiente de la principal.</p>
        <a href="/">Volver a inicio</a>
      </body>
    </html>
  `);
});
```

- Esta ruta no usa archivos estáticos, sino que genera el HTML directamente desde el servidor usando `res.send()`.
- Permite ver que Express puede devolver tanto ficheros estáticos como HTML generado en la ruta.

---

## Ejemplo 2 — Parámetros de Ruta

### 1. ¿Qué pasa si visitas `/saludo/Pepe`? ¿Y `/saludo/Ana`?

En el servidor habrá una ruta similar a:

```js
app.get("/saludo/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  res.send(`Hola ${nombre}`);
});
```

- Si visitas `/saludo/Pepe` → `req.params.nombre` será `"Pepe"` y la respuesta será **"Hola Pepe"**.
- Si visitas `/saludo/Ana` → `req.params.nombre` será `"Ana"` y la respuesta será **"Hola Ana"**.

Esto demuestra que **`:nombre` es un parámetro dinámico** de la URL que Express captura automáticamente.

---

### 2. Crea una nueva ruta `/color/:color` que devuelva un mensaje con el color elegido

En `server.js` (ejemplo 2):

```js
app.get("/color/:color", (req, res) => {
  const color = req.params.color;
  res.send(`Has elegido el color: ${color}`);
});
```

Ejemplos:

- `/color/rojo` → “Has elegido el color: rojo”  
- `/color/azul` → “Has elegido el color: azul”  

Esto refuerza el concepto de **parámetros de ruta** (`req.params`).

---

### 3. Haz que el `index.html` tenga un `<select>` con varios nombres predefinidos para probar la ruta más rápido

En `public/index.html` del ejemplo 2:

```html
<label for="nombreSelect">Elige un nombre:</label>
<select id="nombreSelect">
  <option value="Pepe">Pepe</option>
  <option value="Ana">Ana</option>
  <option value="Lucía">Lucía</option>
</select>

<button id="btnIrSaludo">Ir a saludo</button>
```

En `public/script.js`:

```js
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("nombreSelect");
  const btn = document.getElementById("btnIrSaludo");

  btn.addEventListener("click", () => {
    const nombre = select.value;
    window.location.href = `/saludo/${encodeURIComponent(nombre)}`;
  });
});
```

- Así se puede probar la ruta dinámicamente sin escribir la URL a mano.
- Además se practica el uso de `encodeURIComponent` para evitar problemas con espacios o caracteres especiales.

---

## Ejemplo 3 — Parámetros de Consulta (Query Params)

### 1. ¿Qué ocurre si no envías `a` o `b` en la URL? ¿Cómo podrías poner un valor por defecto?

En este ejemplo la ruta es algo como:

```js
app.get("/suma", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  const resultado = a + b;
  res.send(`Resultado: ${resultado}`);
});
```

Si no envío `a` o `b`, por ejemplo `GET /suma?a=5` (sin `b`):

- `req.query.b` será `undefined`.
- `Number(undefined)` es `NaN`.
- `NaN + 5` da `NaN` → el resultado no tendrá sentido.

Para evitarlo, puedo usar valores por defecto:

```js
const a = Number(req.query.a ?? 0);
const b = Number(req.query.b ?? 0);
```

o con el operador lógico OR:

```js
const a = Number(req.query.a || 0);
const b = Number(req.query.b || 0);
```

De esta forma:

- Si falta uno de ellos, se toma `0` automáticamente.
- La ruta sigue funcionando sin romperse.

---

### 2. Cambia el ejemplo para que, en lugar de sumar, multiplique los números

Basta con cambiar la operación:

```js
app.get("/suma", (req, res) => {
  const a = Number(req.query.a || 0);
  const b = Number(req.query.b || 0);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).send("Debes enviar números válidos.");
  }

  const resultado = a * b;
  res.send(`Resultado: ${resultado}`);
});
```

Aunque la ruta se llame `/suma`, ahora **funcionalmente hace una multiplicación**, lo cual se puede mencionar en la memoria como una variación.

---

### 3. Añade una validación que muestre un error si el usuario introduce algo que no sea un número

Ya se ha adelantado arriba, pero la idea es:

```js
const a = Number(req.query.a);
const b = Number(req.query.b);

if (isNaN(a) || isNaN(b)) {
  return res.status(400).send("Error: a y b deben ser números.");
}

const resultado = a + b;
res.send(`Resultado: ${resultado}`);
```

- `isNaN()` detecta si algo **no** es un número.
- Devolvemos un código de estado `400 Bad Request` para indicar que los datos son inválidos.
- Esto es una pequeña introducción al **manejo de errores en APIs**.

---

## Ejemplo 4 — Formularios con POST

### 1. Cambia el formulario para que tenga dos campos (por ejemplo, nombre y edad)

En `public/index.html` del ejemplo 4:

```html
<form action="/procesar" method="POST">
  <label>Nombre:</label>
  <input type="text" name="nombre" required>

  <label>Edad:</label>
  <input type="number" name="edad" required>

  <button type="submit">Enviar</button>
</form>
```

El servidor debe tener activado el middleware:

```js
app.use(express.urlencoded({ extended: true }));
```

para poder leer `req.body` en peticiones POST.

---

### 2. Haz que el servidor devuelva un mensaje distinto si la edad es mayor o menor que 18

En `server.js`:

```js
app.post("/procesar", (req, res) => {
  const nombre = req.body.nombre;
  const edad = Number(req.body.edad);

  if (isNaN(edad)) {
    return res.send("La edad no es un número válido.");
  }

  if (edad >= 18) {
    res.send(`Hola ${nombre}, eres mayor de edad.`);
  } else {
    res.send(`Hola ${nombre}, eres menor de edad.`);
  }
});
```

Esto añade lógica sencilla de negocio al servidor y demuestra que se puede **tomar decisiones en función de los datos del formulario**.

---

### 3. Añade un `console.log` con el cuerpo (`req.body`) en el servidor para ver qué se está recibiendo

```js
app.post("/procesar", (req, res) => {
  console.log("Cuerpo recibido en /procesar:", req.body);
  // ... resto de la lógica
});
```

- Esto es muy útil para depuración.
- Permite ver exactamente qué campos están llegando desde el formulario (nombre de los campos, valores, etc.).

---

## Ejemplo 5 — Archivos Estáticos

### 1. Añade una imagen a la carpeta `public` y muéstrala en `index.html`

1. Copio una imagen a `ejemplo5-archivos-estaticos/public/foto.png`.  
2. En `index.html` añado:

```html
<img src="foto.png" alt="Imagen de prueba" width="200">
```

Gracias a `express.static("public")`, el navegador puede cargar `foto.png` directamente desde la carpeta `public`.

---

### 2. Crea un segundo archivo CSS y cambia entre uno u otro desde el HTML

En la carpeta `public` creo:

- `estilos1.css`
- `estilos2.css`

En `index.html`:

```html
<!-- Opción A -->
<link rel="stylesheet" href="estilos1.css">
<!-- Opción B -->
<!-- <link rel="stylesheet" href="estilos2.css"> -->
```

Para cambiar de estilo, solo comento una línea y descomento la otra.

Opcionalmente, podría hacerlo dinámico con JS (cambiando el `href` del `<link>`), pero para el ejercicio basta con demostrar el uso de **múltiples hojas de estilo** servidas por Express.

---

### 3. Haz que el `script.js` cambie la clase de un elemento al hacer clic en un botón

En `index.html`:

```html
<p id="parrafo">Este texto cambiará de estilo.</p>
<button id="btnTema">Cambiar tema</button>
```

En `script.js`:

```js
document.addEventListener("DOMContentLoaded", () => {
  const p = document.getElementById("parrafo");
  const btn = document.getElementById("btnTema");

  btn.addEventListener("click", () => {
    p.classList.toggle("resaltado");
  });
});
```

En `estilos1.css`:

```css
.resaltado {
  color: white;
  background-color: #007bff;
  padding: 4px 8px;
  border-radius: 4px;
}
```

Con esto se demuestra:

- Uso de archivos estáticos (CSS + JS).
- Manipulación de clases desde JavaScript.

---

## Ejemplo 6 — API JSON + Fetch

### 1. Añade más frutas al array que devuelve la API

En `server.js` del ejemplo 6:

```js
app.get("/api/frutas", (req, res) => {
  const frutas = [
    "Manzana",
    "Pera",
    "Plátano",
    "Kiwi",
    "Fresa",
    "Naranja",
  ];
  res.json(frutas);
});
```

- `res.json()` envía directamente un JSON al cliente.
- El frontend lo recibirá con `fetch` y mostrará la lista.

---

### 2. Añade una nueva ruta `/api/verduras` y haz otro botón en el frontend que las muestre

En `server.js`:

```js
app.get("/api/verduras", (req, res) => {
  const verduras = ["Tomate", "Zanahoria", "Lechuga", "Pepino"];
  res.json(verduras);
});
```

En `public/index.html` añado otro botón y una lista:

```html
<button id="btnFrutas">Cargar frutas</button>
<button id="btnVerduras">Cargar verduras</button>

<ul id="lista"></ul>
```

En `public/script.js`:

```js
document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista");
  const btnFrutas = document.getElementById("btnFrutas");
  const btnVerduras = document.getElementById("btnVerduras");

  btnFrutas.addEventListener("click", async () => {
    const resp = await fetch("/api/frutas");
    const datos = await resp.json();
    pintarLista(datos);
  });

  btnVerduras.addEventListener("click", async () => {
    const resp = await fetch("/api/verduras");
    const datos = await resp.json();
    pintarLista(datos);
  });

  function pintarLista(items) {
    lista.innerHTML = "";
    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      lista.appendChild(li);
    });
  }
});
```

Así tengo **dos endpoints** y dos botones que consumen la API con `fetch`.

---

### 3. Haz que al hacer clic en una fruta de la lista, se muestre un mensaje con su nombre en pantalla

Extiendo la función `pintarLista` para añadir un manejador de clic:

```js
function pintarLista(items) {
  lista.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.style.cursor = "pointer";

    li.addEventListener("click", () => {
      // Opción 1: alert
      // alert("Has pulsado sobre: " + item);

      // Opción 2: mensaje en un <p> aparte
      mostrarMensaje("Has seleccionado: " + item);
    });

    lista.appendChild(li);
  });
}

function mostrarMensaje(texto) {
  let p = document.getElementById("mensajeSeleccion");
  if (!p) {
    p = document.createElement("p");
    p.id = "mensajeSeleccion";
    lista.parentNode.appendChild(p);
  }
  p.textContent = texto;
}
```

- Esto demuestra cómo conectar la **API JSON** con una **interacción rica en el frontend**.
- Además se refuerza el uso de `fetch`, `async/await`, DOM y eventos.

---

## Resumen de lo aprendido

Con estos ejemplos y adaptaciones:

- He repasado la estructura básica de una app Express:
  - `const express = require("express");`
  - `const app = express();`
  - `app.use(express.static("public"));`
  - `app.listen(puerto, callback);`
- He trabajado con:
  - **Rutas básicas** (`GET /`, `GET /adios`, etc.).
  - **Parámetros de ruta** (`/saludo/:nombre`, `/color/:color`).  
  - **Query params** (`/suma?a=1&b=2`) y su validación.
  - **Formularios POST** (`app.post("/procesar", ...)` + `express.urlencoded()`).
  - **Archivos estáticos** (HTML, CSS, JS, imágenes) servidos desde `public`.
  - **APIs que devuelven JSON** (`/api/frutas`, `/api/verduras`) y consumo con `fetch()`.
- También he añadido mejoras:
  - Logging de peticiones en consola.
  - Validación de entradas y mensajes de error más claros.
  - Interacciones más ricas en el frontend (botones, listas clicables, cambio de estilos).

Este documento deja constancia de que entiendo los fundamentos de Express y sé modificar y extender los ejemplos propuestos, no sólo ejecutarlos tal cual.

---
----------------------------------------------------------------------
---

<div align="center">

# 📦 Adaptación Extra  
### Integración completa de rutas, JSON, formularios y manejo de errores

</div>

Cuando te sientas cómodo con estos ejemplos, intenta:

- Unificar varias ideas en una sola app (por ejemplo: un formulario que llama a una API que devuelve JSON).
- Añadir manejo de errores (por ejemplo, devolver un `res.status(400)` cuando falten parámetros).
- Usar una plantilla HTML común y cambiar solo partes con JavaScript.

---
----------------------------------------------------------------------
---

# 📘 Adaptación Extra — Aplicación Unificada con Express.js

Esta adaptación extra recoge varias ideas de los ejemplos anteriores (rutas, parámetros, formularios, JSON, archivos estáticos…) y las integra en **una sola aplicación completa** construida con **Express.js**.

El objetivo no es solo que la app funcione, sino demostrar que se entienden:

- Cómo estructurar un mini–proyecto Express.
- Cómo diseñar una **API con endpoints GET y POST**.
- Cómo manejar **errores** correctamente (en el servidor y en el frontend).
- Cómo usar **una única plantilla HTML** e ir cambiando solo partes con JavaScript.
- Cómo hacer un **logging sencillo** de cada petición.

---

## 📑 Índice

1. [Objetivos de la adaptación extra](#objetivos-de-la-adaptación-extra)  
2. [Descripción general de la aplicación](#descripción-general-de-la-aplicación)  
3. [Tecnologías utilizadas](#tecnologías-utilizadas)  
4. [Estructura del proyecto](#estructura-del-proyecto)  
5. [Instalación y ejecución paso a paso](#instalación-y-ejecución-paso-a-paso)  
6. [Explicación del backend (server.js)](#explicación-del-backend-serverjs)  
   - [6.1. Configuración básica de Express](#61-configuración-básica-de-express)  
   - [6.2. Middleware global de logging](#62-middleware-global-de-logging)  
   - [6.3. Middlewares para leer el cuerpo de las peticiones](#63-middlewares-para-leer-el-cuerpo-de-las-peticiones)  
   - [6.4. Servir archivos estáticos](#64-servir-archivos-estáticos)  
   - [6.5. Endpoint GET /api/saludo](#65-endpoint-get-apisaludo)  
   - [6.6. Endpoint POST /api/edad](#66-endpoint-post-apiedad)  
7. [Explicación del frontend](#explicación-del-frontend)  
   - [7.1. index.html: estructura y bloques](#71-indexhtml-estructura-y-bloques)  
   - [7.2. styles.css: estilos básicos y errores](#72-stylescss-estilos-básicos-y-errores)  
   - [7.3. script.js: consumo de la API con fetch](#73-scriptjs-consumo-de-la-api-con-fetch)  
8. [Cómo probar la aplicación](#cómo-probar-la-aplicación)  
   - [8.1. Probar el bloque GET /api/saludo](#81-probar-el-bloque-get-apisaludo)  
   - [8.2. Probar el bloque POST /api/edad](#82-probar-el-bloque-post-apiedad)  
   - [8.3. Probar comportamiento ante errores](#83-probar-comportamiento-ante-errores)  
9. [Cómo se cumplen los puntos de la adaptación extra](#cómo-se-cumplen-los-puntos-de-la-adaptación-extra)  
10. [Posibles mejoras futuras](#posibles-mejoras-futuras)  

---

## 🎯 Objetivos de la adaptación extra

La práctica proponía tres ideas clave:

1. **Unificar varias ideas en una sola app**  
   - Combinar rutas, formularios, JSON y fetch en un proyecto único.
2. **Añadir manejo de errores**  
   - Tanto en el backend (códigos de estado y mensajes claros) como en el frontend (gestión de errores de red y de la API).
3. **Usar una plantilla HTML común**  
   - Un solo `index.html` que sirve para todo, y cuya información se modifica mediante JavaScript.

Esta adaptación extra cumple los tres puntos y, además, añade:

- Middleware de **logging** de todas las peticiones.
- Separación clara entre frontend (`public/`) y backend (`server.js`).
- Uso de **JSON** como formato principal de intercambio de datos.

---

## 🧩 Descripción general de la aplicación

La aplicación es un pequeño “laboratorio” de Express unificado con dos funcionalidades principales:

1. **Bloque GET: `/api/saludo`**  
   - El usuario escribe su nombre en un campo de texto.  
   - El frontend llama a la API con `fetch` y query params (`?nombre=...`).  
   - El backend valida el nombre y responde con un objeto JSON, por ejemplo:  

     ```json
     {
       "mensaje": "Hola Víctor, bienvenido a la API unificada 👋",
       "longitud": 6
     }
     ```

2. **Bloque POST: `/api/edad`**  
   - El usuario rellena un pequeño formulario con nombre y edad.  
   - El formulario se envía con `fetch` usando método `POST` y cuerpo JSON.  
   - El servidor valida los datos, comprueba si es mayor o menor de edad y devuelve un JSON como:

     ```json
     {
       "nombre": "Víctor",
       "edad": 20,
       "mensaje": "Eres mayor de edad. Puedes continuar."
     }
     ```

En caso de error (por ejemplo, falta el nombre o la edad no es un número), el servidor responde con un **código 400** y un JSON de error. El frontend detecta el error y lo muestra en pantalla con un formato visual diferente.

---

## 🛠 Tecnologías utilizadas

- **Node.js** – entorno de ejecución de JavaScript en el servidor.  
- **Express.js** – framework minimalista para crear aplicaciones web en Node.  
- **HTML5** – estructura del documento en el navegador.  
- **CSS3** – estilos básicos y resaltado de errores.  
- **JavaScript (frontend)** – consumo de la API mediante `fetch`, manejo del DOM y eventos.  
- **JSON** – formato de intercambio de datos entre cliente y servidor.

---

## 📂 Estructura del proyecto

La estructura final es:

```bash
extra/
│
├── server.js          # Código del servidor Express
├── package.json       # Dependencias y scripts de Node
├── package-lock.json  # Bloqueo de versiones de dependencias
│
└── public/            # Carpeta de archivos estáticos
    ├── index.html     # Plantilla HTML única
    ├── script.js      # Lógica frontend (fetch + DOM)
    └── styles.css     # Estilos generales y de error
```

- La carpeta `public/` se sirve de forma estática con `express.static("public")`.  
- `server.js` se encarga de la lógica de backend y las rutas de la API.

---

## ⚙️ Instalación y ejecución paso a paso

### 1️⃣ Requisitos previos

- Tener **Node.js** instalado (versión 14 o superior recomendable).
- Tener acceso a una terminal (PowerShell, cmd, terminal de VS Code, etc.).

### 2️⃣ Instalar las dependencias

Situarse en la carpeta del proyecto (por ejemplo, `extra/`) y ejecutar:

```bash
npm install
```

Este comando:

- Lee el archivo `package.json`.
- Descarga todas las dependencias necesarias (en este caso, Express).
- Crea o actualiza `node_modules/` con los paquetes instalados.

### 3️⃣ Iniciar el servidor

En la misma carpeta, ejecutar:

```bash
node server.js
```

Si todo va bien, en la consola debe aparecer algo similar a:

```bash
Servidor funcionando en http://localhost:3007
```

Además, gracias al middleware de logging, cada petición que reciba el servidor se mostrará en la consola.

### 4️⃣ Abrir la aplicación en el navegador

Abrir un navegador (Chrome, Firefox, Edge…) y acceder a:

```text
http://localhost:3007
```

Con esto se carga `public/index.html`, que actúa como interfaz principal.

---

## 🧠 Explicación del backend (server.js)

A continuación se explican las partes más importantes de `server.js`.

### 6.1. Configuración básica de Express

```js
const express = require("express");
const app = express();
const PORT = 3007;
```

- `require("express")` importa el framework.  
- `express()` crea una instancia de aplicación (el servidor).  
- `PORT` define el puerto donde va a escuchar (en este caso, 3007).

Al final del archivo:

```js
app.listen(PORT, () =>
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
);
```

- `app.listen` pone el servidor a escuchar en el puerto indicado.
- El callback imprime un mensaje en consola cuando el servidor se inicia.

---

### 6.2. Middleware global de logging

```js
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
```

Este middleware se ejecuta **antes que cualquier ruta**:

- Muestra en consola la fecha/hora (`new Date().toISOString()`), el método HTTP (`GET`, `POST`, etc.) y la URL (`/api/saludo`, `/api/edad`, `/`...).  
- Llama a `next()` para que Express continúe con el siguiente middleware o la ruta correspondiente.  
- Permite ver qué peticiones llegan al servidor y facilita la depuración.

---

### 6.3. Middlewares para leer el cuerpo de las peticiones

```js
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
```

- `express.urlencoded(...)` permite leer datos enviados desde formularios HTML con `application/x-www-form-urlencoded`.  
- `express.json()` permite leer cuerpos JSON enviados desde el frontend (por ejemplo, con `fetch` y `Content-Type: application/json`).

Gracias a estos middlewares, en las rutas se puede acceder a `req.body` y obtener los campos enviados por el cliente.

---

### 6.4. Servir archivos estáticos

```js
app.use(express.static("public"));
```

Con esta línea, Express:

- Expone todo el contenido de la carpeta `public/` directamente en la raíz del servidor.  
- Por ejemplo:
  - `public/index.html` → `http://localhost:3007/`
  - `public/script.js` → `http://localhost:3007/script.js`
  - `public/styles.css` → `http://localhost:3007/styles.css`

Es la forma habitual de servir HTML, CSS, JS e imágenes en apps sencillas.

---

### 6.5. Endpoint GET `/api/saludo`

```js
app.get("/api/saludo", (req, res) => {
  const nombre = req.query.nombre;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({
      error: "Debes enviar el parámetro 'nombre'"
    });
  }

  res.json({
    mensaje: `Hola ${nombre}, bienvenido a la API unificada 👋`,
    longitud: nombre.length
  });
});
```

#### Puntos clave:

- Se accede a los **query params** a través de `req.query`.  
- Se comprueba que el parámetro `nombre` exista y no sea una cadena vacía.
- Si falta o está vacío:
  - `res.status(400)` indica **Bad Request**.
  - `.json({ error: ... })` devuelve un objeto de error.
- Si todo es correcto:
  - Se responde con un JSON que incluye:
    - `mensaje`: saludo personalizado.
    - `longitud`: número de caracteres del nombre.

---

### 6.6. Endpoint POST `/api/edad`

```js
app.post("/api/edad", (req, res) => {
  const { nombre, edad } = req.body;

  if (!nombre || !edad) {
    return res.status(400).json({
      error: "Faltan datos: nombre y edad son obligatorios"
    });
  }

  if (isNaN(edad)) {
    return res.status(400).json({
      error: "La edad debe ser un número válido"
    });
  }

  const mayor = edad >= 18;

  res.json({
    nombre,
    edad,
    mensaje: mayor
      ? "Eres mayor de edad. Puedes continuar."
      : "Eres menor de edad. Acceso limitado."
  });
});
```

#### Puntos clave:

- Se extraen `nombre` y `edad` de `req.body`, gracias a los middlewares anteriores.
- Se valida:
  - Que `nombre` y `edad` existan.
  - Que `edad` sea numérica (`isNaN(edad)` comprueba si no es un número).
- Si hay errores:
  - Se devuelve código **400** y un JSON describiendo el problema.
- Si los datos son válidos:
  - Se calcula si es mayor de edad (`edad >= 18`).
  - La respuesta incluye un mensaje diferente según el caso.

---

## 🖥 Explicación del frontend

### 7.1. `index.html`: estructura y bloques

El HTML define **un único layout** con dos secciones principales:

- Bloque 1: consulta por nombre (GET).
- Bloque 2: formulario de edad (POST).

No hay recargas de página ni otras vistas: todo ocurre en esta plantilla.

### 7.2. `styles.css`: estilos básicos y errores

Los estilos se centran en:

- Tipografía y márgenes.
- Espaciado de inputs y botones.
- Formato de los bloques `<pre>` donde se muestran respuestas JSON.
- Una clase `.error` que se aplica cuando la respuesta es un error:

```css
pre.error {
  border-left: 4px solid red;
  color: red;
  font-weight: bold;
}
```

Esto ayuda a que el usuario vea claramente cuándo la API ha devuelto un error.

---

### 7.3. `script.js`: consumo de la API con fetch

`script.js` se encarga de:

- Capturar los eventos de clic y submit.
- Preparar la petición a la API (`GET` o `POST`).
- Interpretar la respuesta y mostrarla en pantalla.
- Gestionar errores de red o de la API.

#### Bloque GET `/api/saludo`

```js
document.getElementById("btnSaludo").addEventListener("click", async () => {
  const salida = document.getElementById("resultadoSaludo");
  salida.classList.remove("error"); // Quitar estado de error anterior

  const nombre = document.getElementById("nombreInput").value;

  try {
    const res = await fetch(`/api/saludo?nombre=${encodeURIComponent(nombre)}`);

    if (!res.ok) {
      salida.classList.add("error");
    }

    const data = await res.json();
    salida.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    salida.classList.add("error");
    salida.textContent = "Error de red o conexión con el servidor.";
  }
});
```

- Se usa `encodeURIComponent(nombre)` para evitar problemas con espacios o caracteres especiales.
- Si `res.ok` es falso (por ejemplo, status 400), se marca el `<pre>` como error.  
- En caso de fallo de red, se captura en el `catch` y se muestra un mensaje genérico.

#### Bloque POST `/api/edad`

```js
document.getElementById("formEdad").addEventListener("submit", async (e) => {
  e.preventDefault();

  const salida = document.getElementById("resultadoEdad");
  salida.classList.remove("error");

  const formData = new FormData(e.target);
  const obj = Object.fromEntries(formData);

  try {
    const res = await fetch("/api/edad", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });

    if (!res.ok) {
      salida.classList.add("error");
    }

    const data = await res.json();
    salida.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    salida.classList.add("error");
    salida.textContent = "Error de red al enviar datos.";
  }
});
```

- `FormData` recoge los datos del formulario.
- `Object.fromEntries(formData)` los convierte a un objeto JS.
- Se envía el objeto como JSON en el cuerpo de la petición.
- Se indican cabeceras: `"Content-Type": "application/json"`.
- De nuevo, se diferencian errores de API (`!res.ok`) de errores de red (`catch`).

---

## 🧪 Cómo probar la aplicación

### 8.1. Probar el bloque GET `/api/saludo`

1. Abrir `http://localhost:3007`.
2. En la primera sección, escribir un nombre (por ejemplo, `Victor`).
3. Pulsar **"Enviar"**.

Deberías ver en el recuadro:

```json
{
  "mensaje": "Hola Victor, bienvenido a la API unificada 👋",
  "longitud": 6
}
```

En la consola del servidor aparecerá algo como:

```bash
[2025-02-06T10:31:22.131Z] GET /api/saludo?nombre=Victor
```

---

### 8.2. Probar el bloque POST `/api/edad`

1. En la segunda sección, escribir un nombre y una edad (por ejemplo, `Victor`, `20`).  
2. Pulsar **"Enviar"**.

La respuesta será algo como:

```json
{
  "nombre": "Victor",
  "edad": "20",
  "mensaje": "Eres mayor de edad. Puedes continuar."
}
```

Si la edad es menor de 18, el mensaje cambiará:

```json
{
  "nombre": "Ana",
  "edad": "15",
  "mensaje": "Eres menor de edad. Acceso limitado."
}
```

---

### 8.3. Probar comportamiento ante errores

#### Caso 1: GET sin nombre

- Dejar el campo de nombre vacío.
- Pulsar **"Enviar"**.

El servidor devolverá:

```json
{
  "error": "Debes enviar el parámetro 'nombre'"
}
```

Y el `<pre>` aparecerá con estilo de error (borde rojo, texto en rojo).

#### Caso 2: POST sin edad

- Escribir nombre, pero dejar la edad vacía.
- Pulsar **"Enviar"**.

Respuesta:

```json
{
  "error": "Faltan datos: nombre y edad son obligatorios"
}
```

#### Caso 3: POST con edad no numérica

- Escribir algo como `edad = hola`.

Respuesta:

```json
{
  "error": "La edad debe ser un número válido"
}
```

---

## ✅ Cómo se cumplen los puntos de la adaptación extra

1. **Unificar varias ideas en una sola app**  
   - Una única aplicación con:
     - Rutas GET y POST.
     - Uso de query params y body JSON.
     - Una sola plantilla HTML.
     - Frontend que consume la API con fetch.

2. **Añadir manejo de errores**  
   - Backend:
     - Códigos 400 cuando los datos son incorrectos.
     - Respuestas JSON de error coherentes.
   - Frontend:
     - `try/catch` para errores de red.
     - Diferenciación entre éxito y error (`res.ok`).
     - Estilos visuales específicos para errores.

3. **Usar una plantilla HTML común y cambiar partes con JavaScript**  
   - `public/index.html` como única vista.
   - Todo el contenido de resultados se actualiza dinámicamente con `script.js`.

Además, se añade un extra:

- **Logging de peticiones**: un middleware que registra método, URL y fecha en cada petición.

---

## 🚀 Posibles mejoras futuras

Si se quisiera seguir evolucionando esta app, algunas ideas serían:

- Añadir un sistema simple de plantillas (por ejemplo, EJS o Handlebars).
- Dividir el código del servidor en varios archivos (rutas, controladores…).
- Añadir tests automáticos para los endpoints (`jest`, `supertest`).
- Guardar algunos datos en un fichero o una base de datos para persistencia.
- Implementar una pequeña interfaz más vistosa usando algún framework CSS (Bootstrap, Tailwind…).

---

Este documento deja constancia de cómo se ha diseñado e implementado la **adaptación extra** de la práctica, explicando tanto la parte técnica como las decisiones tomadas para cumplir los objetivos de Express, JSON y manejo de errores.

---

<div align="center">

> Práctica — Buenas prácticas con Express, JSON y JavaScript  
> Autor: **Víctor Carazo**

</div>
