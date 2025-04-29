// ==== USUARIO PROFESOR ====
const usuarios = [{ usuario: "profesor", clave: "abcd" }];

// ==== LOGIN ====
function login() {
  const user = document.getElementById('usuario').value.trim();
  const pass = document.getElementById('clave').value.trim();
  const encontrado = usuarios.find(u => u.usuario === user && u.clave === pass);

  if (encontrado) {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('plataforma').classList.remove('hidden');
    mostrar('actividad');
  } else {
    document.getElementById('error').innerText = "Usuario o contraseña incorrectos.";
  }
}

// ==== MENÚ DE SECCIONES ====
function mostrar(seccion) {
  const contenido = document.getElementById('contenido');
  contenido.innerHTML = '';

  if (seccion === 'actividad') contenido.innerHTML = generarActividad();
  if (seccion === 'tareas') contenido.innerHTML = generarPublicarTareas();
  if (seccion === 'notas') contenido.innerHTML = generarNotas();
  if (seccion === 'asistencia') contenido.innerHTML = generarAsistencia();
  if (seccion === 'tutorias') contenido.innerHTML = mostrarTutoriasReservadas();
  if (seccion === 'extras') window.location.href = 'profesor_extras.html'; // 👉 Lleva a la página de Extras
}

// ==== ACTIVIDAD: Revisar Entregas ====
function generarActividad() {
  let entregas = JSON.parse(localStorage.getItem('entregasAcademix')) || [];
  if (entregas.length === 0) return '<h2>Actividad</h2><p>No hay entregas aún.</p>';

  let html = '<h2>Entregas de Estudiantes</h2><div class="lista-tareas">';
  entregas.forEach((e, index) => {
    html += `
      <div class="tarea-card">
        <h4>${e.tarea}</h4>
        <p>Materia: ${e.materia}</p>
        <p>Estudiante: ${e.estudiante}</p>
        <p>Archivo Entregado: ${e.archivoNombre}</p>
        <input type="number" id="nota-${index}" placeholder="Nota (0-100)">
        <button onclick="calificarEntrega(${index})">💾 Guardar Nota</button>
      </div>
    `;
  });
  html += '</div>';
  return html;
}

function calificarEntrega(index) {
  let entregas = JSON.parse(localStorage.getItem('entregasAcademix')) || [];
  const nota = document.getElementById(`nota-${index}`).value;
  entregas[index].nota = nota;
  localStorage.setItem('entregasAcademix', JSON.stringify(entregas));
  alert('✅ Nota guardada.');
  mostrar('actividad');
}

// ==== PUBLICAR TAREAS ====
function generarPublicarTareas() {
  return `
    <h2>Publicar Nueva Tarea</h2>
    <select id="materiaTarea">
      <option value="Matemáticas">Matemáticas</option>
      <option value="Español">Español</option>
      <option value="Sociales">Sociales</option>
      <option value="Naturales">Naturales</option>
    </select><br><br>
    <input type="text" id="tituloTarea" placeholder="Título de la Tarea"><br>
    <input type="date" id="fechaEntrega"><br>
    <input type="file" id="archivoTarea"><br><br>
    <button onclick="publicarTarea()">📤 Publicar Tarea</button>
  `;
}

function publicarTarea() {
  const materia = document.getElementById('materiaTarea').value;
  const titulo = document.getElementById('tituloTarea').value;
  const fecha = document.getElementById('fechaEntrega').value;
  const archivo = document.getElementById('archivoTarea').files[0]?.name || "Sin archivo";

  let tareas = JSON.parse(localStorage.getItem('tareasAcademix')) || [];
  tareas.push({ materia, titulo, fecha, archivo });
  localStorage.setItem('tareasAcademix', JSON.stringify(tareas));
  alert('✅ Tarea publicada.');
  mostrar('tareas');
}

// ==== NOTAS: DIGITAR O SUBIR DESDE EXCEL ====
function generarNotas() {
  return `
    <h2>Registrar Notas</h2>
    <button onclick="agregarFilaNotas()">➕ Agregar Estudiante</button>
    <table id="tablaNotas">
      <thead>
        <tr>
          <th>Estudiante</th>
          <th>Matemáticas</th>
          <th>Español</th>
          <th>Sociales</th>
          <th>Naturales</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input placeholder="Nombre"></td>
          <td><input type="number" min="0" max="100"></td>
          <td><input type="number" min="0" max="100"></td>
          <td><input type="number" min="0" max="100"></td>
          <td><input type="number" min="0" max="100"></td>
        </tr>
      </tbody>
    </table><br>
    <button onclick="guardarNotas()">💾 Guardar Notas</button><br><br>

    <h3>Subir Notas desde Excel (simulado)</h3>
    <input type="file" id="archivoExcel" accept=".xlsx, .xls"><br><br>
    <button onclick="simularCargaExcel()">📂 Cargar Archivo</button>
  `;
}

function agregarFilaNotas() {
  const tabla = document.getElementById('tablaNotas').querySelector('tbody');
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td><input placeholder="Nombre"></td>
    <td><input type="number" min="0" max="100"></td>
    <td><input type="number" min="0" max="100"></td>
    <td><input type="number" min="0" max="100"></td>
    <td><input type="number" min="0" max="100"></td>
  `;
  tabla.appendChild(fila);
}

function guardarNotas() {
  const filas = document.querySelectorAll('#tablaNotas tbody tr');
  const notas = [];

  filas.forEach(fila => {
    const inputs = fila.querySelectorAll('input');
    notas.push({
      estudiante: inputs[0].value,
      matematicas: inputs[1].value,
      espanol: inputs[2].value,
      sociales: inputs[3].value,
      naturales: inputs[4].value
    });
  });

  localStorage.setItem('notasAcademix', JSON.stringify(notas));
  alert('✅ Notas guardadas exitosamente.');
}

function simularCargaExcel() {
  alert('📂 Simulación: Archivo cargado. (Esta función real requiere backend o librerías como SheetJS)');
}

// ==== ASISTENCIA ====
function generarAsistencia() {
  return `
    <h2>Registrar Asistencia</h2>
    <button onclick="agregarFilaAsistencia()">➕ Agregar Estudiante</button>
    <table id="tablaAsistencia">
      <thead>
        <tr>
          <th>Estudiante</th>
          <th>Fecha</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input placeholder="Nombre del estudiante"></td>
          <td><input type="date"></td>
          <td>
            <select>
              <option value="Presente">Presente</option>
              <option value="Ausente">Ausente</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table><br>
    <button onclick="guardarAsistencia()">💾 Guardar Asistencia</button>
  `;
}

function agregarFilaAsistencia() {
  const tabla = document.getElementById('tablaAsistencia').querySelector('tbody');
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td><input placeholder="Nombre del estudiante"></td>
    <td><input type="date"></td>
    <td>
      <select>
        <option value="Presente">Presente</option>
        <option value="Ausente">Ausente</option>
      </select>
    </td>
  `;
  tabla.appendChild(fila);
}

function guardarAsistencia() {
  const filas = document.querySelectorAll('#tablaAsistencia tbody tr');
  const asistencia = [];

  filas.forEach(fila => {
    const inputs = fila.querySelectorAll('input, select');
    asistencia.push({
      estudiante: inputs[0].value,
      fecha: inputs[1].value,
      estado: inputs[2].value
    });
  });

  localStorage.setItem('asistenciaAcademix', JSON.stringify(asistencia));
  alert('✅ Asistencia registrada.');
}

// ==== TUTORÍAS RESERVADAS ====
function mostrarTutoriasReservadas() {
  let tutorias = JSON.parse(localStorage.getItem('tutoriasReservadasAcademix')) || [];
  if (tutorias.length === 0) return '<h2>Tutorías Reservadas</h2><p>No hay reservas aún.</p>';

  let html = '<h2>Tutorías Reservadas</h2><div class="lista-tareas">';
  tutorias.forEach(t => {
    html += `
      <div class="tarea-card">
        <h4>${t.materia}</h4>
        <p><strong>Reservado por:</strong> ${t.padre}</p>
      </div>
    `;
  });
  html += '</div>';
  return html;
}
