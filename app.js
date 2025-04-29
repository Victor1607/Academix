// ==== USUARIO ESTUDIANTE ====
const usuarios = [{ usuario: "estudiante", clave: "1234" }];

// ==== LOGIN ====
function login() {
  const user = document.getElementById('usuario').value.trim();
  const pass = document.getElementById('clave').value.trim();
  const encontrado = usuarios.find(u => u.usuario === user && u.clave === pass);

  if (encontrado) {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('plataforma').classList.remove('hidden');
    mostrar('materias');
  } else {
    document.getElementById('error').innerText = "Usuario o contraseña incorrectos.";
  }
}

// ==== MENÚ DE SECCIONES ====
function mostrar(seccion) {
  const contenido = document.getElementById('contenido');
  contenido.innerHTML = '';

  if (seccion === 'materias') contenido.innerHTML = mostrarMaterias();
  if (seccion === 'tareas') mostrarTareasEstudiante();
  if (seccion === 'notas') mostrarNotasEstudiante();
  if (seccion === 'calendario') mostrarCalendarioEstudiante();
}

// ==== MATERIAS ====
function mostrarMaterias() {
  return `
    <h2>Materias</h2>
    <div class="materias-grid">
      <div class="materia-card"><h3>Matemáticas</h3></div>
      <div class="materia-card"><h3>Español</h3></div>
      <div class="materia-card"><h3>Sociales</h3></div>
      <div class="materia-card"><h3>Naturales</h3></div>
    </div>
  `;
}

// ==== TAREAS PUBLICADAS POR EL PROFESOR ====
function mostrarTareasEstudiante() {
  const contenido = document.getElementById('contenido');
  let tareas = JSON.parse(localStorage.getItem('tareasAcademix')) || [];

  if (tareas.length === 0) {
    contenido.innerHTML = '<h2>Tareas</h2><p>No hay tareas asignadas.</p>';
    return;
  }

  let html = '<h2>Tareas Asignadas</h2><div class="lista-tareas">';
  tareas.forEach((t, index) => {
    html += `
      <div class="tarea-card">
        <h3>${t.titulo}</h3>
        <p><strong>Materia:</strong> ${t.materia}</p>
        <p><strong>Fecha de Entrega:</strong> ${t.fecha}</p>
        <p><strong>Archivo:</strong> ${t.archivo !== "Sin archivo" ? t.archivo : "No se adjuntó archivo"}</p>
        <button onclick="subirEntrega(${index})">📤 Entregar Tarea</button>
      </div>
    `;
  });
  html += '</div>';
  contenido.innerHTML = html;
}

// ==== SUBIR ENTREGA ====
function subirEntrega(index) {
  const archivo = prompt('📝 Escribe el nombre del archivo que vas a entregar (ejemplo: tarea1.docx)');
  if (!archivo) {
    alert('⚠️ No se subió ningún archivo.');
    return;
  }

  let entregas = JSON.parse(localStorage.getItem('entregasAcademix')) || [];
  let tareas = JSON.parse(localStorage.getItem('tareasAcademix')) || [];

  entregas.push({
    tarea: tareas[index].titulo,
    materia: tareas[index].materia,
    estudiante: 'Nombre del estudiante', // Aquí puedes hacer que el login capture nombre real
    archivoNombre: archivo
  });

  localStorage.setItem('entregasAcademix', JSON.stringify(entregas));
  alert('✅ Tarea entregada correctamente.');
}

// ==== NOTAS DEL ESTUDIANTE ====
function mostrarNotasEstudiante() {
  const contenido = document.getElementById('contenido');
  let notas = JSON.parse(localStorage.getItem('notasAcademix')) || [];

  if (notas.length === 0) {
    contenido.innerHTML = '<h2>Notas</h2><p>No hay notas disponibles.</p>';
    return;
  }

  let html = '<h2>Notas</h2><table><thead><tr><th>Estudiante</th><th>Matemáticas</th><th>Español</th><th>Sociales</th><th>Naturales</th></tr></thead><tbody>';
  notas.forEach(nota => {
    html += `
      <tr>
        <td>${nota.estudiante}</td>
        <td>${nota.matematicas}</td>
        <td>${nota.espanol}</td>
        <td>${nota.sociales}</td>
        <td>${nota.naturales}</td>
      </tr>
    `;
  });
  html += '</tbody></table>';
  contenido.innerHTML = html;
}

// ==== CALENDARIO (Placeholder) ====
function mostrarCalendarioEstudiante() {
  const contenido = document.getElementById('contenido');
  contenido.innerHTML = `
    <h2>Calendario de Entregas</h2>
    <p>Próximamente verás aquí las fechas de entregas importantes.</p>
  `;
}
