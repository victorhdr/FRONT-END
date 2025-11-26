# Práctica 2 — Dinamismo con JavaScript y el DOM

## Autor
Víctor Carazo 

## Resumen
Se ha añadido una nueva página `products.html` que demuestra todas las evidencias requeridas en la rúbrica: uso de `let`/`const`, arrays/objetos, creación y eliminación dinámica de nodos, manipulación de `textContent` y atributos, manejo de eventos (`click`, `change`), uso de `event.target` y `classList.toggle()`.

## Evidencias implementadas (punto por punto)
1. **Gestión de datos con JavaScript**
   - Se usa `const products = [...]` (array de objetos) al inicio de `js/products.js`.
   - La función `addProduct(name, price, category)` añade productos y devuelve el objeto creado (función con retorno).
   - Uso de `let` y `const` en todo el archivo; variables con nombres claros.

2. **Manipulación del DOM (mínimo 3 evidencias)**
   - Creación de nodos con `document.createElement` indirecta (uso de `<template>` + `cloneNode`) y `appendChild` en `renderProducts`.
   - Modificación de contenido con `element.textContent` (`.product-name`, `.product-price`, `.product-desc`).
   - Inserción y eliminación de elementos en la lista: al añadir se hace `appendChild`, al eliminar se llama a `li.remove()` y se actualiza el array `products`.
   - Cambio de atributos `src` y `alt` en imágenes (`imgEl.src`, `imgEl.alt`).

3. **Eventos**
   - `addEventListener('submit', ...)` para el formulario de añadir.
   - `addEventListener('change', ...)` en el `select` de filtrado.
   - `addEventListener('click', ...)` en `listEl` usando delegación para `Eliminar` y `Detalles`.
   - Uso de `event.target` y `closest()` para identificar el elemento sobre el que actuar.
   - `classList.toggle('hidden')` para mostrar/ocultar los detalles del producto.

4. **Buenas prácticas**
   - No se usan manejadores inline ni `document.write`.
   - Código modular, funciones con responsabilidades claras y comentarios.
   - Validaciones básicas en el formulario.

## Qué he aprendido
- Cómo usar plantillas (`<template>`) y `cloneNode` para generar muchos elementos DOM de forma eficiente.
- Diferencias entre modificar `innerHTML` y utilizar `createElement`/`textContent` (seguridad y rendimiento).
- Uso de delegación de eventos para simplificar gestión de muchos botones dinámicos.

## Archivos añadidos
- `products.html`
- `css/products.css`
- `js/products.js`
- `README_practica2.md`

## Instrucciones de uso
1. Copiar los archivos al directorio raíz del proyecto.
2. Abrir `products.html` en el navegador (o servir el proyecto con un pequeño servidor local).
3. Probar añadir, filtrar, mostrar detalles, editar nombre (clic sobre nombre) y eliminar productos.
