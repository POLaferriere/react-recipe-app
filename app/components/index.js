import React from 'react';
import _ from 'underscore';
import store from '../store';
import {Link} from 'react-router';

var RecipeList = React.createClass({
	propTypes: {
		recipes: React.PropTypes.object.isRequired,
	},

	getDefaultProps() {
		return {
			recipes: store.getRecipeCollection()
		}
	},

	getInitialState() {
		return {
			search: ''
		}
	},

	componentWillMount() {
		this.props.recipes.fetch();
    this.props.recipes.on('sync add remove', this.forceUpdate.bind(this, null), this);
	},

	handleClick(e) {
		this.props.clickName(e.target.textContent);
	},

	handleChange(e) {
		this.setState({
			search: e.target.value.trim().toLowerCase()
		});
	},

	handleSearchClick() {
		$('.search-box').toggleClass('active');
	},

	handleExpandClick() {
		$('.recipes').toggleClass('expanded');
		$('.fa-angle-double-down, .fa-angle-double-up').toggleClass('hidden');
	},

	render() {
		var recipes = this.props.recipes.toJSON();
		console.log(recipes);
		// debugger;

		recipes = recipes.filter((recipe) => {
			return _.any(_.values(recipe), (value) => { 
        return (typeof value == 'string' && value.trim().toLowerCase().indexOf(this.state.search) > -1)
      }) || _.any(recipe.ingredients, (ingredient) => {
      	return ingredient.name.trim().toLowerCase().indexOf(this.state.search) > -1
      })
    });

		return (
			<div className="recipe-list">
				<input className='search-box' type="text" onKeyUp={this.handleChange} placeholder='Search recipes or ingredients'/>
				<ul className='recipes'>
					{_.map(recipes, (object) => {
						return (
							<Link to={'/recipe/' + object.objectId}><li key={object.objectId} className='recipe'>{object.name}</li></Link>
						)
					})}
				</ul>
				<i className="fa fa-search" onClick={this.handleSearchClick}></i>
				<i className="fa fa-angle-double-down" onClick={this.handleExpandClick}></i>
				<i className="fa fa-angle-double-up hidden" onClick={this.handleExpandClick}></i>
			</div>
		)
	}
});

export default RecipeList