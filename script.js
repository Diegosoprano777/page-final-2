
function cargarNoticia(id) {
    let titulo = document.getElementById("modalTitulo");
    let texto = document.getElementById("modalTexto");

    if (!titulo || !texto) return;

    if (id === "principal") {
        titulo.innerText = "1 AÑO DE ANARCOLIRYKOZ";
        texto.innerText = "A-Z son rap en estado puro y sin concesiones. Un proyecto que nació en 2022 y que ha conseguido en tan solo un año consolidarse como uno de los referentes del rap underground en español. Con letras afiladas, ritmos contundentes y una actitud rebelde, A-Z ha sabido captar la atención de una audiencia ávida de autenticidad y frescura en la escena musical actual. Su enfoque directo y sin filtros les ha permitido conectar con un público diverso, que valora la honestidad y la pasión que transmiten en cada una de sus canciones. A lo largo de este primer año, A-Z ha demostrado que el rap puede ser una herramienta poderosa para expresar ideas, emociones y realidades sociales, consolidándose como una voz imprescindible en el panorama musical contemporáneo. ¡Felicidades a A-Z por este primer año de éxito y que vengan muchos más!       ";
    }

    if (id === "n1") {
        titulo.innerText = "Red Bull Batalla";
        texto.innerText = "Red Bull celebra 20 años de freestyle donde se reunene muchos mc por el titulo de 20 años en este torneo se enfrentan mcs aczino,fat n,skone,blon,chuache,jonko,stick,errecé entre otros grandes mcs del panorama nacional e internacional.";
    }

    if (id === "n2") {
        titulo.innerText = "Rap y Reggae";
        texto.innerText = `Rap y reggae: dos mundos distintos, pero con el mismo latido.
El rap llega como un golpe seco, directo, una barra que corta el silencio.
El reggae entra suave, como brisa, como un tambor que te abraza y te baja las revoluciones.

Cuando se juntan, nace una energía única: conciencia con ritmo, calle con raíces, fuego con calma.
Es la voz del barrio, del que sueña, del que resiste; es la vibra que te eleva mientras la letra te aterriza.
Rap y reggae: unión perfecta entre la protesta y la paz, entre el corazón que late fuerte y el alma que se mantiene firme.

Dos estilos, una cultura…
Una misma verdad: la música también es revolución.`;
    }
}


function enviarContacto() {
    let form = document.getElementById("formContacto");

    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
    }

    alert("Mensaje enviado correctamente");

    form.reset();
    form.classList.remove("was-validated");

    const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalContacto")
    );
    modal.hide();
}



function registrarUsuario() {
    let nombre = document.getElementById("regNombre").value;
    let correo = document.getElementById("regCorreo").value;
    let clave = document.getElementById("regClave").value;

    if (nombre === "" || correo === "" || clave === "") {
        alert("Completa todos los campos");
        return;
    }

    let usuario = {
        nombre: nombre,
        correo: correo,
        clave: clave
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("sesion", "activa");

    alert("Registro exitoso");

    let modal = bootstrap.Modal.getInstance(
        document.getElementById("modalRegistro")
    );
    modal.hide();

    mostrarUsuario();
}


function iniciarSesion() {
    let correo = document.getElementById("loginCorreo").value;
    let clave = document.getElementById("loginClave").value;

    let usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioGuardado) {
        alert("No hay usuarios registrados");
        return;
    }

    if (
        correo === usuarioGuardado.correo &&
        clave === usuarioGuardado.clave
    ) {
        localStorage.setItem("sesion", "activa");
        alert("Bienvenido " + usuarioGuardado.nombre);

        let modal = bootstrap.Modal.getInstance(
            document.getElementById("modalLogin")
        );
        modal.hide();

        mostrarUsuario();
    } else {
        alert("Datos incorrectos");
    }
}


function mostrarUsuario() {
    let sesion = localStorage.getItem("sesion");
    let usuario = JSON.parse(localStorage.getItem("usuario"));

    let zonaUsuario = document.getElementById("zonaUsuario");
    let botonesLogin = document.getElementById("botonesLogin");

    if (sesion === "activa" && usuario) {
        zonaUsuario.innerHTML = `
            <span class="text-danger fw-bold me-2">
                ${usuario.nombre}
            </span>
            <button class="btn btn-sm btn-outline-danger" onclick="cerrarSesion()">
                Salir
            </button>
        `;

        botonesLogin.style.display = "none";
    } else {
        zonaUsuario.innerHTML = "";
        botonesLogin.style.display = "block";
    }
}


function cerrarSesion() {
    localStorage.removeItem("sesion");
    location.reload();
}


document.addEventListener("DOMContentLoaded", mostrarUsuario);
