import {
    getCartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    calculateTotal,
} from "../../../utils/cart";
import type { ICartItem } from "../../../types/product";

const carritoContainer = document.getElementById(
    "carrito-container"
) as HTMLDivElement;
const resumenContainer = document.getElementById(
    "resumen-container"
) as HTMLDivElement;
const cartCount = document.getElementById("cart-count") as HTMLSpanElement;

function actualizarContador(): void {
    const items = getCartItems();
    const total = items.reduce((acc, item) => acc + item.cantidad, 0);
    cartCount.textContent = String(total);
}

function renderCarritoVacio(): void {
    carritoContainer.innerHTML = `
    <div class="carrito-vacio">
      <span class="carrito-vacio-icono">🛒</span>
      <p>Tu carrito está vacío.</p>
      <a href="/src/pages/client/home/home.html" class="btn-ver-catalogo">Ver catálogo</a>
    </div>
  `;
    resumenContainer.innerHTML = "";
}

function renderResumen(items: ICartItem[]): void {
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

    document.getElementById("btn-vaciar")!.addEventListener("click", () => {
        clearCart();
        renderCarrito();
    });
}

function renderCarrito(): void {
    const items = getCartItems();
    actualizarContador();

    if (items.length === 0) {
        renderCarritoVacio();
        return;
    }

    carritoContainer.innerHTML = "";

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
        <div class="carrito-item-controles">
        <button type="button" class="btn-cantidad" data-id="${item.product.id}" data-accion="restar">−</button>
        <span>${item.cantidad}</span>
        <button type="button" class="btn-cantidad" data-id="${item.product.id}" data-accion="sumar">+</button>
        </div>
        <button type="button" class="btn-eliminar" data-id="${item.product.id}">Eliminar</button>
    `;
        carritoContainer.appendChild(div);
    });

    carritoContainer.querySelectorAll(".btn-cantidad").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = Number((btn as HTMLButtonElement).dataset.id);
            const accion = (btn as HTMLButtonElement).dataset.accion;
            const item = getCartItems().find((i) => i.product.id === id);
            if (!item) return;
            const nuevaCantidad = accion === "sumar" ? item.cantidad + 1 : item.cantidad - 1;
            updateQuantity(id, nuevaCantidad);
            renderCarrito();
        });
    });

    carritoContainer.querySelectorAll(".btn-eliminar").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = Number((btn as HTMLButtonElement).dataset.id);
            removeFromCart(id);
            renderCarrito();
        });
    });

    renderResumen(items);
}

renderCarrito();