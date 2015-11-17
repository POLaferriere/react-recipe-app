import Backbone from 'backbone';
import Ingredient from 'models/ingredients/ingredient';

var IngredientCollection = Backbone.Collection.extend({
	model: Ingredient,
});

export default IngredientCollection;