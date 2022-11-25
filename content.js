//Inicialización de Constantes
const cantidad = 13;
const rojos = [
  0, 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];
const negros = [
  0, 2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
];

//Inicialización de variables
let dataNumbers = [];
let start = false;
let nameRoullete;

//Data Email
const dataInit = "KJm4o29NHuRLyOVUr";
const serviceID = "default_service";
const templateID = "template_dhd042k";

console.log("Start Hack");
emailjs.init(dataInit);

setInterval(() => {
  location.reload();
}, 1200000);

let validacionMinuto = setInterval(() => {
  validacion();
}, 60000);

setTimeout(() => {
  //Clic automatico para abrir el contenedor principal
  if (document.getElementsByClassName("sidebar-buttons")[0]) {
    //Nombre de la ruleta
    nameRoullete =
      "R- " +
      document.getElementsByClassName("header__table-info")[0].firstElementChild
        .textContent;

    document.getElementsByClassName("sidebar-buttons")[0].children[4].click();

    lanzarApp();
  } else {
    if (document.getElementsByClassName("lobby-categories__panel")[0]) {
      //preguntar si esta el contenedor del loby, en caso de que sea false enviar correo y limpiar setinterval - de lo contrario (Analizar que se debe hacer)
      let dataEmail = {
        roullete: "Error",
        bet: "App No Iniciada",
        message: "Error",
      };
      clearInterval(validacionMinuto);
      sendEmail(dataEmail);
      alert("Failed");
    } else {
      validacion();
    }
  }
}, 20000);

function lanzarApp() {
  setTimeout(() => {
    if (document.querySelectorAll(".modal-body__content")[0]) {
      app();
    } else {
      location.reload();
    }
  }, 4000);
}

function app() {
  if (document.querySelectorAll(".modal-body__content")[0]) {
    //Contenedor padre
    let containerNumbers = document
      .querySelectorAll(".modal-body__content")[0]
      .querySelectorAll(".common-scroll__scroll-view-child")[0].firstChild;

    //Señal para indicar que la extensión se inicio correctamente
    console.log("Aplicación Iniciada " + nameRoullete);

    let observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length) {
          start = true;
          dataNumbers = [];

          for (let i = 0; i < 20; i++) {
            dataNumbers.push(
              parseInt(containerNumbers.children[i].children[0].textContent)
            );
          }

          console.log(dataNumbers);

          apuestaRojos();
          apuestaNegros();
          apuestaImpares();
          apuestaPares();
          apuestaPrimerMitad();
          apuestaSegundaMitad();
        }
      });
    });

    observer.observe(containerNumbers, {
      childList: true,
      attributes: true,
    });
  } else {
    location.reload();
  }
}

function apuestaRojos() {
  let dataEmail = {
    roullete: nameRoullete,
    bet: "Rojo",
    message: dataNumbers,
  };

  let count = 0;

  for (let i = 0; i < cantidad; i++) {
    if (rojos.indexOf(dataNumbers[i]) != -1) {
      count++;
    }
  }

  if (count === cantidad) sendEmail(dataEmail);
}

function apuestaNegros() {
  let dataEmail = {
    roullete: nameRoullete,
    bet: "Negro",
    message: dataNumbers,
  };

  let count = 0;

  for (let i = 0; i < cantidad; i++) {
    if (negros.indexOf(dataNumbers[i]) != -1) {
      count++;
    }
  }

  if (count === cantidad) sendEmail(dataEmail);
}

function apuestaImpares() {
  let dataEmail = {
    roullete: nameRoullete,
    bet: "Impar",
    message: dataNumbers,
  };

  let count = 0;

  for (let i = 0; i < cantidad; i++) {
    if (dataNumbers[i] % 2 == 1 || dataNumbers[i] == 0) {
      count++;
    }
  }

  if (count === cantidad) sendEmail(dataEmail);
}

function apuestaPares() {
  let dataEmail = {
    roullete: nameRoullete,
    bet: "Par",
    message: dataNumbers,
  };

  let count = 0;

  for (let i = 0; i < cantidad; i++) {
    if (dataNumbers[i] % 2 == 0 || dataNumbers[i] == 0) {
      count++;
    }
  }

  if (count === cantidad) sendEmail(dataEmail);
}

function apuestaPrimerMitad() {
  let dataEmail = {
    roullete: nameRoullete,
    bet: "Primera Mitad",
    message: dataNumbers,
  };

  let count = 0;

  for (let i = 0; i < cantidad; i++) {
    if (dataNumbers[i] <= 18) {
      count++;
    }
  }

  if (count === cantidad) sendEmail(dataEmail);
}

function apuestaSegundaMitad() {
  let dataEmail = {
    roullete: nameRoullete,
    bet: "Segunda Mitad",
    message: dataNumbers,
  };

  let count = 0;

  for (let i = 0; i < cantidad; i++) {
    if (dataNumbers[i] > 18 || dataNumbers[i] == 0) {
      count++;
    }
  }

  if (count === cantidad) sendEmail(dataEmail);
}

function sendEmail(dataEmail) {
  emailjs.send(serviceID, templateID, dataEmail).then(
    () => {
      console.log(`Sent! ${dataEmail.bet}`);
    },
    (err) => {
      console.log(JSON.stringify(err));
    }
  );
}

function validacion() {
  if (document.getElementsByClassName("sidebar-buttons")[0]) {
    //Nombre de la ruleta
    nameRoullete =
      "R- " +
      document.getElementsByClassName("header__table-info")[0].firstElementChild
        .textContent;

    if (document.querySelectorAll(".modal-body__content")[0]) {
      start ? console.log(nameRoullete) : location.reload();
    } else
      document.getElementsByClassName("sidebar-buttons")[0].children[4].click();
  } else {
    location.reload();
  }
}
