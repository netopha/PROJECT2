async function fetchResipes() {
  const apiKey = "de2094b46df52449da985853947b1f42c";
  const apiUrl =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch"; // Replace with the API URL

  // Construct the API request URL with the API key
  const requestUrl = `${apiUrl}?api_key=${apiKey}`;

  let responce = await fetch(requestUrl);
  if (responce.status === 200) {
    return responce.json();
  } else {
    throw new Error(responce);
  }
}
let resipes = await fetchResipes()
  .then((resipes) => console.log(resipes))
  .catch((error) => console.log(error.message));
