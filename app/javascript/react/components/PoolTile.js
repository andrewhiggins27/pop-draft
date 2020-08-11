import React from 'react'

import { Link } from 'react-router-dom'

const PoolTile = props => {

  return (
    <div className="card cell small-12 medium-4 pool-tile">
      <Link to={`/pools/${props.id}/games/new`} className="pool-link">
        <div className="card-divider">
          <h3 className="pool-tile-text">{props.name}</h3>
        </div>
      </Link>
        <div className="card-section pool-tile-image" style={{
          backgroundImage: `url(${props.image})`,
        }}>
        </div>
    </div>
  )
}

export default PoolTile
