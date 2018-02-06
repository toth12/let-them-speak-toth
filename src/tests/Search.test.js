import React from 'react';
import Search from '../components/Search';
import { createBrowserHistory } from 'history'
import { Router } from 'react-router';
import renderer from 'react-test-renderer';

it('renders', () => {
  const tree = renderer
    .create(
      <Router history={createBrowserHistory()}>
        <Search/>
      </Router>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});