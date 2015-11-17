import React from 'react';

var Ingredient = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		unit: React.PropTypes.string.isRequired,
		qty: React.PropTypes.number.isRequired,
	},

	render() {
		return (
			<li className='ingredient'>
				<input type='checkbox'/>
				<p>{this.props.qty + ' ' + this.props.unit + ' ' + this.props.name}</p>
				
			</li>
		)
	},
});

export default Ingredient;