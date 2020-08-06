import React from 'react'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import DraftContainer from '../containers/DraftContainer'
import ResultsContainer from '../containers/ResultsContainer';
import HomeContainer from '../containers/HomeContainer'
import WaitingRoomContainer from '../containers/WaitingRoomContainer'

export const App = (props) => {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/pools/:id" component={WaitingRoomContainer} />
          <Route exact path="/games/:id" component={ResultsContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
