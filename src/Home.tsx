import { useQuery } from '@tanstack/react-query'
import './index.css'

export function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['podcasts'],
    queryFn: async () => {
      const res = await fetch(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
      )
      if (!res.ok) throw new Error('Network response was not ok')
      return res.json()
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {(error as Error).message}</div>

  const podcasts = data?.feed?.entry || []

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {podcasts.map((podcast: any) => (
        <div
          key={podcast.id?.attributes['im:id']}
          className="bg-white rounded-lg shadow-lg shadow-gray-400 p-4 flex flex-col items-center"
        >
          <img
            src={podcast['im:image']?.[2]?.label}
            alt={podcast['im:name']?.label}
            className="w-24 h-24 rounded-full mb-4 object-cover"
          />
          <div className="font-bold text-center mb-2">
            {podcast['im:name']?.label}
          </div>
          <div className="text-gray-500 text-sm text-center">
            {podcast['im:artist']?.label}
          </div>
        </div>
      ))}
    </div>
  )
}
