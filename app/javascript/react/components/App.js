import React from 'react'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import DraftContainer from '../containers/DraftContainer'
import ResultsContainer from '../containers/ResultsContainer';

export const App = (props) => {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/pools/:id" component={DraftContainer} />
          <Route exact path="/games/:id" component={ResultsContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
