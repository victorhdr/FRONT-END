
from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify
from flask_login import login_required, current_user
from ..models import Product, db, User

main_bp = Blueprint("main", __name__)

@main_bp.route("/")
def index():
    if current_user.is_authenticated:
        return render_template("menu.html", user=current_user)
    # Redirige a la pantalla de login oficial para evitar POST en "/"
    return redirect(url_for("auth.login"))

@main_bp.route("/menu")
@login_required
def menu():
    return render_template("menu.html", user=current_user)

@main_bp.route("/usuario")
@login_required
def usuario():
    return render_template("usuario.html", user=current_user)

@main_bp.route("/preferencias", methods=["GET", "POST"])
@login_required
def preferencias():
    if request.method == "POST":
        new_email = request.form.get("email") or current_user.email
        new_password = request.form.get("password")
        # Validaciones mínimas
        if new_email and new_email != current_user.email:
            if User.query.filter(User.email == new_email, User.id != current_user.id).first():
                flash("Ese email ya está en uso.", "danger")
            else:
                current_user.email = new_email
                db.session.commit()
                flash("Email actualizado.", "success")
        if new_password:
            if len(new_password) < 6:
                flash("La contraseña debe tener al menos 6 caracteres.", "warning")
            else:
                current_user.set_password(new_password)
                db.session.commit()
                flash("Contraseña actualizada.", "success")
        return redirect(url_for("main.preferencias"))
    return render_template("preferencias.html", user=current_user)

@main_bp.route("/nuevo", methods=["GET", "POST"])
@login_required
def nuevo():
    if request.method == "POST":
        name = request.form.get("name")
        price = request.form.get("price", type=float)
        image_path = request.form.get("image_path") or "products/p1.svg"
        if not name or price is None:
            flash("Nombre y precio son obligatorios.", "danger")
        else:
            p = Product(name=name, price=price, image_path=image_path)
            db.session.add(p)
            db.session.commit()
            flash("Producto creado.", "success")
            return redirect(url_for("main.productos"))
    return render_template("nuevo.html")

@main_bp.route("/productos")
@login_required
def productos():
    products = Product.query.all()
    products_data = [
        {
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "image_path": url_for("static", filename=f"products/{p.image_path}")
        }
        for p in products
    ]
    return render_template("productos.html", products_data=products_data)

@main_bp.route("/api/products/export", methods=["GET"])
@login_required
def export_products():
    """
    Exporta la lista de productos en formato JSON.
    Buena práctica: no incluir datos sensibles y usar una estructura clara.
    """
    products = Product.query.all()

    # Preparamos los datos en una estructura limpia y serializable
    products_data = [
        {
            "id": p.id,
            "name": p.name,
            "price": float(p.price),  # Aseguramos tipo numérico estándar
            "image_path": p.image_path  # Solo la ruta relativa, nada sensible
        }
        for p in products
    ]

    # Usamos jsonify para devolver JSON válido con cabecera application/json
    return jsonify({
        "status": "success",
        "total": len(products_data),
        "products": products_data
    }), 200

@main_bp.route("/registro")
def registro():
    return render_template("registro.html")

@main_bp.route("/api/echo", methods=["POST"])
@login_required
def api_echo():
    """
    Devuelve el JSON recibido. Ejemplo para AJAX clásico POST.
    """
    data = request.get_json()  # Recibe el JSON enviado
    return jsonify({
        "status": "ok",
        "received": data
    }), 200

@main_bp.route("/api/products/<int:product_id>", methods=["GET"])
@login_required
def api_product_detail(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify({
        "id": product.id,
        "name": product.name,
        "price": float(product.price),
        "image_path": product.image_path,
        "description": f"Detalle del producto {product.name}"
    })

@main_bp.route("/opiniones", methods=["GET"])
@login_required
def opiniones():
    return render_template("opiniones.html")


@main_bp.route("/api/opinion", methods=["POST"])
@login_required
def api_opinion():
    # CSRF: Comprobamos cabecera personalizada
    token = request.headers.get("X-CSRF-Token")
    if token != "TOKEN_SEGURO_DEMO":
        return jsonify({"error": "CSRF token inválido"}), 403

    data = request.get_json()

    texto = data.get("texto", "").strip()

    # Validación simple
    if not texto:
        return jsonify({"error": "La opinión no puede estar vacía"}), 400

    # Resultado simulado
    return jsonify({
        "status": "ok",
        "texto": texto
    }), 200

@main_bp.route("/api/products/page/<int:page>", methods=["GET"])
@login_required
def api_products_page(page):
    PER_PAGE = 4  # 4 productos por página

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
