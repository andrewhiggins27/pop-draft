import React from 'react'
import { BrowserRouter, Switch, Route} from "react-router-dom";

import ResultsContainer from '../containers/ResultsContainer';
import HomeContainer from '../containers/HomeContainer'
import NewGameContainer from '../containers/NewGameContainer'
import DraftShowContainer from '../containers/DraftShowContainer'
import LandingPageContainer from '../containers/LandingPageContainer'

export const App = (props) => {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPageContainer} />
          <Route exact path="/pools" component={HomeContainer} />
          <Route exact path="/pools/:id/games/new" component={NewGameContainer} />
          <Route exact path="/games/:id/results" component={ResultsContainer} />
          <Route exact path="/games/:id/:status" component={DraftShowContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
