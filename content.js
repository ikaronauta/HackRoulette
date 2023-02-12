//Inicialización de Constantes

const cantidad = 40;
const cantNotif = 11;
const emails = false;
const rojoNum = [
  0, 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];
const negrosNum = [
  0, 2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
];

//Inicialización de variables
let dataNumbers = [];
let start = false;
let nameRoullete;
let fecha = new Date();

//Data Email
const dataInit = dataEmails.hackrouletteProject.dataInit;
const serviceID = dataEmails.hackrouletteProject.serviceID;
const templateID = dataEmails.hackrouletteProject.templateID;

function inicio() {
  console.log(`Start - ${fecha.toLocaleTimeString()}`);
  emailjs.init(dataInit);

  Notification.requestPermission().then((result) => {
    console.log("Permiso: " + result);
  });

  setInterval(() => {
    location.reload();
  }, 1200000);

  let validacionMinuto = setInterval(() => {
    try {
      validacion();
    } catch (error) {
      console.log(`Error- ${error} / Hora - ${fecha.toLocaleTimeString()}`);
      location.reload();
    }
  }, 60000);

  setTimeout(() => {
    try {
      //Clic automatico para abrir el contenedor principal
      if (document.getElementsByClassName("sidebar-buttons")[0]) {
        //Nombre de la ruleta
        nameRoullete =
          "R- " +
          document.getElementsByClassName("header__table-info")[0]
            .firstElementChild.textContent;

        document
          .getElementsByClassName("sidebar-buttons")[0]
          .children[4].click();

        lanzarApp();
      } else {
        if (document.getElementsByClassName("lobby-categories__panel")[0]) {
          arranque();

          let data = {
            roullete: "Error",
            bet: "App No Iniciada",
            message: "Error",
          };

          new Notification(data.bet);
        } else {
          validacion();
        }
      }
    } catch (error) {
      console.log(`Error- ${error} / Hora - ${fecha.toLocaleTimeString()}`);
      location.reload();
    }
  }, 20000);
}

function lanzarApp() {
  setTimeout(() => {
    if (document.querySelectorAll(".modal-body__content")[0]) {
      if (document.getElementsByClassName("lobby-category-item__icon")[3]) {
        arranque();
      }
      app();
    } else {
      location.reload();
    }
  }, 4000);
}

function app() {
  try {
    if (document.querySelectorAll(".modal-body__content")[0]) {
      //Contenedor padre
      let containerNumbers = document
        .querySelectorAll(".modal-body__content")[0]
        .querySelectorAll(".common-scroll__scroll-view-child")[0].firstChild;

      validacionLocalStorage();

      //Señal para indicar que la extensión se inicio correctamente
      console.log("Aplicación Iniciada " + nameRoullete);
      start = true;

      let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.addedNodes.length) {
            dataNumbers = [];

            for (let i = 0; i < cantidad; i++) {
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

            start = true;
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
  } catch (error) {
    console.log(`Error- ${error} / Hora - ${fecha.toLocaleTimeString()}`);
    location.reload();
  }
}

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

function validacion() {
  if (document.getElementsByClassName("session-modals")[0])
    document
      .getElementsByClassName("session-modals")[0]
      .firstChild.children[1].children[2].firstChild.click();

  if (document.getElementsByClassName("sidebar-buttons")[0]) {
    //Nombre de la ruleta
    nameRoullete =
      "R- " +
      document.getElementsByClassName("header__table-info")[0].firstElementChild
        .textContent;

    if (document.querySelectorAll(".modal-body__content")[0]) {
      if (start) {
        start = false;
        document.getElementsByClassName("video-player__wrapper")[0].click();
        console.log(nameRoullete);
      } else {
        location.reload();
      }
    } else
      document.getElementsByClassName("sidebar-buttons")[0].children[4].click();
  } else {
    if (document.getElementsByClassName("lobby-category-item__icon")[3]) {
      arranque();
    } else {
      location.reload();
    }
  }
}

function sendNotification(bet, count) {
  new Notification(count + " " + bet, {
    body: nameRoullete,
  });
}

function cargarLocalStorage(count, bet){
  validacionLocalStorage();

  let dataStorage = JSON.parse(localStorage.getItem(nameRoullete));

  if(dataStorage[bet].counter < count) {
    dataStorage[bet].fecha = fecha.toLocaleDateString(),
    dataStorage[bet].counter = count,
    dataStorage[bet].roullete = nameRoullete
  }

  localStorage.setItem(nameRoullete, JSON.stringify(dataStorage));
}

function validacionLocalStorage(){
  if(!localStorage.getItem(nameRoullete)){
      let dataStorage = {
        rojo: {
          fecha: fecha.toLocaleDateString(),
          counter: 0,
          roullete: nameRoullete,
        },
        negro: {
          fecha: fecha.toLocaleDateString(),
          counter: 0,
          roullete: nameRoullete,
        },
        impares: {
          fecha: fecha.toLocaleDateString(),
          counter: 0,
          roullete: nameRoullete,
        },
        pares: {
          fecha: fecha.toLocaleDateString(),
          counter: 0,
          roullete: nameRoullete,
        },
        primeraMitad: {
          fecha: fecha.toLocaleDateString(),
          counter: 0,
          roullete: nameRoullete,
        },
        segundaMitad: {
          fecha: fecha.toLocaleDateString(),
          counter: 0,
          roullete: nameRoullete,
        },
      };

      localStorage.setItem(nameRoullete, JSON.stringify(dataStorage));
  }
}

function arranque() {
  try {
    if (document.getElementsByClassName("session-modals")[0])
      document
        .getElementsByClassName("session-modals")[0]
        .firstChild.children[1].children[2].firstChild.click();

    if (document.getElementsByClassName("lobby-category-item__icon")[3]) {
      setTimeout(() => {
        document.getElementsByClassName("lobby-category-item__icon")[3].click();
      }, 3000);

      setTimeout(() => {
        if (document.getElementsByClassName("common-scroll__scroll-view")[0]) {
          dataRoulletes.forEach((roullete) => {
            let containerInicio = [
              ...document.getElementsByClassName("lobby-table__name-container"),
            ];

            containerInicio.forEach((item) => {
              console.log(item.textContent);
              if (item.textContent == roullete) {
                if (
                  item.parentElement.parentElement.parentElement.getElementsByClassName(
                    "triangle"
                  )[0]
                )
                  return;
                else item.click();
              }
            });
          });
        } else {
          arranque();
        }
      }, 3000);
    }
  } catch (error) {
    new Notification(error);
  }
}

inicio();

// document.getElementsByClassName('with-size-wrapper')[1].firstChild.firstChild.children[13].getBoundingClientRect()
