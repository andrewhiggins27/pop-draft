import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";
import ReactHover, { Trigger, Hover } from 'react-hover'
import { useAlert } from 'react-alert'

import SelectionTile from '../components/SelectionTile'
import Teams from '../components/Teams'
import HoverDescription from '../components/HoverDescription'
import GameLobby from '../components/GameLobby'

const OnlineDraft = props => {
  const [game, setGame] = useState({
    selections: [],
    teams: []
  })
  const [user, setUser] = useState(null)
  const [players, setPlayers] = useState([])
  const [chosen, setChosen] = useState(null)

  const alert = useAlert()

  useEffect(() => {
    fetch(`/api/v1/games/${props.gameId}`, {
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
        setGame(body.game)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))

      fetch("/api/v1/users/current", {
        credentials: 'same-origin',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
        let { ok } = response;
        if (ok) {
          return response.json();
        }
      })
      .then((data) => {
        setUser(data)
      })

      App.gameChannel = App.cable.subscriptions.create(      
        {
          channel: "GameChannel",
          game_id: props.gameId
        },
        {
          connected: () => {
            App.gameChannel.send({
              lobby: true,
              gameId: props.gameId
            })
          },
          disconnected: () => console.log("GameChannel disconnected"),
          received: data => {
            if (data.users) {
              setPlayers(data.users)
            } else {
              handleGameReceipt(data.game)
              alert.show(data.alert)
            }
          }
        }
      );
  }, [])

  const handleGameReceipt = (game) => {
    setGame(game)
  }

  const chooseSelection = (selectionID) => {
    if (selectionID === chosen) {
      setChosen(null)
    } else {
      setChosen(selectionID)
    }
  }

  const makeSelection = (selection, player) => { 
    let payload = {selection: selection, player: player, gameId: game.id, makeSelection: true}
    App.gameChannel.send(payload)
    setChosen(null)
  }
  
  const isUsersTurn = () =>{
    let currentTeam = game.teams[game.current_player]
    return currentTeam.user.id === user.user_id
  }

  const draftClick = event => {
    event.preventDefault()
    if (isUsersTurn()) {
      let draftPick = game.selections.find(selection => selection.id === chosen)
      makeSelection(draftPick.id, game.current_player)
    } else {
      alert.error("It's Not Your Turn to draft!")
    }
  }
  
  const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 20,
    shiftY: 0,
  }

  const selectionTiles = game.selections.map((selection) => {
    let chosenTile = false
    if (chosen === selection.id) {
      chosenTile = true
    }

    return(
      <div className="cell large-3 medium-3 small-4" key={selection.id}>
        <ReactHover
          options={optionsCursorTrueWithMargin}>
          <Trigger type='trigger'>
            <SelectionTile
              id={selection.id}
              name={selection.name}
              description={selection.description}
              image={selection.image}
              chooseSelection={chooseSelection}
              chosen={chosenTile}
            />
          </Trigger>
          <Hover type='hover'>
            <HoverDescription
              name={selection.name}
              description={selection.description}
              image={selection.image}
            />
          </Hover>
        </ReactHover>
      </div>
    )
  })

  const teamsComponents = game.teams.map((team, i) => {
    return (
      <Teams 
        key={team.id}
        id={team.id}
        user={team.user}
        index={i}
        selections={team.selections}
        draftInProgress={true}
      />
    )
  })

  if (game.round === "complete") {
    return (
      <Redirect to={`/games/${game.id}/results`} />
    )
  }

  let currentRound = <h2 className='text-center round-text'>Round {game.round}</h2>
  if (game.round === "6") {
    currentRound = <h2 className='text-center round-text'>FINAL ROUND</h2>
  }

  let playerTurn
  if (game.teams[game.current_player]) {
    if (game.teams[game.current_player].user) {
      playerTurn = <h2 className="text-center player-turn">{game.teams[game.current_player].user.username}'s Turn</h2>
    } else {
    playerTurn = <h2 className="text-center player-turn">{`Team ${game.current_player + 1}'s Turn to Draft!`}</h2>
    }
  }

  const startGameClick = event => {
    if (players.length === game.number_of_players){
      let payload = {gameId: game.id, start: true}
      App.gameChannel.send(payload)
    }
  }

  if (game.status === "waiting") {
    return(
      <GameLobby
        startGameClick={startGameClick}
        players={players}
        totalNumOfPlayers={game.number_of_players}
      />
    )
  }

  return (
    <div className='grid-container draft-page'>
      <div className='callout draft-info'>
        <div className="current-round">
          {currentRound}
        </div>
        {playerTurn}
      </div>
        {chosen && <div className="button large cell alert" onClick={draftClick}>Draft!</div>}
      <div className='grid-x grid-margin-x'>
        <div className="cell large-3">
          {teamsComponents[0]}
          {teamsComponents[2]}
        </div>
        <div className='grid-x grid-padding-x cell large-6 draft-board'>
          {selectionTiles}
        </div>
        <div className="cell large-3">
          {teamsComponents[1]}
          {teamsComponents[3]}
        </div>
      </div>
        {chosen && <div className="button large cell alert" onClick={draftClick}>Draft!</div>}
    </div>
  )
}

export default OnlineDraft