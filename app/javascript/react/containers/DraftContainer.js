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
  
  let poolId = props.match.params.id

  const chooseSelection = (selectionID) => {
    if (selectionID === chosen) {
      setChosen(null)
    } else {
      setChosen(selectionID)
    }
  }

  useEffect(() => {
    fetch(`/api/v1/pools/${poolId}`, {
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
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`))
  }

  const makeSelection = (selection, player) => { 
    let payload = {selection: selection, player: player}
    fetchPatch(payload, `/api/v1/games/${draftClass.game.id}`)
    setChosen(null)
    if (player === 0) {
      setCurrentPlayer(1)
    } else if (player === 1) {
      setCurrentPlayer(0)
    }
  }

  const SelectionTiles = selections.map((selection) => {
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

  const TeamOneSelectionTiles = teamOneSelections.map(selection => {
    return(
      <SelectionTile
        key={selection.id}
        name={selection.name}
        description={selection.description}
        image={selection.image}
      />
    )
  })

  const TeamTwoSelectionTiles = teamTwoSelections.map(selection => {
    return(
      <SelectionTile
        key={selection.id}
        name={selection.name}
        description={selection.description}
        image={selection.image}
      />
    )
  })

  const draftClick = event => {
    event.preventDefault()
    let draftPick = selections.find(selection => selection.id === chosen)
    makeSelection(draftPick.id, currentPlayer)
  }

  if (teamOneSelections.length === 5 && teamTwoSelections.length === 5) {
    return (
      <Redirect to={`/games/${draftClass.game.id}`} />
    )
  }

  return(
    <div className='grid-y'>
      {chosen && <div className="button large" onClick={draftClick}>Draft!</div>}
      <div className='grid-x cell'>
        <div className="cell large-2 text-center">
          Team One:
          {TeamOneSelectionTiles}
        </div>
        <div className='grid-container grid-x cell large-8'>
          {SelectionTiles}
        </div>
        <div className="cell large-2 text-center">
          Team Two:
          {TeamTwoSelectionTiles}
        </div>
      </div>
    </div>
  )
}

export default DraftContainer