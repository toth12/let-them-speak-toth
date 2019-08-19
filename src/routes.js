import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Essays from './components/Essays';
import EssayModal from './components/EssayModal';
import Explore from './components/Explore';
import Anthology from './components/Anthology';
import Methods from './components/Methods';
import Contents from './components/Contents';
import Search from './components/Search';
import Tree from './components/Tree';

const routes = (
  <App>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/essays/:essayId' component={EssayModal} />
      <Route exact path='/essays' component={Essays} />
      <Route path='/explore' component={Explore} />
      <Route path='/anthology' component={Anthology} />
      <Route path='/methods' component={Methods} />
      <Route path='/tree' component={Tree} />
      <Route path='/contents' component={Contents} />
      <Route path='/search' component={Search} />
    </Switch>
  </App>
)

export { routes };