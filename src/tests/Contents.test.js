import React from 'react';
import Contents from '../components/Contents';
import { createBrowserHistory } from 'history'
import { Router } from 'react-router';
import renderer from 'react-test-renderer';

it('renders', () => {
  const tree = renderer
    .create(
      <Router history={createBrowserHistory()}>
        <Contents/>
      </Router>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});