import React from 'react';
import Methods from '../components/Methods';
import { createBrowserHistory } from 'history'
import { Router } from 'react-router';
import renderer from 'react-test-renderer';

it('renders', () => {
  const tree = renderer
    .create(
      <Router history={createBrowserHistory()}>
        <Methods/>
      </Router>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});