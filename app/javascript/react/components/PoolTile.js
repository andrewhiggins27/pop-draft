import React from 'react'

import { Link } from 'react-router-dom'

const PoolTile = props => {

  return (
    <div className="card cell small-4 pool-tile">
      <Link to={`/pools/${props.id}/games/new`}>
        <div className="card-divider">
          <h3>{props.name}</h3>
        </div>
      </Link>
      <div className="card-section" style={{
        backgroundColor: "#DCD1B4",
        backgroundImage: `url(${props.image})`,
        backgroundSize: 'contain',
        padding: '6rem',
        paddingBottom: '10rem',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}>
      </div>
    </div>
  )
}

export default PoolTile
