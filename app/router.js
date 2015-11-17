import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/app';
import Index from './components/index';
import RecipeDetail from './components/recipe-detail';

ReactDOM.render((
	<Router>
		<Route path='/' component={App}>
			<Route path='/recipe/:id' component={RecipeDetail} />
		</Route>
	</Router>
), document.getElementById('application'));
