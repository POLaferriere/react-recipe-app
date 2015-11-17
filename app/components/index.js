import React from 'react';
import _ from 'underscore';
import store from '../store';
import {Link} from 'react-router';
import {Glyphicon} from 'react-bootstrap';
import $ from 'jquery'

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
		$('.glyphicon-chevron-down, .glyphicon-chevron-up').removeClass('spin');
		setTimeout(() => {
			$('.glyphicon-chevron-down, .glyphicon-chevron-up').addClass('spin');
			setTimeout(() => {
				$('.glyphicon-chevron-down, .glyphicon-chevron-up').toggleClass('hidden')
			}, 0)
		}, 0);
	},

	showSearch() {
		$('.search-box').toggleClass('show');
	},

	render() {
		var recipes = this.props.recipes.toJSON();

		recipes = recipes.filter((recipe) => {
			return _.any(_.values(recipe), (value) => { 
        return (typeof value == 'string' && value.trim().toLowerCase().indexOf(this.state.search) > -1)
      }) || _.any(recipe.ingredients, (ingredient) => {
      	return ingredient.name.trim().toLowerCase().indexOf(this.state.search) > -1
      })
    });

		return (
			<div className="recipe-list-container">
				<div className="recipe-list">
					<div className="search-container">
						<input className='search-box' type="text" onKeyUp={this.handleChange} placeholder='Search recipes or ingredients'/>
						<Glyphicon glyph='search' onClick={this.showSearch}/>
					</div>
					<ul className='recipes'>
						{_.map(recipes, (object) => {
							return (
								<Link to={'/recipe/' + object.objectId} className='recipe-link'>
									<li key={object.objectId} className='recipe'>{object.name}</li>
								</Link>
							)
						})}
					</ul>
					<Glyphicon glyph='chevron-down' onClick={this.handleExpandClick}/>
					<Glyphicon glyph='chevron-up hidden' onClick={this.handleExpandClick}/>

				</div>
			</div>
		)
	}
});

export default RecipeList