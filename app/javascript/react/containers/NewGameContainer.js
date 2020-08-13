import React, { useState, useEffect } from 'react'

import NumberOfPlayersRadioButtons from '../components/NumberOfPlayersRadioButtons'
import WaitingGame from '../components/WaitingGame'
import { Redirect } from "react-router-dom";
import { useAlert } from 'react-alert'

const NewGameContainer = props => {
  const [pool, setPool] = useState({name: null})
  const [game, setGame] = useState({})
  const [waitingGames, setWaitingGames] = useState([])
  const [numOfPlayers, setNumOfPlayers] = useState("2")
  const [onlineNumOfPlayers, setOnlineNumOfPlayers] = useState("2")
  const [redirect, setRedirect] = useState(false)
  const [online, setOnline] = useState(false)

  const alert = useAlert()

  useEffect(()=>{
    fetch(`/api/v1/pools/${props.match.params.id}`, {
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
        setPool(body.pool)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  const createNewGame = (payload, endpoint) =>{
    fetch(endpoint, {
      credentials: "same-origin",
      method: "POST",
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
        if (body.error) {
          alert.error(body.error)
          setOnline(false)
        } else {
          setGame(body.game)
          setRedirect(true)
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const chooseNumberPlayers = (number) => {
    setNumOfPlayers(number)
  }

  const chooseOnlineNumberPlayers = (number) => {
    setOnlineNumOfPlayers(number)
  }

  const handleStartGameClick = event => {
    createNewGame({
      numberOfPlayers: numOfPlayers,
      online: false
    }, `/api/v1/pools/${props.match.params.id}/start/local`)
  }

  const handleStartOnlineGameClick = event => {
    setOnline(true)
    createNewGame({
      numberOfPlayers: onlineNumOfPlayers,
      online: true
    }, `/api/v1/pools/${props.match.params.id}/start/online`)
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
        if (body.error) {
          alert.error(body.error)
        } else if (body.games.length === 0) {
          alert.error("No games found.")
        } else {
          setWaitingGames(body.games)
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const waitingGameComponents = waitingGames.map((game) =>{
    return(
      <WaitingGame
        key={game.id}
        id={game.id}
        numberOfPlayers={game.number_of_players}
        currentNumOfPlayers={game.current_num_of_players}
        creator={game.created_by}
        createdAt={game.created}
      />  
    )
  })

  let onlineDraftsMessage = <></>
  if (waitingGames[0]) {
    onlineDraftsMessage = 
      <div className="online-drafts-msg cell small-12">
        <h3>Click on a Draft to Join</h3>
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
    <div className="grid-container grid-x">
      <h1 className="pool-name-text text-center">{pool.name}</h1>
      <div className="grid-x grid-margin-x new-game-page">
        <div className="callout cell small-12 large-6 number-of-players grid-x">
          <h5 className="cell">Local Draft (No sign in required, but you will need to sign in to vote on winners.)</h5>  
          <h5 className="cell"> Choose Number of Players:</h5>  
          <NumberOfPlayersRadioButtons
            chooseNumberPlayers={chooseNumberPlayers}
            selectedOption={numOfPlayers}
          />
          <div className="button alert cell large large-offset-3 text-center" onClick={handleStartGameClick}>
            Start Local Draft
          </div>
        </div>
        <div className="callout cell small-12 large-6 number-of-players">
          <h5>Online Draft:</h5> 
          <h5>Choose Number of Players:</h5>  
          <NumberOfPlayersRadioButtons
            chooseNumberPlayers={chooseOnlineNumberPlayers}
            selectedOption={onlineNumOfPlayers}
          /> 
          <div className="button large alert cell text-center start-game" onClick={handleStartOnlineGameClick}>
            Create Online Draft
          </div>
          <div className="button large alert cell text-center start-game" onClick={handleJoinOnlineDraftClick}>
            Find Online Drafts
          </div>
        </div>
      </div>
      {onlineDraftsMessage}
      <div className="cell small-12 grid-x grid-margin-x">
        {waitingGameComponents}
      </div>
    </div>
  )
}

export default NewGameContainer