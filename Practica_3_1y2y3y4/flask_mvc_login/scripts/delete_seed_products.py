import os
import sys

# Añadir ruta al proyecto
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(BASE_DIR)

from app import create_app, db
from app.models import Product

app = create_app()

with app.app_context():
    print("Eliminando SOLO los productos generados por el script...")

    # Productos cuyo nombre contiene "#"
    eliminados = Product.query.filter(Product.name.like("%#%")).delete()

    db.session.commit()

    print(f"Productos eliminados: {eliminados}")
