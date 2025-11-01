import { useParams } from 'react-router-dom'

export const Episode = () => {
  const { id, episodeId } = useParams<{ id: string; episodeId: string }>()
  return (
    <p>
      This is the episode details page for podcast ID: <strong>{id}</strong> and
      episode ID: <strong>{episodeId}</strong>
    </p>
  )
}
