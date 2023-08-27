class Dainer {
  firstName;
  lastName;
  age;
  weight;
  height;
  menuType;
  ingredients;
  recipes;

  constructor(
    firstName,
    lastName,
    age,
    weight,
    height,
    menuType,
    ingredients,
    recipes
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.menuType = menuType;
    this.ingredients = ingredients;
    this.recipes = recipes;
  }
}
export default Dainer;
