import React from 'react';
import _ from 'underscore';
import {imperialToMetric} from 'functions';
import store from '../store';
import Ingredient from './ingredient';

var RecipeDetail = React.createClass({
	getDefaultProps() {
		return {
			recipes: store.getRecipeCollection(),
		}
	},

	getInitialState() {
		return {
			details: '',
			servings: '',
			system: 'imperial',
			ingredients: '',
		}
	},

	componentWillMount() {
		let recipeId = this.props.params.id;
		this.props.recipes.fetch().then((results) => {
			var recipe = _.findWhere(results.results, {objectId: recipeId})
			console.log(recipe);
			this.setState({
				details: recipe,
				servings: recipe.servings,
				ingredients: recipe.ingredients,
			})
		})
	},

	handleServingSubmit(e) {
		e.preventDefault();
		let ratio = this.refs.servings.value/this.state.servings;
		this.state.details.ingredients.map((obj) => {
			for (var key in obj) {
				if(key === 'qty') {
					obj[key] = obj[key]*ratio
				}
			}
		});
		this.setState({
			details: this.state.details,
			servings: this.refs.servings.value,
			ingredients: this.state.ingredients,
		})
	},

	handleSelectChange(e) {
		if(e.target.value == 'metric') {
			_.map(this.state.ingredients, imperialToMetric);
		}
		this.setState({
			ingredients: this.state.ingredients,
			system: e.target.value,
		});
	},

	render() {
 			return (
			<form
				className='recipe-detail'
				onSubmit={this.handleServingSubmit}
			>
				<h1>{this.state.details.name}</h1>
				<input type="number" defaultValue={this.state.servings} ref='servings' />
				<select name="" id="" value={this.state.system} onChange={this.handleSelectChange}>
					<option value="metric">Metric</option>
					<option value="imperial">Imperial</option>
				</select>
				<ul>
					{_.map(this.state.ingredients, (i, index) => <Ingredient {...i} key={index} />)}
				</ul>
			</form>
		)
	}
});

export default RecipeDetail