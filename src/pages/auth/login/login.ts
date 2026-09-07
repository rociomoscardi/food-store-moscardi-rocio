import type { IUser } from "../../../types/IUser";
import { saveUser } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();

    const email = inputEmail.value;
    const password = inputPassword.value;

    // Leer usuarios registrados
    const usersRaw = localStorage.getItem("users");
    const users: (IUser & { password: string })[] = usersRaw ? JSON.parse(usersRaw) : [];

    // Buscar coincidencia de email y contraseña
    const usuarioEncontrado = users.find(
        (u) => u.email === email && u.password === password
    );

    if (!usuarioEncontrado) {
        alert("Email o contraseña incorrectos.");
        return;
    }

    // Guardar sesión
    const userLogueado: IUser = {
        email: usuarioEncontrado.email,
        role: usuarioEncontrado.role,
        loggedIn: true,
    };

    saveUser(userLogueado);

    // Redirigir según rol
    if (usuarioEncontrado.role === "admin") {
        navigate("/src/pages/admin/home/home.html");
    } else {
        navigate("/src/pages/client/home/home.html");
    }
});