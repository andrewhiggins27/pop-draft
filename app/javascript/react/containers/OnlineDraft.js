import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";
import ReactHover, { Trigger, Hover } from 'react-hover'
import { useAlert } from 'react-alert'
import { confirmAlert } from 'react-confirm-alert'

import SelectionTile from '../components/SelectionTile'
import Teams from '../components/Teams'
import HoverDescription from '../components/HoverDescription'
import GameLobby from '../components/GameLobby'
import ChatContainer from '../containers/ChatContainer'

const OnlineDraft = props => {
  const [game, setGame] = useState({
    selections: [],
    teams: []
  })
  const [user, setUser] = useState(null)
  const [players, setPlayers] = useState([])
  const [selected, setSelected] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)

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
        if (body.game) {
          setGame(body.game)
        } else {
          alert.error("A Connection Issue Occured")
          setShouldRedirect(true)
        }
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
          disconnected: () => {},
          received: data => {
            if (data.users) {
              setPlayers(data.users)
            } else if (data.error) {
              alert.error(data.error)
              setShouldRedirect(true)
            } else {
              handleGameReceipt(data.game)
              alert.success(data.selection_alert)
              if (data.game.round !== "complete") {
                alert.show(data.player_turn_alert)
              } else {
                alert.show("Draft complete!")
              }
            }
          }
        }
      );
  }, [])

  const handleGameReceipt = (game) => {
    setGame(game)
  }

  const makeSelection = (selection, player) => { 
    let payload = {selection: selection, player: player, gameId: game.id, makeSelection: true}
    App.gameChannel.send(payload)
    setSelected(false)
  }
  
  const isUsersTurn = () =>{
    let currentTeam = game.teams[game.current_player]
    return currentTeam.user.id === user.user_id
  }

  const draftClick = (selectionId) => {
    let draftPick = game.selections.find(selection => selection.id === selectionId)
    makeSelection(draftPick.id, game.current_player)
    setSelected(true)
  }

  const confirmDraft = (selectionId) => {
    let draftPick = game.selections.find(selection => selection.id === selectionId)

    if (isUsersTurn()) {
      confirmAlert({
        title: `Draft ${draftPick.name}?`,
        buttons: [
          {
            label: 'Yes',
            onClick: () => draftClick(selectionId)
          },
          {
            label: 'No',
            onClick: () => {}
          }
        ]
      });
    } else {
      alert.error("It's not your turn to draft!")
    }
  }
  
  const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 20,
    shiftY: 0,
  }

  const selectionTiles = game.selections.map((selection) => {

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
              confirmDraft={confirmDraft}
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

  let currentRound = <h2 className='text-center round-text'>Round {game.round}</h2>
  if (game.round === "6") {
    currentRound = <h2 className='text-center round-text'>FINAL ROUND</h2>
  }

  let playerTurn
  if (game.teams[game.current_player]) {
    let currentPlayer = game.teams[game.current_player].user.username
    playerTurn = 
      <div>
        <h2 className="text-center player-turn">
          {currentPlayer}'s Turn!
        </h2>
        <h3 className="text-center player-turn">
          Click on selection to draft!
        </h3>
      </div>
  }

  const startGameClick = event => {
    if (players.length === game.number_of_players) {
      let payload = {gameId: game.id, start: true}
      App.gameChannel.send(payload)
    } else if (players.length > game.number_of_players) {
      alert.error("Too many players in lobby")
    }
  }

  if (game.status === "waiting") {
    return(
      <GameLobby
        startGameClick={startGameClick}
        players={players}
        totalNumOfPlayers={game.number_of_players}
        poolName={game.draft_class.pool.name}
      />
    )
  }

  if (game.round === "complete") {
    return (
      <Redirect to={`/games/${game.id}/results`} />
    )
  }

  if (shouldRedirect) {
    return <Redirect to='/pools'/>
  }

  return (
    <div className='grid-container draft-page'>
      <div className='callout draft-info'>
        <div className="current-round">
          {currentRound}
        </div>
        {playerTurn}
      </div>
      <ChatContainer
        id={props.gameId}
      />
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
    </div>
  )
}

export default OnlineDraft