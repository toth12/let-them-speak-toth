import React from 'react';
import Essays from '../components/Essays';
import { createBrowserHistory } from 'history'
import { Router } from 'react-router';
import renderer from 'react-test-renderer';

it('renders', () => {
  const tree = renderer
    .create(
      <Router history={createBrowserHistory()}>
        <Essays/>
      </Router>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});