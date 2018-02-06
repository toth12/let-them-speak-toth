import React from 'react';
import Tree from '../components/Tree';
import { createBrowserHistory } from 'history'
import { Router } from 'react-router';
import renderer from 'react-test-renderer';

it('renders', () => {
  const tree = renderer
    .create(
      <Router history={createBrowserHistory()}>
        <Tree/>
      </Router>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});