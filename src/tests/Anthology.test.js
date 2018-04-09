import React from 'react';
import Anthology from '../components/Anthology';
import { createBrowserHistory } from 'history'
import { Router } from 'react-router';
import renderer from 'react-test-renderer';

it('renders', () => {
  const tree = renderer
    .create(
      <Router history={createBrowserHistory()}>
        <Anthology/>
      </Router>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});