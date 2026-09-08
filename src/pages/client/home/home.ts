import { PRODUCTS, getCategories } from "../../../data/data";
import { addToCart, getCartItems } from "../../../utils/cart";
import type { Product } from "../../../types/product";
import type { ICategory } from "../../../types/category";

// Referencias a los elementos principales del DOM
const productosContainer = document.getElementById(
  "productos-container"
) as HTMLDivElement;
const listaCategorias = document.getElementById(
  "lista-categorias"
) as HTMLUListElement;
const inputBusqueda = document.getElementById(
  "input-busqueda"
) as HTMLInputElement;

// Estado global del filtrado: categoría seleccionada y texto de búsqueda
let categoriaSeleccionada: number | null = null;
let textoBusqueda: string = "";

// Actualiza el badge del carrito en el header sumando las cantidades de todos los items
function actualizarContadorCarrito(): void {
  const count = document.getElementById("cart-count") as HTMLSpanElement;
  const items = getCartItems();
  const total = items.reduce((acc, item) => acc + item.cantidad, 0);
  count.textContent = String(total);
}

// Renderiza dinámicamente las tarjetas de producto en el catálogo
function renderProductos(productos: Product[]): void {
  productosContainer.innerHTML = "";

  // Si no hay resultados se muestra un mensaje informativo al usuario
  if (productos.length === 0) {
    productosContainer.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  productos.forEach((producto) => {
    const card = document.createElement("article");
    card.classList.add("producto-card");
    card.innerHTML = `
      <img src="/${producto.imagen}" alt="${producto.nombre}" class="producto-img" />
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
    // Al hacer click se agrega el producto al carrito, se actualiza el contador
    // y se da feedback visual cambiando el texto y color del botón temporalmente
    btnAgregar.addEventListener("click", () => {
      addToCart(producto);
      actualizarContadorCarrito();
      btnAgregar.textContent = "✓ Agregado";
      btnAgregar.style.backgroundColor = "#c17f24";
      // Después de 1.5 segundos el botón vuelve a su estado original
      setTimeout(() => {
        btnAgregar.textContent = "+ Agregar";
        btnAgregar.style.backgroundColor = "";
      }, 1500);
    });

    productosContainer.appendChild(card);
  });
}

// Renderiza el menú lateral de categorías dinámicamente desde los datos
function renderCategorias(categorias: ICategory[]): void {
  listaCategorias.innerHTML = "";

  // Se agrega primero el botón "Todas" que resetea el filtro de categoría
  const liTodas = document.createElement("li");
  liTodas.innerHTML = `<button type="button" class="btn-categoria activa">Todas</button>`;
  liTodas.querySelector("button")!.addEventListener("click", () => {
    categoriaSeleccionada = null;
    actualizarActiva(liTodas);
    aplicarFiltros();
  });
  listaCategorias.appendChild(liTodas);

  // Se crea un botón por cada categoría disponible
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

// Marca visualmente como activo el botón de categoría seleccionado
// y quita la clase activa de todos los demás
function actualizarActiva(liActivo: HTMLLIElement): void {
  document.querySelectorAll(".btn-categoria").forEach((btn) => {
    btn.classList.remove("activa");
  });
  liActivo.querySelector("button")!.classList.add("activa");
}

// Aplica los filtros activos (categoría y/o búsqueda) sobre el array de productos
// y re-renderiza el catálogo con los resultados
function aplicarFiltros(): void {
  let productos = PRODUCTS;

  // Filtro por categoría: solo muestra productos que pertenecen a la categoría seleccionada
  if (categoriaSeleccionada !== null) {
    productos = productos.filter((p) =>
      p.categorias.some((c: ICategory) => c.id === categoriaSeleccionada)
    );
  }

  // Filtro por nombre: búsqueda parcial e insensible a mayúsculas/minúsculas
  if (textoBusqueda.trim() !== "") {
    productos = productos.filter((p) =>
      p.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
    );
  }

  renderProductos(productos);
}

// Inicialización: se renderizan categorías, productos y el contador del carrito al cargar la página
renderCategorias(getCategories());
renderProductos(PRODUCTS);
actualizarContadorCarrito();

// Listener del buscador: aplica los filtros en tiempo real mientras el usuario escribe
inputBusqueda.addEventListener("input", (e) => {
  textoBusqueda = (e.target as HTMLInputElement).value;
  aplicarFiltros();
});