import React from 'react';
import { IndexLink } from 'react-router';
import RecipeList from './index'

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  render() {
    return (
      <div>
        <nav className="top-bar" data-topbar role="navigation">
          <ul className="title-area">
            <li className="name">
              <h1>Home</h1>
            </li>
          </ul>
        </nav>
        <RecipeList />

        {this.props.children}
      </div>
    );
  }

});

export default App;
