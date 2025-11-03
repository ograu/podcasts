import type { Episode } from '../types'
import { EpisodeRow } from './EpisodeRow'

type Props = {
  id: string
  episodes: Episode[]
  isLoading: boolean
  error: Error | null
}

export const EpisodesTable = ({ id, episodes, isLoading, error }: Props) => {
  if (isLoading) {
    return <div className="text-gray-500">Loading episodes...</div>
  }

  if (error) {
    return <div className="text-red-500">Error loading episodes.</div>
  }

  return (
    <table className="w-full border-collapse table-fixed">
      <thead>
        <tr className="bg-white">
          <th className="text-left p-2 text-[14px] font-semibold w-3/5">
            Title
          </th>
          <th className="text-left p-2 text-[14px] font-semibold w-1/5">
            Date
          </th>
          <th className="text-center p-2 text-[14px] font-semibold w-1/5">
            Duration
          </th>
        </tr>
      </thead>
      <tbody>
        {episodes.map((episode: Episode, i: number) => (
          <EpisodeRow
            episode={episode}
            podcastId={id}
            isOdd={i % 2 === 0}
          />
        ))}
      </tbody>
    </table>
  )
}
