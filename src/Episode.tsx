import { useParams } from 'react-router-dom'
import { Header } from './components/Header'

const Episode = () => {
  const { id, episodeId } = useParams<{ id: string; episodeId: string }>()
  return (
    <>
      <Header title="Episode Details" />
      <div>
        <p>
          This is the episode details page for podcast ID: <strong>{id}</strong>{' '}
          and episode ID: <strong>{episodeId}</strong>
        </p>
      </div>
    </>
  )
}

export default Episode
