import { PRODUCTS, getCategories } from "../../../data/data";
import { addToCart, getCartItems } from "../../../utils/cart";
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

function actualizarContadorCarrito(): void {
  const count = document.getElementById("cart-count") as HTMLSpanElement;
  const items = getCartItems();
  const total = items.reduce((acc, item) => acc + item.cantidad, 0);
  count.textContent = String(total);
}

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
      <img src="/pizza.jpg" alt="${producto.nombre}" class="producto-img" />
      <div class="producto-info">
        <span class="producto-categoria">${producto.categorias[0]?.nombre ?? ""}</span>
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <div class="producto-footer">
          <strong>$${producto.precio.toLocaleString("es-AR")}</strong>
          <button type="button" class="btn-agregar" ${!producto.disponible ? "disabled" : ""}>
            + Agregar
          </button>
        </div>
      </div>
    `;

    const btnAgregar = card.querySelector(".btn-agregar") as HTMLButtonElement;
    btnAgregar.addEventListener("click", () => {
      addToCart(producto);
      actualizarContadorCarrito();
      btnAgregar.textContent = "¡Agregado!";
      setTimeout(() => {
        btnAgregar.textContent = "+ Agregar";
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
actualizarContadorCarrito();

inputBusqueda.addEventListener("input", (e) => {
  textoBusqueda = (e.target as HTMLInputElement).value;
  aplicarFiltros();
});