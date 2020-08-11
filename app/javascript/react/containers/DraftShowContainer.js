import React from 'react'

import LocalDraft from './LocalDraft'
import OnlineDraft from './OnlineDraft'

const DraftShowContainer = props => {
  let onlineStatus = props.match.params.status
  let gameId = props.match.params.id

  if (onlineStatus === "local") {
    return (
    <LocalDraft
      gameId={gameId}
    />
    )
  }

  if (onlineStatus === "online") {
    return (
      <OnlineDraft
        gameId={gameId}
      />
    )
  }
}

export default DraftShowContainer