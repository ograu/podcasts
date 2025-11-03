import { Link } from 'react-router-dom'

type Props = {
  episode: any
  podcastId: string
  isOdd: boolean
}

export const EpisodeRow = ({ episode, podcastId, isOdd }: Props) => (
  <tr
    key={episode.trackId}
    className={`${isOdd ? 'bg-gray-50' : 'bg-white'} border-t border-gray-200`}
  >
    <td className="p-2 text-[14px] text-[#4886ab] font-medium w-3/5 truncate">
      <Link
        to={`/podcast/${podcastId}/episode/${episode.trackId}`}
        className="hover:underline"
      >
        {episode.trackName}
      </Link>
    </td>
    <td className="p-2 text-[14px]">
      {new Date(episode.releaseDate).toLocaleDateString()}
    </td>
    <td className="p-2 text-[14px] text-center">
      {episode.trackTimeMillis
        ? `${Math.floor(episode.trackTimeMillis / 60000)}:${String(
            Math.floor((episode.trackTimeMillis % 60000) / 1000)
          ).padStart(2, '0')}`
        : '-'}
    </td>
  </tr>
)
