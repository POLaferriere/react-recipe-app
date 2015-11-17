import React from 'react';
import _ from 'underscore';
import {imperialToMetric} from 'functions';
import store from '../store';
import Ingredient from './ingredient';

var RecipeDetail = React.createClass({

	getInitialState() {
		return {
			recipes: store.getRecipeCollection(),
			system: 'imperial',
			servings: null,
			initialServings: null,
		}
	},

	componentWillMount() {
		this.state.recipes.fetch().then(() => {
			console.log(store.getRecipeCollection().get(this.props.params.id).get('servings'));
			this.setState({
				servings: store.getRecipeCollection().get(this.props.params.id).get('servings'),
				initialServings: store.getRecipeCollection().get(this.props.params.id).get('servings'),
			})
		})
	},

	componentWillReceiveProps(nextProps) {
		this.setState({
			servings: store.getRecipeCollection().get(nextProps.params.id).get('servings'),
			initialServings: store.getRecipeCollection().get(nextProps.params.id).get('servings')
		})
	},

	handleServingChange(e) {
		this.setState({
			servings: e.target.value,
		})
	},

	handleServingSubmit(e) {
		e.preventDefault();
		let ratio = this.refs.servings.value/this.state.servings;
		let ingredients = store.getRecipeCollection().get(this.props.params.id).get('ingredients');
		console.log(ingredients)
		ingredients.map((obj) => {
			for (var key in obj) {
				if(key === 'qty') {
					obj[key] = obj[key]*ratio
				}
			}
		});
		this.setState({
			servings: this.state.servings*ratio,
		});
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
		let recipe = store.getRecipeCollection().get(this.props.params.id).toJSON();
		let ingredients = recipe.ingredients;
		let name = recipe.name;
		let servings = recipe.servings

		return (
			<div className="recipe-container">
			<form
				className='recipe-detail'
				onSubmit={this.handleServingSubmit}>
				<h1>{name}</h1>
				<div className="servings-container">
					<label className='serving-label'>Servings</label>
					<input type="number" defaultValue={this.state.initialServings} ref='servings' className='servings' />
					<select name="" id="" value={this.state.system} onChange={this.handleSelectChange} className='measurment'>
						<option value="metric">Metric</option>
						<option value="imperial">Imperial</option>
					</select>
				</div>
				<ul className='ingredients'>
					{_.map(ingredients, (i, index) => <Ingredient {...i} key={index} />)}
				</ul>
			</form>
		</div>
		)
	}
});

export default RecipeDetail