async function cargarMatriculas() {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/api/matriculas', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const matriculas = await res.json();
    const lista = document.getElementById('lista-matriculas');
    lista.innerHTML = matriculas.map(m => `<li>ID Usuario: ${m.id_usuario}, Carrera: ${m.id_carrera} <button onclick="eliminarMatricula(${m.id})">Eliminar</button></li>`).join('');
  }
  
  async function agregarMatricula() {
    const token = localStorage.getItem('token');
    const id_usuario = document.getElementById('idUsuario').value;
    const id_carrera = document.getElementById('idCarreraMatricula').value;
    await fetch('http://localhost:3000/api/matriculas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ id_usuario, id_carrera })
    });
    cargarMatriculas();
  }
  
  async function eliminarMatricula(id) {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3000/api/matriculas/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    cargarMatriculas();
  }  