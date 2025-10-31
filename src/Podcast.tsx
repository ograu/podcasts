import React from 'react'
import { useParams } from 'react-router-dom'

const Podcast: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <div>
      <h2>Podcast Details</h2>
      <p>
        This is the podcast details page for podcast ID: <strong>{id}</strong>
      </p>
    </div>
  )
}

export default Podcast
