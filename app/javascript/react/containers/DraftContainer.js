import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";

import SelectionTile from '../components/SelectionTile'
import Teams from '../components/Teams'

const DraftContainer = props => {
  const [game, setGame] = useState({
    selections: [],
    teams: []
  })
  const [chosen, setChosen] = useState(null)

  useEffect(() => {
    fetch(`/api/v1/pools/${props.poolId}`,{
      credentials: "same-origin",
      method: "PATCH",
      body: JSON.stringify({
        numberOfPlayers: props.numberOfPlayers
      }),
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
    makeSelection(draftPick.id, game.current_player)
  }

  const selectionTiles = game.selections.map((selection) => {
    let chosenTile = false
    if (chosen === selection.id) {
      chosenTile = true
    }

    return(
      <SelectionTile
        key={selection.id}
        id={selection.id}
        name={selection.name}
        description={selection.description}
        image={selection.image}
        chooseSelection={chooseSelection}
        chosen={chosenTile}
      />
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
      <Redirect to={`/games/${game.id}`} />
    )
  }

  let currentRound = <h2 className='text-center'>Round {game.round}</h2>
  if (game.round === "6") {
    currentRound = <h2 className='text-center'>FINAL ROUND</h2>
  }

  let playerTurn
  if (game.teams[game.current_player]) {
    if (game.teams[game.current_player].user) {
      playerTurn = <h2 className="text-center">{game.teams[game.current_player].user.email}'s Turn</h2>
    } else {
    playerTurn = <h2 className="text-center">{`Team ${game.current_player + 1}'s Turn`}</h2>
    }
  }

  return(
    <div className='grid-y'>
      {currentRound}
      {playerTurn}
        <div className='grid-x'>
          {teamsComponents}
        </div>
      <div className='grid-x cell'>
        {chosen && <div className="button large cell alert" onClick={draftClick}>Draft!</div>}
        <div className='grid-container grid-x cell large-8'>
          {selectionTiles}
        </div>
      </div>
    </div>
  )
}

export default DraftContainer