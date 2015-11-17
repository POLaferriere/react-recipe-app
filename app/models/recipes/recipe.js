import Backbone from 'backbone';


var Recipe = Backbone.Model.extend({
	urlRoot: 'https://api.parse.com/1/classes/Recipe',
	idAttribute: 'objectId',

	defaults: {
		name: '',
		ingredients: {
			ingredient: '',
			unit: '',
			quantity: 0,
		},
	},
});

export default Recipe;