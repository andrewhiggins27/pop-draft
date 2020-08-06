import React from 'react'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import ResultsContainer from '../containers/ResultsContainer';
import HomeContainer from '../containers/HomeContainer'
import WaitingRoomContainer from '../containers/WaitingRoomContainer'
import ChatContainer from '../containers/ChatContainer'

export const App = (props) => {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/pools/:id" component={WaitingRoomContainer} />
          <Route exact path="/games/:id" component={ResultsContainer} />
          <Route exact path="/chats" component={ChatContainer}/>
          <Route exact path="/chats/:id" component={ChatContainer}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
