const usuarios = [{ usuario: "userspadre", clave: "academix" }];

function login() {
  const user = document.getElementById('usuario').value.trim();
  const pass = document.getElementById('clave').value.trim();
  const encontrado = usuarios.find(u => u.usuario === user && u.clave === pass);

  if (encontrado) {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('plataforma').classList.remove('hidden');
    mostrar('notas');
  } else {
    document.getElementById('error').innerText = "Usuario o contraseña incorrectos.";
  }
}

function mostrar(seccion) {
  const contenido = document.getElementById('contenido');
  contenido.innerHTML = '';

  if (seccion === 'notas') contenido.innerHTML = mostrarNotas();
  if (seccion === 'asistencia') contenido.innerHTML = mostrarAsistencia();
  if (seccion === 'tutorias') contenido.innerHTML = mostrarTutorias();
}

// NOTAS
function mostrarNotas() {
  let notas = JSON.parse(localStorage.getItem('notasAcademix')) || [];
  if (notas.length === 0) return '<h2>Notas</h2><p>No hay notas aún.</p>';

  let html = '<h2>Notas del Estudiante</h2><table><thead><tr><th>Estudiante</th><th>Matemáticas</th><th>Español</th><th>Sociales</th><th>Naturales</th></tr></thead><tbody>';
  notas.forEach(nota => {
    html += `<tr><td>${nota.Estudiante || nota.estudiante}</td><td>${nota.Matematicas || nota.matematicas}</td><td>${nota.Espanol || nota.espanol}</td><td>${nota.Sociales || nota.sociales}</td><td>${nota.Naturales || nota.naturales}</td></tr>`;
  });
  html += '</tbody></table>';
  return html;
}

// ASISTENCIA
function mostrarAsistencia() {
  let asistencia = JSON.parse(localStorage.getItem('asistenciaAcademix')) || [];
  if (asistencia.length === 0) return '<h2>Asistencia</h2><p>No hay registros aún.</p>';

  let html = '<h2>Asistencia</h2><table><thead><tr><th>Estudiante</th><th>Fecha</th><th>Estado</th></tr></thead><tbody>';
  asistencia.forEach(a => {
    html += `<tr><td>${a.estudiante}</td><td>${a.fecha}</td><td>${a.estado}</td></tr>`;
  });
  html += '</tbody></table>';
  return html;
}

// TUTORIAS
function mostrarTutorias() {
  return `
    <h2>Contratar Tutorías</h2>
    <div class="lista-tareas">
      <div class="tarea-card">
        <h4>Inglés</h4>
        <p>Curso intensivo de inglés para niveles básicos e intermedios.</p>
        <p><strong>Precio:</strong> $10 mensual</p>
        <button onclick="reservarTutoria('Inglés')">📚 Reservar Tutoría</button>
      </div>
      <div class="tarea-card">
        <h4>Francés</h4>
        <p>Curso de francés conversacional con tutores nativos.</p>
        <p><strong>Precio:</strong> $10 mensual</p>
        <button onclick="reservarTutoria('Francés')">📚 Reservar Tutoría</button>
      </div>
      <div class="tarea-card">
        <h4>Informática</h4>
        <p>Curso de informática básica y avanzada.</p>
        <p><strong>Precio:</strong> $10 mensual</p>
        <button onclick="reservarTutoria('Informática')">📚 Reservar Tutoría</button>
      </div>
    </div>
  `;
}

function reservarTutoria(materia) {
  let tutorias = JSON.parse(localStorage.getItem('tutoriasReservadasAcademix')) || [];
  tutorias.push({ materia: materia, padre: "Padre" });
  localStorage.setItem('tutoriasReservadasAcademix', JSON.stringify(tutorias));
  alert('✅ Tutoría de ' + materia + ' reservada exitosamente.');
}
 