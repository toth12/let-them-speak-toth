import React from 'react';
import Hero from '../components/Hero';
import { createBrowserHistory } from 'history'
import { Router } from 'react-router';
import renderer from 'react-test-renderer';

it('renders', () => {
  const tree = renderer
    .create(
      <Router history={createBrowserHistory()}>
        <Hero/>
      </Router>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});