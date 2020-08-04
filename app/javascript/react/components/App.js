import React from 'react'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import DraftContainer from './DraftContainer'

export const App = (props) => {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/pools/:id" component={DraftContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
