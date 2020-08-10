import React from 'react'

const HoverDescription = props => {
  return(
    <div className="card hover-description"
      style={{backgroundImage: `url(${props.image})`}}>
      <h3 className="hover-name">{props.name}</h3>
      <div className="hover-info">
        <p>{props.description}</p>
      </div>
    </div>
  )
}

export default HoverDescription