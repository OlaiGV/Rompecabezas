window.onload = function () {
  const filas = 3;
  const columnas = 3;
  let imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let turnos = 0;
  let mosaicoActual, otroMosaico; // Declarar las variables aquí

  // Definir las carpetas de imágenes
  let carpetas = ["asturias", "doraemon", "paisaje", "puente"];

  // Función para seleccionar una carpeta al azar
  function seleccionarCarpeta() {
    let index = Math.floor(Math.random() * carpetas.length);
    return carpetas[index];
  }

  // Seleccionar una carpeta
  let carpetaSeleccionada = seleccionarCarpeta();
  console.log(carpetaSeleccionada)

  // Función para mezclar el array
  function mezclarArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Mezclar el array imgOrder
  imgOrder = mezclarArray(imgOrder);

  for (let r = 0; r < filas; r++) {
    for (let c = 0; c < columnas; c++) {
      // Crear una nueva imagen
      let mosaico = document.createElement("img");
      mosaico.id = `${r}-${c}`;
      mosaico.src = `./imagenes/${carpetaSeleccionada}/${imgOrder.pop()}.jpg`;

      // Añadir funcionalidad de arrastrar y soltar
      mosaico.addEventListener("dragstart", iniciarArrastre);
      mosaico.addEventListener("dragover", duranteArrastre);
      mosaico.addEventListener("dragenter", entrarArrastre);
      mosaico.addEventListener("dragleave", salirArrastre);
      mosaico.addEventListener("drop", soltarArrastre);
      mosaico.addEventListener("dragend", finalizarArrastre);

      // Añadir el mosaico al tablero
      document.querySelector(".tablero").append(mosaico);
    }
  }

  console.log(imgOrder); // Imprime el array mezclado

  function iniciarArrastre() {
    mosaicoActual = this; // 'this' se refiere al mosaico de imagen que se está arrastrando
  }

  function duranteArrastre(e) {
    e.preventDefault();
  }

  function entrarArrastre(e) {
    e.preventDefault();
  }

  function salirArrastre() {}

  function soltarArrastre() {
    otroMosaico = this; // 'this' se refiere al mosaico de imagen sobre el que se está soltando
  }

  function finalizarArrastre() {
    if (!otroMosaico.src.includes("3.jpg")) {
      return;
    }

    let coordsActuales = mosaicoActual.id.split("-"); // ej. "0-0" -> ["0", "0"]
    let r = parseInt(coordsActuales[0]);
    let c = parseInt(coordsActuales[1]);

    let otrasCoords = otroMosaico.id.split("-");
    let r2 = parseInt(otrasCoords[0]);
    let c2 = parseInt(otrasCoords[1]);

    let moverIzquierda = r == r2 && c2 == c - 1;
    let moverDerecha = r == r2 && c2 == c + 1;

    let moverArriba = c == c2 && r2 == r - 1;
    let moverAbajo = c == c2 && r2 == r + 1;

    let esAdyacente =
      moverIzquierda || moverDerecha || moverArriba || moverAbajo;

    if (esAdyacente) {
      let imgActual = mosaicoActual.src;
      let otraImg = otroMosaico.src;

      mosaicoActual.src = otraImg;
      otroMosaico.src = imgActual;

      turnos += 1;
      document.querySelector(".turno").innerText = turnos;
    }
  }
};
