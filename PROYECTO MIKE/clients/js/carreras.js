async function cargarCarreras() {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:3000/api/carreras', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const carreras = await res.json();
  
  const tbody = document.querySelector("#tabla-carreras tbody");
  tbody.innerHTML = carreras.map(c => `
    <tr>
      <td>${c.id}</td>
      <td>${c.nombre}</td>
      <td>
        <button onclick="editarCarrera(${c.id})">Editar</button>
        <button onclick="eliminarCarrera(${c.id})">Eliminar</button>
      </td>
    </tr>
  `).join('');
  
  // Actualizar indicadores en el dashboard
  actualizarDashboard();
}

async function agregarCarrera() {
  const token = localStorage.getItem('token');
  const nombre = document.getElementById('nombreCarrera').value;
  
  await fetch('http://localhost:3000/api/carreras', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ nombre })
  });
  
  cargarCarreras();
}

async function eliminarCarrera(id) {
  const token = localStorage.getItem('token');
  
  await fetch(`http://localhost:3000/api/carreras/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  cargarCarreras();
}

// Función para editar (puedes ampliarla para mostrar un formulario de edición)
function editarCarrera(id) {
  // Aquí puedes implementar la lógica para editar una carrera
  alert("Editar carrera " + id);
}