document.addEventListener("DOMContentLoaded", function () {
  const FILAS = 3;
  const COLUMNAS = 3;
  const BLANK_SRC =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  let turnos = 0;
  let segundos = 0;
  let timerInterval = null;
  let mosaicoArrastrado = null;
  let blankTile = null;

  const carpetas = ["asturias", "doraemon", "paisaje", "puente"];

  function seleccionarCarpeta() {
    return carpetas[Math.floor(Math.random() * carpetas.length)];
  }

  // Fisher-Yates shuffle (distribución uniforme)
  function mezclarArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function formatTime(s) {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  function iniciarTimer() {
    if (timerInterval) clearInterval(timerInterval);
    segundos = 0;
    document.querySelector(".tiempo").textContent = "00:00";
    timerInterval = setInterval(() => {
      segundos++;
      document.querySelector(".tiempo").textContent = formatTime(segundos);
    }, 1000);
  }

  function verificarVictoria() {
    const piezas = [...document.querySelectorAll(".tablero img")];
    for (let i = 0; i < piezas.length - 1; i++) {
      if (piezas[i].dataset.piece !== String(i + 1)) return false;
    }
    return piezas[piezas.length - 1].dataset.piece === "blank";
  }

  function intentarMover(mosaico) {
    if (!mosaico || mosaico === blankTile) return;

    const [r, c] = mosaico.id.split("-").map(Number);
    const [rb, cb] = blankTile.id.split("-").map(Number);

    const esAdyacente =
      (r === rb && Math.abs(c - cb) === 1) ||
      (c === cb && Math.abs(r - rb) === 1);

    if (!esAdyacente) return;

    // Intercambiar contenido visual y lógico entre mosaico y pieza vacía
    const tmpSrc = mosaico.src;
    const tmpPiece = mosaico.dataset.piece;
    const tmpAlt = mosaico.alt;

    mosaico.src = BLANK_SRC;
    mosaico.dataset.piece = "blank";
    mosaico.classList.add("blank");
    mosaico.draggable = false;
    mosaico.alt = "";

    blankTile.src = tmpSrc;
    blankTile.dataset.piece = tmpPiece;
    blankTile.classList.remove("blank");
    blankTile.draggable = true;
    blankTile.alt = tmpAlt;

    blankTile = mosaico;

    turnos++;
    document.querySelector(".turno").textContent = turnos;

    if (verificarVictoria()) {
      clearInterval(timerInterval);
      setTimeout(() => {
        alert(
          `¡Puzzle resuelto en ${turnos} movimientos y ${formatTime(segundos)}!`
        );
      }, 150);
    }
  }

  function iniciarJuego() {
    turnos = 0;
    document.querySelector(".turno").textContent = "0";

    tablero.innerHTML = "";

    const carpetaSeleccionada = seleccionarCarpeta();
    const piezas = mezclarArray([
      "1", "2", "3", "4", "5", "6", "7", "8", "blank",
    ]);

    for (let r = 0; r < FILAS; r++) {
      for (let c = 0; c < COLUMNAS; c++) {
        const pieza = piezas[r * COLUMNAS + c];
        const mosaico = document.createElement("img");
        mosaico.id = `${r}-${c}`;
        mosaico.dataset.piece = pieza;

        if (pieza === "blank") {
          mosaico.src = BLANK_SRC;
          mosaico.classList.add("blank");
          mosaico.alt = "";
          mosaico.draggable = false;
          blankTile = mosaico;
        } else {
          mosaico.src = `./imagenes/${carpetaSeleccionada}/${pieza}.jpg`;
          mosaico.alt = `Pieza ${pieza}`;
          mosaico.draggable = true;
        }

        // Solo dragstart en cada pieza para identificar cuál se arrastra
        mosaico.addEventListener("dragstart", function (e) {
          mosaicoArrastrado = this;
          e.dataTransfer.effectAllowed = "move";
        });
        mosaico.addEventListener("dragend", () => {
          mosaicoArrastrado = null;
        });

        // Soporte táctil: toca una pieza adyacente al hueco para deslizarla
        mosaico.addEventListener(
          "touchend",
          function (e) {
            e.preventDefault();
            intentarMover(this);
          },
          { passive: false }
        );

        tablero.append(mosaico);
      }
    }

    iniciarTimer();
  }

  const tablero = document.querySelector(".tablero");

  // Drag delegado al contenedor — se registra una sola vez
  tablero.addEventListener("dragover", (e) => e.preventDefault());
  tablero.addEventListener("drop", (e) => {
    e.preventDefault();
    if (mosaicoArrastrado) intentarMover(mosaicoArrastrado);
  });

  document.querySelector(".reiniciar").addEventListener("click", iniciarJuego);
  iniciarJuego();
});

