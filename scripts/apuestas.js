function apuestaRojos() {
  let count = 0;

  for (let i = 0; i < cantidad; i++) {
    if (rojoNum.indexOf(dataNumbers[i]) != -1) {
      count++;
      cargarLocalStorage(count, (bet = "rojo"));
    } else {
      if (count >= cantNotif) {
        sendNotification((bet = "rojo"), count);
      }
      return;
    }
  }
}

function apuestaNegros() {
  let count = 0;

  for (let i = 0; i < cantidad; i++) {
    if (negrosNum.indexOf(dataNumbers[i]) != -1) {
      count++;
      cargarLocalStorage(count, (bet = "negro"));
    } else {
      if (count >= cantNotif) {
        sendNotification((bet = "negro"), count);
      }
      return;
    }
  }
}

function apuestaImpares() {
  let count = 0;

  for (let i = 0; i < cantidad; i++) {
    if (dataNumbers[i] % 2 == 1 || dataNumbers[i] == 0) {
      count++;
      cargarLocalStorage(count, (bet = "impares"));
    } else {
      if (count >= cantNotif) {
        sendNotification((bet = "impares"), count);
      }
      return;
    }
  }
}

function apuestaPares() {
  let count = 0;

  for (let i = 0; i < cantidad; i++) {
    if (dataNumbers[i] % 2 == 0 || dataNumbers[i] == 0) {
      count++;
      cargarLocalStorage(count, (bet = "pares"));
    } else {
      if (count >= cantNotif) {
        sendNotification((bet = "pares"), count);
      }
      return;
    }
  }
}

function apuestaPrimerMitad() {
  let count = 0;

  for (let i = 0; i < cantidad; i++) {
    if (dataNumbers[i] <= 18) {
      count++;
      cargarLocalStorage(count, (bet = "primeraMitad"));
    } else {
      if (count >= cantNotif) {
        sendNotification((bet = "primeraMitad"), count);
      }
      return;
    }
  }
}

function apuestaSegundaMitad() {
  let count = 0;

  for (let i = 0; i < cantidad; i++) {
    if (dataNumbers[i] > 18 || dataNumbers[i] == 0) {
      count++;
      cargarLocalStorage(count, (bet = "segundaMitad"));
    } else {
      if (count >= cantNotif) {
        sendNotification((bet = "segundaMitad"), count);
      }
      return;
    }
  }
}
