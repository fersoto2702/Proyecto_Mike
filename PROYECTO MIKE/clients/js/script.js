document.addEventListener("DOMContentLoaded", function () {
    setupMenu();
    cargarCarreras();
    cargarHorarios();
    cargarProfesores();
    cargarMatriculas();
});

// 🔹 Función para activar los submenús al pasar el mouse
function setupMenu() {
    const menuItems = document.querySelectorAll(".menu > ul > li");

    menuItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            const submenu = item.querySelector(".submenu");
            if (submenu) submenu.style.display = "block";
        });

        item.addEventListener("mouseleave", () => {
            const submenu = item.querySelector(".submenu");
            if (submenu) submenu.style.display = "none";
        });
    });
}

// 🔹 Función de Login con redirección según el rol
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('rol', data.rol);

        alert('Inicio de sesión exitoso');
        
        if (data.rol === "admin") {
            window.location.href = "panel_admin.html";
        } else if (data.rol === "profesor") {
            window.location.href = "lista_profesores.html";
        } else {
            window.location.href = "index.html";
        }
    } else {
        alert(data.message);
    }
}

// 🔹 Función para agregar una nueva carrera
function agregarCarrera() {
    const nombreCarrera = document.getElementById("nombreCarrera").value.trim();
    if (nombreCarrera === "") {
        alert("Por favor, ingresa un nombre válido para la carrera.");
        return;
    }

    const nuevaCarrera = {
        id: Date.now(),
        nombre: nombreCarrera
    };

    let carreras = JSON.parse(localStorage.getItem("carreras")) || [];
    carreras.push(nuevaCarrera);
    localStorage.setItem("carreras", JSON.stringify(carreras));

    document.getElementById("nombreCarrera").value = "";
    cargarCarreras();
}

// 🔹 Función para cargar las carreras en la tabla
function cargarCarreras() {
    const tbody = document.querySelector("#tabla-carreras tbody");
    tbody.innerHTML = "";

    let carreras = JSON.parse(localStorage.getItem("carreras")) || [];

    carreras.forEach(carrera => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${carrera.id}</td>
            <td>${carrera.nombre}</td>
            <td><button class="eliminar" onclick="eliminarCarrera(${carrera.id})">Eliminar</button></td>
        `;
        tbody.appendChild(row);
    });
}

// 🔹 Función para eliminar una carrera
function eliminarCarrera(id) {
    let carreras = JSON.parse(localStorage.getItem("carreras")) || [];
    carreras = carreras.filter(carrera => carrera.id !== id);
    localStorage.setItem("carreras", JSON.stringify(carreras));
    cargarCarreras();
}

// 🔹 Función para agregar horarios
function agregarHorario() {
    const materia = document.getElementById("materia").value.trim();
    const horario = document.getElementById("horario").value.trim();

    if (materia === "" || horario === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const nuevoHorario = {
        id: Date.now(),
        materia,
        horario
    };

    let horarios = JSON.parse(localStorage.getItem("horarios")) || [];
    horarios.push(nuevoHorario);
    localStorage.setItem("horarios", JSON.stringify(horarios));

    document.getElementById("materia").value = "";
    document.getElementById("horario").value = "";
    cargarHorarios();
}

// 🔹 Función para cargar los horarios
function cargarHorarios() {
    const tbody = document.querySelector("#tabla-horarios tbody");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    let horarios = JSON.parse(localStorage.getItem("horarios")) || [];

    horarios.forEach(horario => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${horario.id}</td>
            <td>${horario.materia}</td>
            <td>${horario.horario}</td>
            <td><button class="eliminar" onclick="eliminarHorario(${horario.id})">Eliminar</button></td>
        `;
        tbody.appendChild(row);
    });
}

// 🔹 Función para eliminar un horario
function eliminarHorario(id) {
    let horarios = JSON.parse(localStorage.getItem("horarios")) || [];
    horarios = horarios.filter(horario => horario.id !== id);
    localStorage.setItem("horarios", JSON.stringify(horarios));
    cargarHorarios();
}

// 🔹 Función para cargar la lista de profesores
function cargarProfesores() {
    const tbody = document.querySelector("#tabla-profesores tbody");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    let profesores = JSON.parse(localStorage.getItem("profesores")) || [];

    profesores.forEach(profesor => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${profesor.id}</td>
            <td>${profesor.nombre}</td>
            <td>${profesor.materia}</td>
            <td><button class="eliminar" onclick="eliminarProfesor(${profesor.id})">Eliminar</button></td>
        `;
        tbody.appendChild(row);
    });
}

// 🔹 Función para eliminar un profesor
function eliminarProfesor(id) {
    let profesores = JSON.parse(localStorage.getItem("profesores")) || [];
    profesores = profesores.filter(profesor => profesor.id !== id);
    localStorage.setItem("profesores", JSON.stringify(profesores));
    cargarProfesores();
}

// 🔹 Función para registrar una nueva matrícula
function registrarMatricula() {
    const estudiante = document.getElementById("estudiante").value.trim();
    const carrera = document.getElementById("carrera").value.trim();

    if (estudiante === "" || carrera === "") {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const nuevaMatricula = {
        id: Date.now(),
        estudiante,
        carrera
    };

    let matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];
    matriculas.push(nuevaMatricula);
    localStorage.setItem("matriculas", JSON.stringify(matriculas));

    document.getElementById("estudiante").value = "";
    document.getElementById("carrera").value = "";
    cargarMatriculas();
}

// 🔹 Función para cargar las matrículas en la tabla
function cargarMatriculas() {
    const tbody = document.querySelector("#tabla-matriculas tbody");
    if (!tbody) return;

    tbody.innerHTML = "";
    let matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];

    matriculas.forEach(matricula => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${matricula.id}</td>
            <td>${matricula.estudiante}</td>
            <td>${matricula.carrera}</td>
            <td><button class="eliminar" onclick="eliminarMatricula(${matricula.id})">Eliminar</button></td>
        `;
        tbody.appendChild(row);
    });
}

// 🔹 Función para eliminar una matrícula
function eliminarMatricula(id) {
    let matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];
    matriculas = matriculas.filter(matricula => matricula.id !== id);
    localStorage.setItem("matriculas", JSON.stringify(matriculas));
    cargarMatriculas();
}