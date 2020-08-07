import React, { useState, useEffect } from 'react'

import PoolTile from '../components/PoolTile'

const HomeContainer = props => {
  const [pools, setPools] = useState([])
  
  useEffect(()=>{
    fetch('/api/v1/pools', {
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
        setPools(body.pools)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const poolTiles = pools.map(pool => {
    return (
      <PoolTile
        key={pool.id}
        id={pool.id}
        name={pool.name}
        image={pool.sample_image}
      />
    )
  })

  return (
    <div className="grid-container">
      <h2>Select A Draft Pool</h2>
      {poolTiles}
    </div>
  )
}

export default HomeContainer