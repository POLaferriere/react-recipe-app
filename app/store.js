import IngredientCollection from './models/ingredients/ingredient-collection';
import RecipeCollection from './models/recipes/recipe-collection';
import Ingredient from './models/ingredients/ingredient'
import Recipe from './models/recipes/recipe'

let recipes;

export default {

  getRecipeCollection() {
    return (recipes = recipes || new RecipeCollection())
  },

  getIngredientCollection() {
    return new IngredientCollection()
  },

  getIngredient() {
    return new Ingredient()
  },

  getRecipe() {
    return new Recipe()
  }

}
