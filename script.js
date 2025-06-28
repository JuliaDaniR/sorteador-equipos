const equipos = [
  { nombre: "Sith", clase: "sith" },
  { nombre: "Jedi", clase: "jedi" },
  { nombre: "Mandalorians", clase: "mandalorians" },
  { nombre: "Rebels", clase: "rebels" },
  { nombre: "Inquisitorius", clase: "inquisitorius" },
  { nombre: "Stormtrooper", clase: "stormtrooper" },
  { nombre: "Bad Batch", clase: "bad-batch" },
  { nombre: "Woofiees", clase: "woofiees" },
];

let yaSorteado = false;

function shuffle(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function sortearOrden() {
  if (yaSorteado) return;

  yaSorteado = true;
  const sonido = document.getElementById("sonido");
  const resultado = document.getElementById("resultado");
  const boton = document.getElementById("btnSortear");
  const mensaje = document.getElementById("mensajeFinal");

  boton.disabled = true;
  const ordenSorteado = shuffle(equipos);
  let index = 0;

  // 🔁 Reproducir el sonido en bucle
  sonido.loop = true;
  try {
    sonido.currentTime = 0;
    sonido.play().catch(() => {
      console.warn("Sonido no pudo reproducirse automáticamente.");
    });
  } catch (e) {
    console.warn("Error de sonido:", e);
  }

  resultado.textContent = "¡Preparando el orden... 🚀";
  resultado.style.color = "";

  const intervalo = setInterval(() => {
    if (index >= ordenSorteado.length) {
      clearInterval(intervalo);

      // 🛑 Detener el sonido en bucle
      sonido.pause();
      sonido.currentTime = 0;
      sonido.loop = false;

      resultado.textContent = "¡Orden definido!";
      resultado.style.color = "gold";

      mensaje.classList.remove("mensaje-oculto");
      mensaje.classList.add("visible");

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });

      return;
    }

    const equipoActual = ordenSorteado[index];
    resultado.textContent = `➡ ${equipoActual.nombre}`;
    resultado.className = equipoActual.clase;

    const slot = document.querySelector(`#pos-${index + 1} span`);
    slot.textContent = equipoActual.nombre;
    slot.className = equipoActual.clase;

    index++;
  }, 2500);
}


