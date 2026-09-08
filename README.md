# Food Store - Primer Parcial Programación 3

Aplicación frontend de e-commerce desarrollada con HTML5, CSS3, TypeScript y Vite.

## Funcionalidades

- Catálogo de productos con búsqueda por nombre
- Filtrado de productos por categoría
- Carrito de compras con persistencia en localStorage
- Agregar productos al carrito con feedback visual
- Actualizar cantidad de productos con botones + y -
- Eliminar productos individuales del carrito
- Vaciar el carrito completo
- Visualización del carrito con subtotales y total general

## Estructura del proyecto

```
src/
├── pages/
│ ├── auth/ ← registro y login
│ ├── admin/ ← panel de administración
│ └── client/
│ ├── home/ ← catálogo de productos
│ └── cart/ ← carrito de compras
├── types/ ← interfaces TypeScript
├── data/ ← productos y categorías
└── utils/ ← lógica del carrito (localStorage)
```

---

## Instrucciones para ejecutar

1. Clonar el repositorio:
```bash
git clone https://github.com/rociomoscardi/food-store-moscardi-rocio.git
cd food-store-moscardi-rocio
```

2. Habilitar pnpm (si no se tiene):
```bash
corepack enable pnpm
```

3. Instalar las dependencias:
```bash
pnpm install
```

4. Levantar el servidor de desarrollo:
```bash
pnpm dev
```

5. Abrir el navegador en `http://localhost:5173/src/pages/client/home/home.html`

## Tecnologías utilizadas

- HTML5
- CSS3
- TypeScript
- Vite
