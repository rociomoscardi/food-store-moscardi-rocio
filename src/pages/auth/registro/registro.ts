import type { IUser } from "../../../types/IUser";
import { Rol } from "../../../types/Rol";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();

    const email = inputEmail.value;
    const password = inputPassword.value;

    // Leer usuarios existentes o array vacío
    const usersRaw = localStorage.getItem("users");
    const users: (IUser & { password: string })[] = usersRaw ? JSON.parse(usersRaw) : [];

    // Verificar si el email ya existe
    const existe = users.find((u) => u.email === email);
    if (existe) {
        alert("Ya existe un usuario con ese email.");
        return;
    }

    // Crear nuevo usuario con rol client por defecto
    const nuevoUsuario: IUser & { password: string } = {
        email,
        password,
        role: Rol.client,
        loggedIn: false,
    };

    users.push(nuevoUsuario);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Usuario registrado correctamente.");
    window.location.href = "/src/pages/auth/login/login.html";
});