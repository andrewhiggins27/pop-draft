import React from 'react'

const SmallHoverDescription = props => {
  return(
    <div className="small-hover-description">
      <h3 className="small-hover-name">{props.name}</h3>
      <div>
        <p>{props.description}</p>
      </div>
    </div>
  )
}

export default SmallHoverDescription