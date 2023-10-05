let ceroMin, ceroSeg;

function funcionPrueba() {
  let min = 0;
  let seg = 0;

  temporizadorJuego = setInterval(() => {
    seg++;

    if (seg == 60) {
      min++;
      seg = 0;

      let dataStorage = JSON.parse(
        localStorage.getItem(`${nameRoullete} - ${fecha.toLocaleDateString()}`)
      );

      dataStorage.tiempo++;

      localStorage.setItem(
        `${nameRoullete} - ${fecha.toLocaleDateString()}`,
        JSON.stringify(dataStorage)
      );
    }
    // console.log(
    //   `Tiempo transcurrido: ${(ceroMin = min < 10 ? 0 : "")}${min}:${
    //     seg < 10 ? (seg = `0${seg}`) : seg
    //   }`
    // );
  }, 1000);
}
