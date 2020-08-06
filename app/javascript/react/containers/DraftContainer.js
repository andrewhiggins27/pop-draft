import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";

import SelectionTile from '../components/SelectionTile'

const DraftContainer = props => {
  const [draftClass, setDraftClass] = useState([])
  const [selections, setSelections] = useState([])
  const [teamOneSelections, setTeamOneSelections] = useState([])
  const [teamTwoSelections, setTeamTwoSelections] = useState([])
  const [chosen, setChosen] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [round, setRound] = useState("")
  
  const chooseSelection = (selectionID) => {
    if (selectionID === chosen) {
      setChosen(null)
    } else {
      setChosen(selectionID)
    }
  }

  useEffect(() => {
    fetch(`/api/v1/pools/${props.poolId}`, {
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
        setRound("1")
        setSelections(body.draft_class.selections)
        setDraftClass(body.draft_class)
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
      setTeamOneSelections(body.game.teams[0].selections)
      setTeamTwoSelections(body.game.teams[1].selections)
      setSelections(body.game.selections)
      setRound(body.game.round)
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`))
  }

  const makeSelection = (selection, player) => { 
    let payload = {selection: selection, player: player, round: round}
    fetchPatch(payload, `/api/v1/games/${draftClass.game.id}`)
    setChosen(null)
    if (player === 0) {
      setCurrentPlayer(1)
    } else if (player === 1) {
      setCurrentPlayer(0)
    }
  }

  const draftClick = event => {
    event.preventDefault()
    let draftPick = selections.find(selection => selection.id === chosen)
    makeSelection(draftPick.id, currentPlayer)
  }

  const selectionTiles = selections.map((selection) => {
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

  const teamOneSelectionTiles = teamOneSelections.map(selection => {
    return(
      <SelectionTile
        key={selection.id}
        name={selection.name}
        description={selection.description}
        image={selection.image}
      />
    )
  })

  const teamTwoSelectionTiles = teamTwoSelections.map(selection => {
    return(
      <SelectionTile
        key={selection.id}
        name={selection.name}
        description={selection.description}
        image={selection.image}
      />
    )
  })

  if (teamOneSelections.length === 6 && teamTwoSelections.length === 6) {
    return (
      <Redirect to={`/games/${draftClass.game.id}`} />
    )
  }

  let currentRound = <h2 className='text-center'>Round {round}</h2>
  if (round === "6") {
    currentRound = <h2 className='text-center'>FINAL ROUND</h2>
  }

  return(
    <div className='grid-y'>
      {currentRound}
      {chosen && <div className="button large" onClick={draftClick}>Draft!</div>}
      <div className='grid-x cell'>
        <div className="cell large-2 text-center">
          Team One:
          {teamOneSelectionTiles}
        </div>
        <div className='grid-container grid-x cell large-8'>
          {selectionTiles}
        </div>
        <div className="cell large-2 text-center">
          Team Two:
          {teamTwoSelectionTiles}
        </div>
      </div>
    </div>
  )
}

export default DraftContainer