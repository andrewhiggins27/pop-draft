import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";
import ReactHover, { Trigger, Hover } from 'react-hover'
import { useAlert } from 'react-alert'

import SelectionTile from '../components/SelectionTile'
import Teams from '../components/Teams'
import HoverDescription from '../components/HoverDescription'

const LocalDraft = props => {
  const [game, setGame] = useState({
    selections: [],
    teams: []
  })
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
  }, [])


  const fetchPatch = (payload, endpoint) => {
    fetch(endpoint, {
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
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      setGame(body.game)
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`))
  }

  const chooseSelection = (selectionID) => {
    if (selectionID === chosen) {
      setChosen(null)
    } else {
      setChosen(selectionID)
    }
  }

  const makeSelection = (selection, player) => { 
    let payload = {selection: selection, player: player, round: game.round}
    fetchPatch(payload, `/api/v1/games/${game.id}`)
    setChosen(null)
  }

  const draftClick = event => {
    event.preventDefault()
    let draftPick = game.selections.find(selection => selection.id === chosen)
    alert.success(`Player ${game.current_player + 1} selects... ${draftPick.name}`)
    makeSelection(draftPick.id, game.current_player)
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
      playerTurn = <h2 className="text-center player-turn">{game.teams[game.current_player].user.email}'s Turn</h2>
    } else {
      playerTurn = <h2 className="text-center player-turn">{`Team ${game.current_player + 1}'s Turn to Draft!`}</h2>
    }
  }

  return(
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
        <div className='grid-x grid-margin-x cell large-6 draft-board'>
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

export default LocalDraft