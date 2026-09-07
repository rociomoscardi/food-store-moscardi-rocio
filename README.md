# Food Store - Primer Parcial Programación 3

Aplicación frontend de e-commerce desarrollada con HTML5, CSS3, TypeScript y Vite.

## Funcionalidades

- Catálogo de productos con búsqueda por nombre
- Filtrado de productos por categoría
- Carrito de compras con persistencia en localStorage
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

1. Cloná el repositorio:
```bash
git clone https://github.com/rociomoscardi/food-store-moscardi-rocio.git
cd food-store-moscardi-rocio
```

2. Instalá las dependencias:
```bash
pnpm install
```

3. Levantá el servidor de desarrollo:
```bash
pnpm dev
```

4. Abrí el navegador en `http://localhost:5173`

## Tecnologías utilizadas

- HTML5
- CSS3
- TypeScript
- Vite
