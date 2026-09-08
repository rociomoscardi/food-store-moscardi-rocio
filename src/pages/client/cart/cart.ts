import {
    getCartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    calculateTotal,
} from "../../../utils/cart";
import type { ICartItem } from "../../../types/product";

// Referencias a los contenedores principales del DOM
const carritoContainer = document.getElementById(
    "carrito-container"
) as HTMLDivElement;
const resumenContainer = document.getElementById(
    "resumen-container"
) as HTMLDivElement;
const cartCount = document.getElementById("cart-count") as HTMLSpanElement;

// Actualiza el contador de items en el header
function actualizarContador(): void {
    const items = getCartItems();
    // Suma las cantidades de todos los productos para mostrar el total en el badge
    const total = items.reduce((acc, item) => acc + item.cantidad, 0);
    cartCount.textContent = String(total);
}

// Renderiza la vista de carrito vacío y oculta el resumen
function renderCarritoVacio(): void {
    carritoContainer.innerHTML = `
    <div class="carrito-vacio">
        <span class="carrito-vacio-icono">🛒</span>
        <p>Tu carrito está vacío.</p>
        <a href="/src/pages/client/home/home.html" class="btn-ver-catalogo">Ver catálogo</a>
    </div>
    `;
    resumenContainer.innerHTML = "";
    // Se oculta el resumen cuando el carrito está vacío para evitar un espacio vacío al lado
    resumenContainer.style.display = "none";
}

// Renderiza el panel de resumen con subtotal, total y botones de acción
function renderResumen(items: ICartItem[]): void {
    // Se muestra el resumen cuando hay productos en el carrito
    resumenContainer.style.display = "block";
    const total = calculateTotal(items);
    resumenContainer.innerHTML = `
    <div class="resumen-card">
        <h3>Resumen</h3>
        <div class="resumen-fila">
        <span>Subtotal</span>
        <span>$${total.toLocaleString("es-AR")}</span>
        </div>
        <div class="resumen-fila total">
        <strong>Total</strong>
        <strong>$${total.toLocaleString("es-AR")}</strong>
        </div>
        <button type="button" class="btn-finalizar" disabled>Finalizar compra</button>
        <p class="checkout-aviso">⚠️ El checkout no está disponible en esta versión.</p>
        <button type="button" id="btn-vaciar" class="btn-vaciar">Vaciar carrito</button>
    </div>
    `;

    // Al vaciar el carrito se limpia el localStorage y se re-renderiza la vista
    document.getElementById("btn-vaciar")!.addEventListener("click", () => {
        clearCart();
        renderCarrito();
    });
}

// Función principal que renderiza todo el carrito
function renderCarrito(): void {
    const items = getCartItems();
    // Se actualiza el badge del header en cada render
    actualizarContador();

    // Si no hay items se muestra el estado vacío y se corta la ejecución
    if (items.length === 0) {
        renderCarritoVacio();
        return;
    }

    carritoContainer.innerHTML = "";

    // Se crea una tarjeta por cada item del carrito
    items.forEach((item: ICartItem) => {
        const div = document.createElement("div");
        div.classList.add("carrito-item");
        div.innerHTML = `
    <img src="/pizza.jpg" alt="${item.product.nombre}" class="carrito-item-img" />
    <div class="carrito-item-info">
    <p class="carrito-item-nombre">${item.product.nombre}</p>
    <p class="carrito-item-categoria">${item.product.categorias[0]?.nombre ?? ""}</p>
    <p class="carrito-item-subtotal">Subtotal: $${(item.product.precio * item.cantidad).toLocaleString("es-AR")}</p>
    </div>
    <div class="carrito-item-controles-wrapper">
    <div class="carrito-item-controles">
        <button type="button" class="btn-cantidad" data-id="${item.product.id}" data-accion="restar">−</button>
        <span>${item.cantidad}</span>
        <button type="button" class="btn-cantidad" data-id="${item.product.id}" data-accion="sumar">+</button>
    </div>
    <button type="button" class="btn-eliminar" data-id="${item.product.id}">Eliminar</button>
    </div>
    `;
        carritoContainer.appendChild(div);
    });

    // Listeners para los botones de sumar y restar cantidad
    // Se usa data-id para identificar el producto y data-accion para saber si sumar o restar
    carritoContainer.querySelectorAll(".btn-cantidad").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = Number((btn as HTMLButtonElement).dataset.id);
            const accion = (btn as HTMLButtonElement).dataset.accion;
            const item = getCartItems().find((i) => i.product.id === id);
            if (!item) return;
            // Si la nueva cantidad es 0 o menos, updateQuantity se encarga de eliminar el item
            const nuevaCantidad = accion === "sumar" ? item.cantidad + 1 : item.cantidad - 1;
            updateQuantity(id, nuevaCantidad);
            // Se re-renderiza todo el carrito para reflejar el cambio
            renderCarrito();
        });
    });

    // Listener para el botón de eliminar un producto individual del carrito
    carritoContainer.querySelectorAll(".btn-eliminar").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = Number((btn as HTMLButtonElement).dataset.id);
            removeFromCart(id);
            renderCarrito();
        });
    });

    // Se renderiza el panel de resumen con el total actualizado
    renderResumen(items);
}

// Punto de entrada: se renderiza el carrito al cargar la página
renderCarrito();