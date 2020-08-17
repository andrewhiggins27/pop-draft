import React, { useState, useEffect } from 'react'

import Usergame from '../components/Usergame'

const UserGamesContainer = props => {
  const [games, setGames] = useState([])

  useEffect(()=>{
    fetch(`/api/v1/users/${props.match.params.id}/games`, {
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
        setGames(body.games)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const usergameTiles = games.map(game => {
    return(
      <Usergame
        key={game.id}
        game={game}
      />
    )
  })

  return(
    <div>
      {usergameTiles}
    </div>
  )
}

export default UserGamesContainer