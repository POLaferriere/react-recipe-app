import Backbone from 'backbone';
import Recipe from 'models/recipes/recipe';

var RecipeCollection = Backbone.Collection.extend({
	url: 'https://api.parse.com/1/classes/Recipe',
	model: Recipe,
	parse(response) {
		return response.results;
	}
});

export default RecipeCollection;