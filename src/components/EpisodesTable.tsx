import { Link } from 'react-router-dom'
import type { Episode } from '../types'

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
        {episodes.map((ep: any, idx: number) => (
          <tr
            key={ep.trackId}
            className={`${
              idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            } border-t border-gray-200`}
          >
            <td className="p-2 text-[14px] text-[#4886ab] font-medium w-3/5 truncate">
              <Link
                to={`/podcast/${id}/episode/${ep.trackId}`}
                className="hover:underline"
              >
                {ep.trackName}
              </Link>
            </td>
            <td className="p-2 text-[14px]">
              {new Date(ep.releaseDate).toLocaleDateString()}
            </td>
            <td className="p-2 text-[14px] text-center">
              {ep.trackTimeMillis
                ? `${Math.floor(ep.trackTimeMillis / 60000)}:${String(
                    Math.floor((ep.trackTimeMillis % 60000) / 1000)
                  ).padStart(2, '0')}`
                : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
