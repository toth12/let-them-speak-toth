import React from 'react';
import About from '../components/About';
import { createBrowserHistory } from 'history'
import { Router } from 'react-router';
import renderer from 'react-test-renderer';

it('renders', () => {
  const tree = renderer
    .create(
      <Router history={createBrowserHistory()}>
        <About/>
      </Router>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});