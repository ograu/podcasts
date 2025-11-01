import DOMPurify from 'dompurify'
import { useOutletContext } from 'react-router-dom'

type Episode = {
  trackName: string
  description?: string
  shortDescription?: string
  episodeUrl?: string
}

export const Episode = () => {
  const { episode } = useOutletContext<{ episode: Episode }>()

  console

  if (!episode) {
    return (
      <div className="text-center text-gray-500 mt-8">Episode not found.</div>
    )
  }

  const sanitizedDescription = DOMPurify.sanitize(
    episode?.shortDescription || ''
  )

  return (
    <>
      <h3 className="font-bold text-[16px] mb-2">{episode?.trackName}</h3>
      <div
        className="text-gray-700 text-[14px] mb-4 italic"
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
      {episode.episodeUrl && (
        <audio
          controls
          className="w-full mt-4"
        >
          <source
            src={episode?.episodeUrl}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      )}
    </>
  )
}
