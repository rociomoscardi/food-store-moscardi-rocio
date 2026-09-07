import type { ICartItem } from "../types/product";
import type { IProduct } from "../types/product";

const CART_KEY = "cart";

export function getCartItems(): ICartItem[] {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveCartItems(items: ICartItem[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(product: IProduct): void {
    const items = getCartItems();
    const existing = items.find((item) => item.product.id === product.id);

    if (existing) {
        existing.cantidad += 1;
    } else {
        items.push({ product, cantidad: 1 });
    }

    saveCartItems(items);
}

export function calculateTotal(items: ICartItem[]): number {
    return items.reduce(
        (total, item) => total + item.product.precio * item.cantidad,
        0
    );
}