const recipesTypeTexterea = document.getElementById("recipesTypeTexterea");
const recipesTypeSelect = document.getElementById("recipesTypeSelect");
recipesTypeSelect.addEventListener("change", function () {
  let selectedOption = Array.from(this.selectedOptions).map((option) => {
    return option.value;
  });
  recipesTypeTexterea.value = selectedOption;
});
// שם המתכון
const recipesName = document.getElementById("recipesName");
const recipesNameError = document.getElementById("recipesNameError");
recipesName.addEventListener("input", function () {
  recipesName.value = onlyLetters(recipesName, recipesNameError);
});
// מספר סועדים
const numOfDainers = document.getElementById("numOfDainers");
const numOfDainersError = document.getElementById("numOfDainersError");
numOfDainers.addEventListener("keyup", function (event) {
  console.log(numOfDainers.value);
  if (event.key === "Enter") numOfDainers.blur();
});
numOfDainers.addEventListener("input", function () {
  let clearedvalue = numOfDainers.value.replace(/[^0-9]/g, "");
  if (numOfDainers.value !== clearedvalue) {
    numOfDainersError.style.display = "block";
  } else {
    numOfDainersError.style.display = "none";
  }
  if (clearedvalue > 9) {
    numOfDainers.value = clearedvalue - Math.floor(clearedvalue / 10) * 10;
  } else {
    numOfDainers.value = clearedvalue;
  }
});
//זמן הכנה
const processTime = document.getElementById("processTime");
const processTimeError = document.getElementById("processTimeError");
processTime.addEventListener("input", function () {
  processTime.value = onlyNumbersLetters(processTime, processTimeError);
});
//מילות מפתח
const keyWords = document.getElementById("keyWords");
const keyWordsError = document.getElementById("keyWordsError");

keyWords.addEventListener("input", function () {
  keyWords.value = onlyLetters(keyWords, keyWordsError);
});
let commas = 0;
keyWords.addEventListener("keydown", function (event) {
  const tempArray = Array.from(keyWords.value);
  commas = tempArray.reduce((accumulator, note) => {
    if (note == ",") accumulator++;
    return accumulator;
  }, 0);
  console.log(commas);
  if (commas > 4 && event.key !== "Backspace") {
    event.preventDefault();
    return;
  }

  return;
});
function onlyLetters(inputToCheck, inputError) {
  let inputValue = inputToCheck.value;
  let sanitizedValue = inputValue.replace(/[^a-zA-Zא-ת\s,]+$/g, "");
  console.log(sanitizedValue.value);
  if (inputValue !== sanitizedValue) {
    inputError.style.display = "block";
  } else {
    inputError.style.display = "none";
  }
  return sanitizedValue;
}
function onlyNumbers(inputToCheck, inputError) {
  let inputValue = inputToCheck.value;
  let sanitizedValue = inputValue.replace(/[^0-9]/g, "");
  console.log(sanitizedValue.value);
  if (inputValue !== sanitizedValue) {
    inputError.style.display = "block";
  } else {
    inputError.style.display = "none";
  }
  return sanitizedValue;
}
function onlyNumbersLetters(inputToCheck, inputError) {
  let inputValue = inputToCheck.value;
  let sanitizedValue = inputValue.replace(/[^a-zA-Zא-ת0-9\s,]+$/g, "");
  if (inputValue !== sanitizedValue) {
    inputError.style.display = "block";
  } else {
    inputError.style.display = "none";
  }

  return sanitizedValue;
}
