import { useParams } from 'react-router-dom'
import { Header } from './components/Header'

const Podcast = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <>
      <Header title="Podcast Details" />
      <div>
        <p>
          This is the podcast details page for podcast ID: <strong>{id}</strong>
        </p>
      </div>
    </>
  )
}

export default Podcast
