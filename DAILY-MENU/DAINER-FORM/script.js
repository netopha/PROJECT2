import Dainer from "../DAILY-MENU-JS/classes/dainer.js";
// first name validation
let dainers = [];
let firstNameInput = document.getElementById("firstNameInput");
let firstNameInputError = document.getElementById("firstNameInputError");
firstNameInput.addEventListener("input", function () {
  firstNameInput.value = onlyLetters(firstNameInput, firstNameInputError);
});

// last name validation
let lastNameInput = document.getElementById("lastNameInput");
let lastNameInputError = document.getElementById("lastNameInputError");
lastNameInput.addEventListener("input", function () {
  lastNameInput.value = onlyLetters(lastNameInput, lastNameInputError);
});

// age validation
let ageInput = document.getElementById("ageInput");
let ageInputError = document.getElementById("ageInputError");
ageInput.addEventListener("input", function () {
  let sanitizedValue = this.value.replace(/[^0-9]/g, "");
  this.value = sanitizedValue;
  if (
    ageInput.value !== sanitizedValue ||
    sanitizedValue < 2 ||
    sanitizedValue > 120
  ) {
    ageInputError.style.display = "block";
  } else {
    ageInputError.style.display = "none";
  }
});

// Weight validation
let weightInput = document.getElementById("weightInput");
let weightInputError = document.getElementById("weightInputError");
weightInput.addEventListener("input", function () {
  let sanitizedValue = this.value.replace(/[^0-9]/g, "");
  this.value = sanitizedValue;
  if (
    weightInput.value !== sanitizedValue ||
    sanitizedValue < 10 ||
    sanitizedValue > 200
  ) {
    weightInputError.style.display = "block";
  } else {
    weightInputError.style.display = "none";
  }
});

//height validation
let heightInput = document.getElementById("heightInput");
let heightInputError = document.getElementById("heightInputError");
heightInput.addEventListener("input", function () {
  let sanitizedValue = this.value.replace(/[^0-9]/g, "");
  this.value = sanitizedValue;
  if (
    heightInput.value !== sanitizedValue ||
    sanitizedValue < 50 ||
    sanitizedValue > 220
  ) {
    heightInputError.style.display = "block";
  } else {
    heightInputError.style.display = "none";
  }
});

function onlyLetters(inputToCheck, inputError) {
  let inputValue = inputToCheck.value;
  let sanitizedValue = inputValue.replace(/[^a-zA-Zא-ת]/g, "");
  console.log(sanitizedValue.value);
  if (inputValue !== sanitizedValue) {
    inputError.style.display = "block";
  } else {
    inputError.style.display = "none";
  }
  return sanitizedValue;
}

// סוגי תפריטים
let menuTypeTextarea = document.getElementById("menuTypeTextarea");
let selectMenuType = document.getElementById("selectMenuType");
menuTypeTextarea.value = selectMenuType.options[0].value;
selectMenuType.addEventListener("change", function () {
  let selectedOptions = Array.from(this.selectedOptions).map(function (option) {
    return option.value;
  });

  menuTypeTextarea.value = selectedOptions.join("\n");
});

// מרכיבים אהובים בארוחה
let ingredientsTextarea = document.getElementById("ingredientsTextarea");
let selectIngredients = document.getElementById("selectIngredients");
let selectedIngredientsArray = [];
selectIngredients.addEventListener("change", function () {
  let selectedOptions = Array.from(this.selectedOptions).map(function (option) {
    return option.value;
  });
  selectedIngredientsArray.push(selectedOptions);
  console.log(selectedIngredientsArray);
  ingredientsTextarea.value = selectedIngredientsArray.join("\n");
});

// תפריטים אהובים
let recipesTextarea = document.getElementById("recipesTextarea");
let selectRecipes = document.getElementById("selectRecipes");
let selectedRecipesArray = [];
selectRecipes.addEventListener("change", function () {
  let selectedOptions = Array.from(this.selectedOptions).map(function (option) {
    return option.value;
  });
  selectedRecipesArray.push(selectedOptions);
  recipesTextarea.value = selectedRecipesArray.join("\n");
});
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const form = document.querySelector("form");
  const formData = new FormData(form);
  const formObject = {};
  for (const [key, value] of formData.entries()) {
    formObject[key] = value;
  }
  const newDainer = new Dainer(
    formObject.firstName,
    formObject.lastName,
    formObject.age,
    formObject.weight,
    formObject.height,
    formObject.menuType,
    formObject.ingredients,
    formObject.recipes
  );

  const storedDainers = localStorage.getItem("dainers");
  dainers = storedDainers ? JSON.parse(storedDainers) : [];
  dainers.push(newDainer);
  const dainersJSON = JSON.stringify(dainers);
  localStorage.setItem("dainers", dainersJSON);
  window.history.back();
});
