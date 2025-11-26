### 📄 `README.md`


```markdown
# Práctica 1: Login en un E-commerce


## Descripción
Este proyecto implementa un sistema de **login accesible, usable y responsivo** para un sitio de comercio electrónico. Está desarrollado con **HTML5, CSS3, Bootstrap 5.3.8 y JavaScript**.


## Estructura del proyecto
```
login-ecommerce/
├── index.html
├── registro.html
├── css/
│ └── styles.css
├── js/
│ └── script.js
├── img/
│ ├── logo.png
│ ├── logo2.jpg
| └── logo3.jpg
├── README.md
```


## Tecnologías utilizadas
- **HTML5 semántico** para mejorar accesibilidad y SEO.
- **CSS3 con Flexbox, Grid y variables personalizadas**.
- **Bootstrap 5.3.8** para maquetación, formularios y validación.
- **JavaScript** para validaciones dinámicas y mejora de la experiencia del usuario.


## Responsive Design
Diseñado con un enfoque **mobile-first**, adaptándose a:
- 📱 Móvil: 320–767 px
- 💻 Tablet: 768–1023 px
- 🖥️ Escritorio: 1024 px en adelante


## Accesibilidad
- Navegación por teclado (`tabindex`, `focus-visible`)
- Etiquetas `aria-*` para lectores de pantalla
- Contraste mínimo de 4.5:1 entre texto y fondo


## Indicadores de rendimiento
- Bundle (gzip): ≤ 360 KB
- FCP ≤ 1.8 s
- LCP ≤ 2.5 s
- FID ≤ 100 ms
- CLS ≤ 0.1


## Buenas prácticas
- Separación de responsabilidades (HTML, CSS, JS)
- Nombres de clases con metodología **BEM**
- Código limpio, comentado y modular


## Ejecución
1. Clona el repositorio o descarga el proyecto.
2. Abre `index.html` en tu navegador.
3. (Opcional) Usa un servidor local (VS Code Live Server o similar).


## Autor
Proyecto realizado por **Víctor Carazo** — Curso 2025–2026.
```

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
