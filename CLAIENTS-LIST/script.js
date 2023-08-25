/* debugger; */
import { Client } from "./client.js";
let clientIdNum = 6;
let scrollListener = 0;
let switchDivsFlag = true;
let CurrentState = "close";
let clientsObject = {};
let trashFlag = false;

const trashClient = document.querySelector("#trashClient");
const editClient = document.querySelector("#editClient");
const infoDiv = document.querySelector("#infoDiv");
const showClientDiv = document.querySelector(".showClientDiv");
const showClient = document.querySelector("#showClient");
const newForm = document.querySelector(".newForm");
let currentDiv = document.querySelector(".current");
const playGround = document.querySelector("#playGround");
const SubscriptionCard = document.querySelector("#SubscriptionCard");
const btnClient = document.querySelector("#btnClient");
const displayCtegories = [
  "",
  "גיל : ",
  "ההורה : ",
  "כתובת :",
  "יישוב :",
  "טלפון : ",
  "הערות : ",
];
let divsArray = [
  document.getElementById("clientDiv1"),
  document.getElementById("clientDiv2"),
  document.getElementById("clientDiv3"),
  document.getElementById("clientDiv4"),
  document.getElementById("clientDiv5"),
  document.getElementById("clientDiv6"),
  /* document.getElementById("clientDiv7"),
  document.getElementById("clientDiv8"),
  document.getElementById("clientDiv9"), */
];
const classArray = [
  "outOfRange",
  "beforePrevious",
  "previous",
  "current",
  "next",
  "afterNext",
  "newClient",
];
const classArrayUp = [
  "beforePreviousUp",
  "previousUp",
  "currentUp",

  "nextUp",
  "afterNextUp",
  "newClientUp",
];
const classArrayDown = [
  "outOfRangeDown",
  "beforePreviousDown",
  "previousDown",
  "currentDown",

  "nextDown",
  "afterNextDown",
];
const storedClientsObjectJSON = localStorage.getItem("clientsData");
clientsObject = storedClientsObjectJSON
  ? JSON.parse(storedClientsObjectJSON)
  : {};
if (Object.keys(clientsObject).length > 0) loadClient();
function loadClient() {
  for (const clientId in clientsObject) {
    const newClientDiv = document.querySelector(
      "#clientDiv" + (clientIdNum - 3)
    );
    newClientDiv.textContent = clientsObject[clientId].fullName;

    addNewClientDiv();
    clientIdNum++;
  }
  clientIdNum = 6;
}

currentDiv.addEventListener("click", openCloseCurrent);
SubscriptionCard.addEventListener("mouseenter", function () {
  SubscriptionCard.addEventListener("wheel", (event) => {
    currentDiv.removeEventListener("click", openCloseCurrent);
    console.log(clientIdNum);
    if (switchDivsFlag == false) {
      return;
    } else {
      if (event.deltaY < 0) {
        //scrole up
        if (clientIdNum >= 7) {
          clientIdNum--;
          switchDivsDown();
        }
      }
      if (event.deltaY > 0) {
        // scroll down
        if (clientIdNum <= divsArray.length) {
          clientIdNum++;
          switchDivUp();
        }
      }
      currentDiv = document.querySelector(".current");
      currentDiv.addEventListener("click", openCloseCurrent);
    }
  });
});

function switchDivUp() {
  /*  debugger; */
  switchDivsFlag = false;
  let wheel = divsArray.slice(clientIdNum - 7, clientIdNum - 1);
  wheel.forEach((element, index) => {
    element.classList.add(classArrayUp[index]);
  });
  setTimeout(() => {
    wheel.forEach((element, index) => {
      element.className = "";
      element.classList.add("client");
      element.classList.add(classArray[index]);
    });
    switchDivsFlag = true;
    currentDiv = document.querySelector(".current");
    currentDiv.addEventListener("click", openCloseCurrent);
  }, 250);
}
function switchDivsDown() {
  switchDivsFlag = false;
  let wheel = divsArray.slice(clientIdNum - 6, clientIdNum);
  wheel.forEach((element, index) => {
    element.classList.add(classArrayDown[index]);
  });
  setTimeout(() => {
    wheel.forEach((element, index) => {
      element.className = "";
      element.classList.add("client");
      element.classList.add(classArray[index + 1]);
    });
    switchDivsFlag = true;
    currentDiv = document.querySelector(".current");
    currentDiv.addEventListener("click", openCloseCurrent);
  }, 250);
}

function openCloseCurrent() {
  /*  debugger; */
  switchDivsFlag = false;
  if (CurrentState == "close") {
    currentDiv.style.pointerEvents = "none";
    currentDiv.classList.add("pushToOpenCurrent");
    setTimeout(() => {
      console.log(currentDiv.textContent);
      infoDiv.style.height = "64vh";
      if (currentDiv.textContent === "לקוח חדש") {
        newForm.style.height = "45vh";

        editClient.style.display = "none";
        trashClient.style.display = "none";
        addNewClient();
      } else {
        /* showClientDiv.style.display = "block"; */
        showClient.style.height = "60vh";
        editClient.style.display = "block";
        trashClient.style.display = "block";
        printClient();
        trashFlag = false;
      }
      currentDiv.classList.remove("pushToOpenCurrent");
      currentDiv.classList.add("releaseToOPenCurrent");

      currentDiv.style.pointerEvents = "auto";
      CurrentState = "open";
    }, 200);
  } else {
    infoDiv.style.height = "0vh";
    currentDiv.style.pointerEvents = "none";
    currentDiv.classList.add("pushToCloseCurrent");
    setTimeout(() => {
      currentDiv.classList.remove("pushToCloseCurrent");
      currentDiv.classList.add("releaseToCloseCurrent");
      currentDiv.style.pointerEvents = "auto";
      currentDiv.className = "";
      currentDiv.classList.add("client");
      currentDiv.classList.add("current");
      CurrentState = "close";
      newForm.style.height = "0vh";

      showClient.textContent = "";
      showClient.style.height = "0vh";
      setTimeout(() => {
        switchDivsFlag = true;
      }, 100);
    }, 200);
  }
}

function addNewClient() {
  /*  debugger; */
  console.log("form");
  const storedClientsObjectJSON = localStorage.getItem("clientsData");
  clientsObject = storedClientsObjectJSON
    ? JSON.parse(storedClientsObjectJSON)
    : {};
  const newClientId = "Client" + (clientIdNum - 3);
  const currentClient = clientsObject[newClientId];
  console.log(currentClient);
  const fullName = document.querySelector("#fullName");
  if (currentClient) fullName.value = currentClient.fullName;

  fullName.addEventListener("input", () => {
    fullName.value = onlyLetters(fullName);
  });
  const age = document.querySelector("#age");
  if (currentClient) age.value = currentClient.age;
  age.addEventListener("input", () => {
    age.value = onlyNumbers(age, "age");
  });
  const parentName = document.querySelector("#parentName");
  if (currentClient) parentName.value = currentClient.parentName;
  parentName.addEventListener("input", () => {
    parentName.value = onlyLetters(parentName);
  });
  const address = document.querySelector("#address");
  if (currentClient) address.value = currentClient.address;
  const settlement = document.querySelector("#settlement");
  if (currentClient) settlement.value = currentClient.settlement;
  settlement.addEventListener("input", () => {
    settlement.value = onlyLetters(settlement);
  });
  const phoneNum = document.querySelector("#phoneNum");
  if (currentClient) phoneNum.value = currentClient.phoneNum;
  phoneNum.addEventListener("input", () => {
    phoneNum.value = onlyNumbers(phoneNum, "phone");
  });
  const remarks = document.querySelector("#remarks");
  if (currentClient) remarks.value = currentClient.remarks;
  const saveClient = document.querySelector("#saveClient");

  saveClient.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("submit");
    const storedClientsObjectJSON = localStorage.getItem("clientsData");
    clientsObject = storedClientsObjectJSON
      ? JSON.parse(storedClientsObjectJSON)
      : {};
    const form = document.querySelector("form");
    const formData = new FormData(form);
    const formObject = {};
    for (const [key, value] of formData.entries()) {
      formObject[key] = value;
    }

    clientsObject["Client" + (clientIdNum - 3)] = new Client(
      formObject.fullName,
      formObject.age,
      formObject.parentName,
      formObject.address,
      formObject.settlement,
      formObject.phoneNum,
      formObject.remarks
    );
    let clientsObjectJSON = JSON.stringify(clientsObject);
    localStorage.setItem("clientsData", clientsObjectJSON);
    /*  debugger; */
    const clientId = "Client" + (clientIdNum - 3);
    const newClientDiv = document.querySelector(
      "#clientDiv" + (clientIdNum - 3)
    );
    newClientDiv.textContent = clientsObject[clientId].fullName;

    openCloseCurrent();
    setTimeout(() => {
      form.reset();
      addNewClientDiv();
    }, 400);
  });
}

function printClient() {
  const storedClientsObjectJSON = localStorage.getItem("clientsData");
  clientsObject = storedClientsObjectJSON
    ? JSON.parse(storedClientsObjectJSON)
    : {};
  const newClientId = "Client" + (clientIdNum - 3);
  const currentClient = clientsObject[newClientId];
  let i = 0;
  for (const key in currentClient) {
    if (i == 0) {
      const name = document.createElement("h1");
      name.textContent = `${displayCtegories[i]} ${currentClient[key]}`;
      showClient.appendChild(name);
    } else {
      const paragraph = document.createElement("p");
      paragraph.textContent = `${displayCtegories[i]} ${currentClient[key]}`;
      showClient.appendChild(paragraph);
    }
    i++;
  }
  trashClient.addEventListener("click", () => {
    if (trashFlag == true) return;
    trashFlag = true;
    openCloseCurrent();
    setTimeout(() => {
      divsArray.splice(clientIdNum - 4, 1);
      let deleteDiv = document.querySelector(`#clientDiv${clientIdNum - 3}`);
      /* deleteDiv.classList = ""; */
      deleteDiv.remove();
      /*  divsArray.splice(clientIdNum - 4, 1); */
      console.log(divsArray);

      switch2DivUp();
      divsArray.map((div, index) => {
        div.id = `clientDiv${index + 1}`;
      });
    }, 400);
  });
  editClient.addEventListener("click", editClientData);
}
function switch2DivUp() {
  switchDivsFlag = false;
  let wheel = divsArray.slice(clientIdNum - 4, clientIdNum);
  console.log(wheel);
  wheel.forEach((element, index) => {
    element.classList.add(classArrayUp[index + 3]);
  });
  setTimeout(() => {
    wheel.forEach((element, index) => {
      element.className = "";
      element.classList.add("client");
      element.classList.add(classArray[index + 3]);
    });
    switchDivsFlag = true;
    console.log(divsArray);
    currentDiv = document.querySelector(".current");
    currentDiv.addEventListener("click", openCloseCurrent);
  }, 250);
}

function addNewClientDiv() {
  /*  debugger; */
  const lastClientDiv = divsArray[divsArray.length - 1];
  const divNum = lastClientDiv;
  const newClientDiv = document.createElement("div");
  newClientDiv.id = "clientDiv" + clientIdNum;
  console.log(newClientDiv.id, lastClientDiv.id);
  if (newClientDiv.id == lastClientDiv.id) return;
  newClientDiv.classList.add("client", "newClient");

  newClientDiv.textContent = "לקוח חדש";

  divsArray.push(newClientDiv);
  console.log(divsArray);
  SubscriptionCard.appendChild(newClientDiv);
}
function editClientData() {
  showClient.style.height = "0vh";
  setTimeout(() => {
    newForm.style.height = "45vh";
    addNewClient();
  }, 200);
}
function onlyLetters(checkvalue) {
  const inputValue = checkvalue.value;
  const sanitizedValue = inputValue.replace(/[^\ba-zA-Zא-ת\s]/g, "");
  return sanitizedValue;
}
function onlyNumbers(checkvalue, what) {
  const inputValue = checkvalue.value;
  const sanitizedValue = inputValue.replace(/[^\b0-9]/g, "");
  const numberAsString = sanitizedValue.toString();

  if (
    (what === "age" && sanitizedValue > 120) ||
    (what === "phone" && numberAsString.length > 10)
  ) {
    const removedLastDigit = numberAsString.slice(0, -1);
    const result = Number(removedLastDigit);
    return result;
  }
  return sanitizedValue;
}
