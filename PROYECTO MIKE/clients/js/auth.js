const CODIGO_CHECADOR = "12345"; // Código de seguridad para checador
let users = [];

function accederChecador() {
  const codigo = document.getElementById("codigo-checador").value.trim();
  if (codigo === CODIGO_CHECADOR) {
    alert("Acceso concedido al Checador ✅");
    localStorage.setItem("token", "checador");
    window.location.href = "checador.html";
  } else {
    alert("Código incorrecto. Inténtalo de nuevo.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  async function cargarUsuarios() {
    try {
      const response = await fetch("/data/users.json");
      users = await response.json();
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      alert("No se pudieron cargar los usuarios.");
    }
  }

  function login(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Por favor, ingresa tu usuario y contraseña.");
      return;
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("token", username);
      alert("Inicio de sesión exitoso ✅");
      if (user.type === "estudiante") {
        window.location.href = "estudiante.html";
      } else if (user.type === "maestro") {
        window.location.href = "maestro.html";
      }
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  }

  document.getElementById("user-type").addEventListener("change", function () {
    const tipo = this.value;
    document.getElementById("login-section").classList.toggle("hidden", tipo !== "estudiante" && tipo !== "maestro");
    document.getElementById("checador-section").classList.toggle("hidden", tipo !== "checador");
  });

  const loginForm = document.getElementById("login-form");
  if (loginForm) loginForm.addEventListener("submit", login);

  document.getElementById("btn-checador").addEventListener("click", accederChecador);

  cargarUsuarios();
});