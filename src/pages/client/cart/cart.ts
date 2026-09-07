import { getCartItems, calculateTotal } from "../../../utils/cart";
import type { ICartItem } from "../../../types/product";

const carritoContainer = document.getElementById(
    "carrito-container"
) as HTMLDivElement;
const totalContainer = document.getElementById(
    "total-container"
) as HTMLDivElement;

function renderCarrito(): void {
    const items: ICartItem[] = getCartItems();
    carritoContainer.innerHTML = "";

    if (items.length === 0) {
        carritoContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        totalContainer.innerHTML = "";
        return;
    }

    items.forEach((item) => {
        const div = document.createElement("article");
        div.classList.add("carrito-item");
        div.innerHTML = `
        <h3>${item.product.nombre}</h3>
        <p>Precio unitario: <strong>$${item.product.precio.toLocaleString("es-AR")}</strong></p>
        <p>Cantidad: <strong>${item.cantidad}</strong></p>
        <p>Subtotal: <strong>$${(item.product.precio * item.cantidad).toLocaleString("es-AR")}</strong></p>
    `;
        carritoContainer.appendChild(div);
    });

    const total = calculateTotal(items);
    totalContainer.innerHTML = `
    <hr />
    <h3>Total: $${total.toLocaleString("es-AR")}</h3>
    `;
}

renderCarrito();