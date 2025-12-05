(function () {

  const LLAVE_SESION = "sesion";
  const LLAVE_USUARIO = "usuario";

  function redirectToIndex() {
    location.replace("index.html");
  }

  function init() {

    const sesion = sessionStorage.getItem(LLAVE_SESION);

    if (sesion !== "activa") {
      redirectToIndex();
      return;
    }

    let usuario;
    try {
      usuario = JSON.parse(localStorage.getItem(LLAVE_USUARIO));
    } catch {
      sessionStorage.removeItem(LLAVE_SESION);
      redirectToIndex();
      return;
    }

    if (!usuario) {
      redirectToIndex();
      return;
    }

    document.getElementById("usuario-nombre").textContent = usuario.nombre;
    document.getElementById("info-privada").textContent =
      "Este contenido sólo es visible para usuarios autenticados.";
    document.getElementById("email-privado").textContent =
      "Email: " + usuario.correo;

    document.getElementById("btn-logout").addEventListener("click", () => {
      sessionStorage.removeItem(LLAVE_SESION);
      redirectToIndex();
    });

    document.getElementById("btn-delete").addEventListener("click", () => {
      const confirmar = confirm("¿Seguro que deseas eliminar tu cuenta?");
      if (!confirmar) return;

      localStorage.removeItem(LLAVE_USUARIO);
      sessionStorage.removeItem(LLAVE_SESION);
      redirectToIndex();
    });

    document.getElementById("btn-volver").addEventListener("click", () => {
      location.href = "index.html";
    });
  }

  document.addEventListener("DOMContentLoaded", init);

})();
