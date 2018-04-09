import React from 'react';
import Nav from '../components/Nav';
import { createBrowserHistory } from 'history'
import { Router } from 'react-router';
import renderer from 'react-test-renderer';

it('renders', () => {
  const tree = renderer
    .create(
      <Router history={createBrowserHistory()}>
        <Nav/>
      </Router>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});