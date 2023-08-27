import Dainer from "./classes/dainer.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("localstorage");
  const dainers = JSON.parse(localStorage.getItem("dainers"));
  console.log(dainers);
});

const dainerButton = document.querySelector("#addDainer");
dainerButton.addEventListener("click", () => {
  console.log("new window");
  window.open("./DAINER-FORM/index.html", "_blank");
});
const addRecipes = document.querySelector("#addRecipes");
addRecipes.addEventListener("click", () => {
  console.log("new window");
  window.open("./RECIPES-FORM/index.html", "_blank");
});
const findRecpies = document.querySelector("#findRecpies");
findRecpies.addEventListener("click", () => {
  console.log("serchForRecpies");
  serchForRecpies();
});
async function fetchRecipeDetails(recipeId) {
  const apiKey = "e2094b46df52449da985853947b1f42c";
  const apiUrl = "https://api.spoonacular.com/recipes";
  const requestUrl = `${apiUrl}/${recipeId}/information?apiKey=${apiKey}&includeNutrition=false`;

  try {
    const response = await fetch(requestUrl);
    if (response.ok) {
      const recipeData = await response.json();
      return recipeData;
    } else {
      throw new Error(
        `Failed to fetch recipe data. Status: ${response.status}`
      );
    }
  } catch (error) {
    throw new Error(`An error occurred: ${error.message}`);
  }
}

async function fetchRandomRecipeWithIngredient(ingredient) {
  const apiKey = "e2094b46df52449da985853947b1f42c";
  const apiUrl = "https://api.spoonacular.com/recipes/findByIngredients";
  const requestUrl = `${apiUrl}?apiKey=${apiKey}&ingredients=${ingredient}&number=1`;

  try {
    const response = await fetch(requestUrl);
    if (response.ok) {
      const recipeData = await response.json();
      if (recipeData && recipeData.length > 0) {
        const randomRecipeId = recipeData[0].id;
        const detailedRecipe = await fetchRecipeDetails(randomRecipeId);
        return detailedRecipe;
      } else {
        console.log("No recipes found with the chosen ingredient.");
        return null;
      }
    } else {
      throw new Error(
        `Failed to fetch recipe data. Status: ${response.status}`
      );
    }
  } catch (error) {
    throw new Error(`An error occurred: ${error.message}`);
  }
}

async function serchForRecpies() {
  const loadedDainers = JSON.parse(localStorage.getItem("dainers"));

  if (loadedDainers.length > 0) {
    const firstDainer = loadedDainers[0];
    const ingredientsArray = firstDainer.ingredients.split("\n");

    const randomIndex = Math.floor(Math.random() * ingredientsArray.length);
    const randomIngredient = ingredientsArray[randomIndex];

    const detailedRecipe = await fetchRandomRecipeWithIngredient(
      randomIngredient
    );

    if (detailedRecipe) {
      const sourceUrl = detailedRecipe.sourceUrl || "#"; // Provide a default value if sourceUrl is not available
      detailedRecipe.sourceUrl = sourceUrl; // Add sourceUrl property to detailedRecipe
      displayRecipeResults(detailedRecipe, sourceUrl);
    }
  } else {
    console.log("No dainers found.");
  }
}

function displayRecipeResults(recipe, sourceUrl) {
  const resultContainer = document.querySelector("#recipeResult");
  resultContainer.innerHTML = ""; // Clear previous results
  console.log(recipe);
  const recipeName = recipe.title;
  const recipeImage = recipe.image;
  const recipeTime = recipe.readyInMinutes || "N/A";
  const ingredientsList = recipe.extendedIngredients.map(
    (ingredient) =>
      `${ingredient.originalName} - ${ingredient.amount} ${ingredient.unit}`
  );
  const instructions = recipe.instructions || "Instructions not available.";

  const recipeElement = document.createElement("div");
  recipeElement.classList.add("recipe");

  recipeElement.innerHTML = `
    <h2>${recipeName}</h2>
    <img src="${recipeImage}" alt="${recipeName}" />
    <p>Time Needed: ${recipeTime} minutes</p>
    <h3>Ingredients:</h3>
    <ul>
      ${ingredientsList.map((ingredient) => `<li>${ingredient}</li>`).join("")}
    </ul>
    <h3>Instructions:</h3>
    <p>${instructions}</p>
    <p>Source: <a href="${sourceUrl}" target="_blank">Recipe Source</a></p>
  `;

  resultContainer.appendChild(recipeElement);
}
