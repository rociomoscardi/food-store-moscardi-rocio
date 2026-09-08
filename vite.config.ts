import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // Registro de todas las páginas HTML del proyecto para incluirlas en el build.
        // Sin este registro, Vite no las incluye y no se pueden navegar correctamente.
        index: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "src/pages/auth/login/login.html"),
        registro: resolve(__dirname, "src/pages/auth/registro/registro.html"),
        adminHome: resolve(__dirname, "src/pages/admin/home/home.html"),
        clientHome: resolve(__dirname, "src/pages/client/home/home.html"),
        clientCart: resolve(__dirname, "src/pages/client/cart/cart.html"),
      },
    },
  },
  base: "./",
});