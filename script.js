// ================================
// REGISTRO
// ================================
function registrarUsuario() {
  let nombre = regNombre.value.trim();
  let correo = regCorreo.value.trim();
  let clave = regClave.value.trim();

  errorRegNombre.textContent = "";
  errorRegCorreo.textContent = "";
  errorRegClave.textContent = "";
  errorRegistroGeneral.textContent = "";

  let valido = true;

  if (nombre.length < 3) {
    errorRegNombre.textContent = "El nombre debe tener mínimo 3 letras";
    valido = false;
  }

  if (!correo.includes("@") || !correo.includes(".")) {
    errorRegCorreo.textContent = "Correo inválido";
    valido = false;
  }

  if (clave.length < 5) {
    errorRegClave.textContent = "La contraseña debe tener mínimo 5 caracteres";
    valido = false;
  }

  if (!valido) return;

  let usuario = { nombre, correo, clave };
  localStorage.setItem("usuario", JSON.stringify(usuario));
  sessionStorage.setItem("sesion", "activa");

  mostrarUsuario();
  location.href = "dashboard.html";
}

// ================================
// LOGIN
// ================================
function iniciarSesion() {
  let correo = loginCorreo.value.trim();
  let clave = loginClave.value.trim();

  errorLoginCorreo.textContent = "";
  errorLoginClave.textContent = "";
  errorLoginGeneral.textContent = "";

  let valido = true;

  if (!correo.includes("@")) {
    errorLoginCorreo.textContent = "Correo inválido";
    valido = false;
  }

  if (clave.length < 5) {
    errorLoginClave.textContent = "Contraseña inválida";
    valido = false;
  }

  if (!valido) return;

  let usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    errorLoginGeneral.textContent = "No hay usuarios registrados";
    return;
  }

  if (correo === usuario.correo && clave === usuario.clave) {
    sessionStorage.setItem("sesion", "activa");
    location.href = "dashboard.html";
  } else {
    errorLoginGeneral.textContent = "Correo o contraseña incorrectos";
  }
}

// ================================
// MOSTRAR USUARIO
// ================================
function mostrarUsuario() {
  let sesion = sessionStorage.getItem("sesion");
  let usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!zonaUsuario || !botonesLogin) return;

  if (sesion === "activa" && usuario) {
    zonaUsuario.innerHTML = `
      <span class="text-danger fw-bold me-2">${usuario.nombre}</span>
      <button class="btn btn-sm btn-outline-danger" onclick="cerrarSesion()">Salir</button>
    `;
    botonesLogin.style.display = "none";
  } else {
    zonaUsuario.innerHTML = "";
    botonesLogin.style.display = "block";
  }
}

// ================================
// CERRAR SESIÓN
// ================================
function cerrarSesion() {
  sessionStorage.removeItem("sesion");
  location.reload();
}

document.addEventListener("DOMContentLoaded", mostrarUsuario);
