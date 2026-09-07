import type { ICartItem, Product } from "../types/product";

const CART_KEY = "cart";

export function getCartItems(): ICartItem[] {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveCartItems(items: ICartItem[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(product: Product): void {
    const items = getCartItems();
    const existing = items.find((item) => item.product.id === product.id);
    if (existing) {
        existing.cantidad += 1;
    } else {
        items.push({ product, cantidad: 1 });
    }
    saveCartItems(items);
}

export function updateQuantity(productId: number, cantidad: number): void {
    const items = getCartItems();
    const item = items.find((i) => i.product.id === productId);
    if (item) {
        item.cantidad = cantidad;
        if (item.cantidad <= 0) {
            removeFromCart(productId);
            return;
        }
    }
    saveCartItems(items);
}

export function removeFromCart(productId: number): void {
    const items = getCartItems().filter((i) => i.product.id !== productId);
    saveCartItems(items);
}

export function clearCart(): void {
    localStorage.removeItem(CART_KEY);
}

export function calculateTotal(items: ICartItem[]): number {
    return items.reduce(
        (total, item) => total + item.product.precio * item.cantidad,
        0
    );
}