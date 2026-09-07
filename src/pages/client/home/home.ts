import { PRODUCTS, getCategories } from "../../../data/data";
import { addToCart } from "../../../utils/cart";
import type { Product } from "../../../types/product";
import type { ICategory } from "../../../types/category";

const productosContainer = document.getElementById(
  "productos-container"
) as HTMLDivElement;
const listaCategorias = document.getElementById(
  "lista-categorias"
) as HTMLUListElement;
const inputBusqueda = document.getElementById(
  "input-busqueda"
) as HTMLInputElement;

let categoriaSeleccionada: number | null = null;
let textoBusqueda: string = "";

function renderProductos(productos: Product[]): void {
  productosContainer.innerHTML = "";

  if (productos.length === 0) {
    productosContainer.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  productos.forEach((producto) => {
    const card = document.createElement("article");
    card.classList.add("producto-card");
    card.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p><strong>$${producto.precio.toLocaleString("es-AR")}</strong></p>
      <p>${producto.disponible ? "Disponible" : "Sin stock"}</p>
      <button type="button" class="btn-agregar" ${!producto.disponible ? "disabled" : ""}>
        Agregar al carrito
      </button>
    `;

    const btnAgregar = card.querySelector(".btn-agregar") as HTMLButtonElement;
    btnAgregar.addEventListener("click", () => {
      addToCart(producto);
      btnAgregar.textContent = "¡Agregado!";
      setTimeout(() => {
        btnAgregar.textContent = "Agregar al carrito";
      }, 1500);
    });

    productosContainer.appendChild(card);
  });
}

function renderCategorias(categorias: ICategory[]): void {
  listaCategorias.innerHTML = "";

  const liTodas = document.createElement("li");
  liTodas.innerHTML = `<button type="button" class="btn-categoria activa">Todas</button>`;
  liTodas.querySelector("button")!.addEventListener("click", () => {
    categoriaSeleccionada = null;
    actualizarActiva(liTodas);
    aplicarFiltros();
  });
  listaCategorias.appendChild(liTodas);

  categorias.forEach((categoria) => {
    const li = document.createElement("li");
    li.innerHTML = `<button type="button" class="btn-categoria">${categoria.nombre}</button>`;
    li.querySelector("button")!.addEventListener("click", () => {
      categoriaSeleccionada = categoria.id;
      actualizarActiva(li);
      aplicarFiltros();
    });
    listaCategorias.appendChild(li);
  });
}

function actualizarActiva(liActivo: HTMLLIElement): void {
  document.querySelectorAll(".btn-categoria").forEach((btn) => {
    btn.classList.remove("activa");
  });
  liActivo.querySelector("button")!.classList.add("activa");
}

function aplicarFiltros(): void {
  let productos = PRODUCTS;

  if (categoriaSeleccionada !== null) {
    productos = productos.filter((p) =>
      p.categorias.some((c: ICategory) => c.id === categoriaSeleccionada)
    );
  }

  if (textoBusqueda.trim() !== "") {
    productos = productos.filter((p) =>
      p.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
    );
  }

  renderProductos(productos);
}

renderCategorias(getCategories());
renderProductos(PRODUCTS);

inputBusqueda.addEventListener("input", (e) => {
  textoBusqueda = (e.target as HTMLInputElement).value;
  aplicarFiltros();
});