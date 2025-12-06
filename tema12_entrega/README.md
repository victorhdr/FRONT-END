# 📘 Informe Técnico — Implementación de 3 Clientes REST en JavaScript
### Autor: **Víctor Carazo**
### Asignatura: Tecnologías Web — Tema 12 (Clientes REST)

---

## 📑 Índice

1. Introducción  
2. Objetivos de la práctica  
3. Tecnologías empleadas  
4. Estructura general del proyecto  
5. Ejemplo A — Cliente REST GET con API Pública  
6. Ejemplo B — Cliente REST CRUD con servidor Express  
7. Ejemplo C — Cliente REST con Autenticación, Token y Zona Privada  
8. Comparativa entre los tres enfoques REST  
9. Conclusiones y posibles mejoras  

---

## 🧩 Introducción

En esta práctica se han desarrollado **tres clientes REST diferentes** utilizando JavaScript, con una complejidad creciente.  

La idea principal es partir de un ejemplo muy sencillo (consumir una API pública) y avanzar hacia un escenario mucho más realista, donde el cliente:

- Interactúa con un backend propio
- Realiza operaciones CRUD
- Gestiona autenticación y acceso a recursos protegidos mediante token

---

## 🎯 Objetivos de la práctica

- Comprender el uso de la API `fetch()`  
- Realizar peticiones GET, POST y DELETE  
- Crear clientes REST con varios niveles de complejidad  
- Implementar autenticación con token  
- Manejar errores en cliente y servidor  
- Trabajar con un backend Express  

---

## 🛠 Tecnologías empleadas

- **JavaScript (ES6+)**
- **Fetch API**
- **HTML5 + CSS3**
- **Node.js**
- **Express.js**
- **localStorage**
- **JSON**

---

## 📂 Estructura general del proyecto

```
tema12_entrega/
│
├── catfact/               → Ejemplo A (GET API pública)
│
├── todo-rest/             → Ejemplo B (CRUD Express)
│
└── auth-rest/             → Ejemplo C (Login + Token)
```

---

## 🟦 Ejemplo A — Cliente REST GET con API Pública

### Descripción funcional

Este ejemplo muestra cómo consumir una API pública únicamente usando JavaScript y `fetch()`.

API utilizada:

```
https://catfact.ninja/fact
```

Al pulsar un botón:

1. El cliente hace una petición GET a la API.  
2. Recibe un JSON con un dato curioso.  
3. Se muestra dinámicamente en la página.  

### Diseño técnico

- `index.html` contiene el botón y área de resultado.  
- `script.js` implementa `fetch()` y manejo de errores.  

### Ejecución

Abrir directamente:

```
catfact/index.html
```

---

## 🟩 Ejemplo B — Cliente REST CRUD con servidor Express

### Descripción funcional

Simula una pequeña aplicación To‑Do con funcionalidades:

- Crear tarea (POST)
- Listar tareas (GET)
- Eliminar tarea (DELETE)

### Diseño técnico

Backend Express (`server.js`):

- Mantiene un array en memoria con las tareas.
- Expone endpoints REST:

```
GET    /api/tareas
POST   /api/tareas
DELETE /api/tareas/:id
```

Frontend (`index.html + script.js`):

- Maneja el DOM para mostrar tareas.
- Llama a los endpoints mediante `fetch()`.

### Ejecución

```
cd todo-rest
npm install
node server.js
http://localhost:4000
```

---

## 🟥 Ejemplo C — Cliente REST con Autenticación, Token y Zona Privada

### Descripción funcional

Este ejemplo reproduce un flujo realista de autenticación:

1. Login con email y contraseña.  
2. El servidor devuelve un **token**.  
3. El token se guarda en `localStorage`.  
4. Para acceder a zonas privadas, se envía:  

```
Authorization: Bearer <token>
```

5. El servidor valida el token y decide si autoriza o no.  

### Diseño técnico

Backend:

- Simula un usuario real con email/contraseña/token.
- Rutas:

```
POST /api/login
GET  /api/privado
```

Frontend:

- Alterna entre la vista pública y privada.
- Muestra mensajes dependiendo del servidor.
- Implementa logout limpiando el localStorage.

### Ejecución

```
cd auth-rest
npm install
node server.js
http://localhost:5000
```

Credenciales:

- Email: `victor@example.com`
- Password: `1234`

---

## 📊 Comparativa entre los enfoques REST

| Característica            | A | B | C |
|---------------------------|---|---|---|
| GET                       | ✔ | ✔ | ✔ |
| POST                      | ❌| ✔ | ✔ |
| DELETE                    | ❌| ✔ | ❌|
| Backend propio            | ❌| ✔ | ✔ |
| Autenticación             | ❌| ❌| ✔ |
| Token                     | ❌| ❌| ✔ |

---

## 📝 Conclusiones y mejoras

Los tres ejemplos cubren todo el ciclo básico de consumo de APIs:

- ✔ Ejemplo A: interacción básica con APIs públicas  
- ✔ Ejemplo B: CRUD completo con backend propio  
- ✔ Ejemplo C: autenticación y acceso privado con token  

### Posibles mejoras

- Implementar JWT real en lugar de token fijo  
- Añadir base de datos (SQLite/MongoDB) al CRUD  
- Añadir PUT/PATCH  
- Añadir test automáticos de API  
- Mejorar la interfaz visual  

---
