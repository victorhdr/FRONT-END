import os
import sys
import random

# ---------------------------------------------------------
# 🔧 Ajuste del sys.path
# ---------------------------------------------------------
# Este script no se ejecuta desde el contexto normal de Flask,
# así que Python no sabe dónde está el paquete de la aplicación.
# Añadimos manualmente la ruta absoluta al directorio padre
# (flask_mvc_login) para poder importar `app` y sus modelos.
# ---------------------------------------------------------

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(BASE_DIR)

# ---------------------------------------------------------
# 📦 Importar la aplicación Flask y la base de datos
# ---------------------------------------------------------
# Una vez añadido BASE_DIR al path, ahora sí podemos importar:
#   - create_app   → crea la instancia de la app Flask
#   - db           → base de datos SQLAlchemy
#   - Product      → modelo de productos
# ---------------------------------------------------------

from app import create_app, db
from app.models import Product

# ---------------------------------------------------------
# 🚀 Crear una instancia de la app para usar el contexto
# ---------------------------------------------------------
# Necesitamos el contexto de la aplicación para poder
# interactuar con la base de datos fuera de un request.
# ---------------------------------------------------------

app = create_app()

# ---------------------------------------------------------
# 🔢 Número de productos que se añadirán
# ---------------------------------------------------------
N = 20

# ---------------------------------------------------------
# 📝 Lista base de nombres de producto
# ---------------------------------------------------------
# Se reutilizan en forma circular con un número al final
# para generar productos únicos.
# ---------------------------------------------------------

nombres = [
    "Cuaderno escolar", "Papel reciclado", "Bolígrafo azul",
    "Carpeta A4", "Rotuladores", "Caja de colores",
    "Grapadora", "Regla metálica", "Compás escolar",
    "Bloc de dibujo", "Archivador", "Libreta premium",
    "Marcapáginas", "Boli gel", "Pincel fino",
    "Tijeras escolares", "Pegamento", "Calculadora básica",
    "Agenda 2025", "Libro de notas"
]

# ---------------------------------------------------------
# 🧱 Inserción de productos en la base de datos
# ---------------------------------------------------------
# Esto debe ejecutarse dentro del contexto de la app.
# Cada producto tendrá:
#   - Nombre único
#   - Precio aleatorio entre 2€ y 50€
#   - Imagen genérica "p1.svg"
# ---------------------------------------------------------

with app.app_context():
    print("Añadiendo productos de prueba...")

    for i in range(N):
        p = Product(
            name=f"{nombres[i % len(nombres)]} #{i+1}",
            price=round(random.uniform(2, 50), 2),
            image_path="p1.svg"
        )
        db.session.add(p)

    # Guardar cambios en la BD
    db.session.commit()

    print(f"{N} productos añadidos correctamente.")
