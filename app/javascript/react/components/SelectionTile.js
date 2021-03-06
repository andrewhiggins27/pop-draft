import React from 'react'

const SelectionTile = props => {
  let classes = "card text-center draft-selection-tile"
  let cardDividerClasses = "card-divider selection-text-box"

  const handleClick = event => {
    if (props.disableClick) {

    } else {
      props.confirmDraft(props.id)
    }
  }

  return (
    <div className={classes} onClick={handleClick}>
      <div className={cardDividerClasses}>
        <h4 className="selection-text">{props.name}</h4>
      </div>
      <div className="card-section selection-images" style={{backgroundImage: `url(${props.image})`}}>
      </div>
    </div>
  )
}

export default SelectionTile
