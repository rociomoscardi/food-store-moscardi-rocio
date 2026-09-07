import type { ICategory } from "./categoria";

export interface IProduct {
    id: number;
    eliminado: boolean;
    createdAt: string;
    nombre: string;
    precio: number;
    descripcion: string;
    stock: number;
    imagen: string;
    disponible: boolean;
    categorias: ICategory[];
}

export interface ICartItem {
    product: IProduct;
    cantidad: number;
}