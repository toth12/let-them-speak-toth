import React from 'react';
import Explore from '../components/Explore';
import { createBrowserHistory } from 'history'
import { Router } from 'react-router';
import renderer from 'react-test-renderer';

it('renders', () => {
  const tree = renderer
    .create(
      <Router history={createBrowserHistory()}>
        <Explore/>
      </Router>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});