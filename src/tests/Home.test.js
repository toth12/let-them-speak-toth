import React from 'react';
import Home from '../components/Home';
import { createBrowserHistory } from 'history'
import { Router } from 'react-router';
import renderer from 'react-test-renderer';

it('renders', () => {
  const tree = renderer
    .create(
      <Router history={createBrowserHistory()}>
        <Home/>
      </Router>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});