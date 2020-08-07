import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";

import SelectionTile from '../components/SelectionTile'
import Teams from '../components/Teams'

const DraftContainer = props => {
  const [game, setGame] = useState({})
  const [draftClass, setDraftClass] = useState([])
  const [selections, setSelections] = useState([])
  const [teams, setTeams] = useState([])
  const [teamOneSelections, setTeamOneSelections] = useState([])
  const [teamTwoSelections, setTeamTwoSelections] = useState([])
  const [chosen, setChosen] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [round, setRound] = useState("")

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
        setRound(body.game.round)
        setCurrentPlayer(body.game.current_player)
        setSelections(body.game.selections)
        setDraftClass(body.game.draft_class)
        setTeams(body.game.teams)
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
      setTeams(body.game.teams)
      setSelections(body.game.selections)
      setRound(body.game.round)
      setCurrentPlayer(body.game.current_player)
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
    let payload = {selection: selection, player: player, round: round}
    fetchPatch(payload, `/api/v1/games/${draftClass.game.id}`)
    setChosen(null)
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

  const teamsComponents = teams.map((team, i) => {
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
      <Redirect to={`/games/${draftClass.game.id}`} />
    )
  }

  let currentRound = <h2 className='text-center'>Round {round}</h2>
  if (round === "6") {
    currentRound = <h2 className='text-center'>FINAL ROUND</h2>
  }

  let playerTurn
  if (game.teams) {
    if (game.teams[currentPlayer].user) {
      playerTurn = <h2 className="text-center">{game.teams[currentPlayer.user.email]}'s Turn</h2>
    } else {
    playerTurn = <h2 className="text-center">{`Team ${currentPlayer + 1}'s Turn`}</h2>
    }
  }

  return(
    <div className='grid-y'>
      {currentRound}
      {playerTurn}
      <div className='grid-x cell'>
        {teamsComponents}
        {chosen && <div className="button large cell alert" onClick={draftClick}>Draft!</div>}
        <div className='grid-container grid-x cell large-8'>
          {selectionTiles}
        </div>
      </div>
    </div>
  )
}

export default DraftContainer