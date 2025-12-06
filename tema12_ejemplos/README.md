# Tema 12 – Clientes REST en JavaScript (Ejemplos)

Este proyecto contiene 5 ejemplos prácticos basados en el tema **«Clientes REST en JavaScript»**.  
Todos usan un servidor Express en `http://localhost:3000` y el recurso REST:

- `GET /api/dobla/:num` → devuelve `num * 2` en formato JSON.

## Estructura

- `dobla_server.js` – Servidor Express que expone la API REST y sirve los ficheros estáticos.
- `public/`
  - `index.html` – Índice con enlaces a los 5 ejemplos.
  - `style.css` – Estilos comunes.
  - `ejemplo1/` … `ejemplo5/`
    - `index.html` – Página HTML del ejemplo.
    - `ejemploX.js` – Lógica JavaScript del ejemplo.
    - `style.css` – Copia de los estilos (se pide separar HTML / JS / CSS).

## Requisitos

- Node.js 18+ (o compatible).
- Navegador web moderno.

## Puesta en marcha

1. Instala las dependencias (solo Express):

```bash
npm init -y
npm install express
```

2. Coloca **dobla_server.js** y la carpeta **public/** en el mismo directorio de trabajo.

3. Arranca el servidor:

```bash
node dobla_server.js
```

4. Abre el navegador en:

- `http://localhost:3000/` → índice con los 5 ejemplos.

## Descripción de los ejemplos

1. **Ejemplo 1 – `fetch()` básico**

   Demuestra una llamada simple con:

   ```js
   let respuesta = await fetch(url);
   let datos = await respuesta.json();
   ```

   y muestra el resultado para el número 10.

2. **Ejemplo 2 – Número aleatorio**

   Replica el comportamiento de `dobla_client.html` y `dobla_client.js` del tema:
   genera un número aleatorio, lo envía al servidor y muestra el valor recibido.

3. **Ejemplo 3 – Cadenas de `async/await`**

   Una función `async` llama a otra función `async` usando `await`, mostrando el flujo:
   origen → doble → doble del doble.

4. **Ejemplo 4 – Código de estado**

   Implementa el patrón:

   ```js
   if (respuesta.status === 200) {
       let datos = await respuesta.json();
       return datos;
   } else {
       return "Error " + respuesta.status;
   }
   ```

   Permite provocar errores introduciendo parámetros no numéricos.

5. **Ejemplo 5 – Mini app con varias peticiones**

   Realiza 5 peticiones seguidas con números aleatorios, mostrando una lista del tipo:

   ```
   Enviado 7 → recibido 14
   ```

Con estos ejemplos puedes **visualizar en el navegador** los conceptos explicados en el tema:
Same-Origin Policy (se sirve todo desde el mismo origen), uso de `fetch()`, promesas,
`async/await` y comprobación del código de estado.