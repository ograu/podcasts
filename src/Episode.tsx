import React from 'react'
import { useParams } from 'react-router-dom'

const Episode: React.FC = () => {
  const { id, episodeId } = useParams<{ id: string; episodeId: string }>()
  return (
    <div>
      <h2>Episode Details</h2>
      <p>
        This is the episode details page for podcast ID: <strong>{id}</strong>{' '}
        and episode ID: <strong>{episodeId}</strong>
      </p>
    </div>
  )
}

export default Episode
