import { Link } from 'react-router-dom'
import type { Podcast } from '../types'

export const PodcastCard = ({ podcast }: { podcast: Podcast }) => (
  <Link
    key={podcast.id}
    to={`/podcast/${podcast.id}`}
    className="bg-white rounded-sm shadow-lg shadow-gray-400 p-4 flex flex-col items-center cursor-pointer hover:bg-blue-50 transition no-underline"
  >
    <img
      src={podcast.image}
      alt={`Cover art for ${podcast.title}`}
      className="w-24 h-24 rounded-full mb-4 object-cover"
    />
    <div className="font-bold text-center mb-2 uppercase">{podcast.title}</div>
    <div className="text-gray-500 text-sm text-center">
      Author: {podcast.artist}
    </div>
  </Link>
)
