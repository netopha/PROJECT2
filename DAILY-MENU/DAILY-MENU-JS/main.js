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
async function serchForRecpies() {
  const loadedDainers = JSON.parse(localStorage.getItem("dainers"));
  console.log(loadedDainers);

  if (loadedDainers.length > 0) {
    const firstDainer = loadedDainers[0];
    const ingredientsArray = firstDainer.ingredients.split("\n");

    const randomIndex = Math.floor(Math.random() * ingredientsArray.length);
    const randomIngredient = ingredientsArray[randomIndex];

    console.log("Randomly chosen ingredient:", randomIngredient);

    const recipes = await fetchRandomRecipeWithIngredient(randomIngredient);

    if (recipes && recipes.length > 0) {
      console.log("Random recipes with the chosen ingredient:");
      recipes.forEach((recipe) => {
        displayRecipeResult(recipe);
      });
    } else {
      console.log("No recipes found with the chosen ingredient.");
    }
  } else {
    console.log("No dainers found.");
  }
}
async function fetchRandomRecipeWithIngredient(ingredient) {
  const apiKey = "e2094b46df52449da985853947b1f42c";
  const apiUrl = "https://api.spoonacular.com/recipes/findByIngredients?";
  const requestUrl = `${apiUrl}?apiKey=${apiKey}&ingredients=${ingredient}&number=1`;

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
function displayRecipeResult(recipeData) {
  const recipe = recipeData.results[0];

  const recipeName = recipe.title;
  const recipeInstructions = recipe.instructions;
  const ingredientsList = recipe.usedIngredients.map(
    (ingredient) => ingredient.original
  );

  const resultContainer = document.querySelector("#recipeResult");

  resultContainer.innerHTML = `
    <h2>${recipeName}</h2>
    <h3>Instructions:</h3>
    <p>${recipeInstructions}</p>
    <h3>Ingredients:</h3>
    <ul>
      ${ingredientsList.map((ingredient) => `<li>${ingredient}</li>`).join("")}
    </ul>
  `;
}
