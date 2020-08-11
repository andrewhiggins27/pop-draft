import React, { useState } from 'react'

import NumberOfPlayersRadioButtons from '../components/NumberOfPlayersRadioButtons'
import WaitingGame from '../components/WaitingGame'
import { Redirect } from "react-router-dom";

const NewGameContainer = props => {
  const [game, setGame] = useState({})
  const [waitingGames, setWaitingGames] = useState([])
  const [numOfPlayers, setNumOfPlayers] = useState("2")
  const [redirect, setRedirect] = useState(false)
  const [online, setOnline] = useState(false)

  const createNewGame = (payload) =>{
    fetch(`/api/v1/pools/${props.match.params.id}`, {
      credentials: "same-origin",
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw (error);
        }
      })
      .then(response => response.json())
      .then(body => {
        setGame(body.game)
        setRedirect(true)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const chooseNumberPlayers = (number) => {
    setNumOfPlayers(number)
  }

  const handleStartGameClick = event => {
    createNewGame({
      numberOfPlayers: numOfPlayers,
      online: false
    })
  }

  const handleStartOnlineGameClick = event => {
    setOnline(true)
    createNewGame({
      numberOfPlayers: "2",
      online: true
    })
  }

  const handleJoinOnlineDraftClick = event => {
    fetch(`/api/v1/pools/${props.match.params.id}/games`, {
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw (error);
        }
      })
      .then(response => response.json())
      .then(body => {
        setWaitingGames(body.games)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const waitingGameComponents = waitingGames.map((game) =>{
    return(
      <WaitingGame
        key={game.id}
        id={game.id}
        numberOfPlayers={game.number_of_players}
        creator={game.created_by}
      />  
    )
  })

  let onlineDraftsMessage = <></>
  if (waitingGames[0]) {
    onlineDraftsMessage = 
      <div>
        <h3>Click on a Draft to Join</h3>
        <p>If you are not signed in, you will join as a spectator</p>
      </div>
  }

  if (redirect) {
    if (online) {
      return <Redirect to={`/games/${game.id}/online`}/>
    } else {
      return <Redirect to={`/games/${game.id}/local`} />
    }
  }

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <div className="callout cell small-6 number-of-players">
          <h5>Local Draft (no sign-in needed)</h5>  
          <h5>Choose Number of Players:</h5>  
          <NumberOfPlayersRadioButtons
            chooseNumberPlayers={chooseNumberPlayers}
            selectedOption={numOfPlayers}
          />
          <div className="button large cell text-center start-game" onClick={handleStartGameClick}>
            Start Local Draft
          </div>
        </div>
        <div className="callout cell small-6 number-of-players">
          <h5>Online Draft:</h5>  
          <div className="button large cell text-center start-game" onClick={handleStartOnlineGameClick}>
            Create Online Draft
          </div>
          <div className="button large cell text-center start-game" onClick={handleJoinOnlineDraftClick}>
            Find Online Drafts
          </div>
        </div>
      </div>
      {onlineDraftsMessage}
      <div className="grid-x grid-margin-x">
        {waitingGameComponents}
      </div>
    </div>
  )
}

export default NewGameContainer