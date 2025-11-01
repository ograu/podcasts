import { useQuery } from '@tanstack/react-query'
import { Outlet, useMatch, useParams } from 'react-router-dom'
import { EpisodesTable } from './components/EpisodesTable'
import { Header } from './components/Header'

export const Podcast = () => {
  const { id } = useParams<{ id: string }>()
  const isEpisodeRoute = useMatch('/podcast/:id/episode/:episodeId')

  // Get cached podcasts
  const cacheKey = 'podcasts_cache_v1'
  let podcast: any = null
  const cache = localStorage.getItem(cacheKey)
  if (cache && id) {
    try {
      const { data } = JSON.parse(cache)
      const entries = data?.feed?.entry || []
      podcast = entries.find((p: any) => p.id?.attributes['im:id'] === id)
    } catch {}
  }

  const image = podcast['im:image']?.[2]?.label
  const title = podcast['im:name']?.label
  const author = podcast['im:artist']?.label
  const description =
    podcast['summary']?.label ||
    podcast['description']?.label ||
    'No description available.'

  // Fetch episodes using useQuery
  const {
    data: episodesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['podcastEpisodes', id],
    queryFn: async () => {
      if (!id) return null
      const cacheKey = `podcast_episodes_cache_${id}`
      const cache = localStorage.getItem(cacheKey)
      if (cache) {
        try {
          const { data, timestamp } = JSON.parse(cache)
          if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
            return data
          }
        } catch {}
      }
      const res = await fetch(
        `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
      )
      if (!res.ok) throw new Error('Network response was not ok')
      const json = await res.json()
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ data: json, timestamp: Date.now() })
      )
      return json
    },
    enabled: !!id,
  })

  const episodes =
    episodesData?.results?.filter(
      (ep: any) => ep.wrapperType === 'podcastEpisode'
    ) || []

  if (!podcast) {
    return (
      <>
        <Header />
        <div className="text-center text-gray-500 mt-8">Podcast not found.</div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="flex">
        {/* Sidebar Card */}
        <aside className="w-full max-w-60 mr-8">
          <div className="bg-white rounded-lg shadow-md shadow-gray-400 p-4 flex flex-col items-start">
            {image && (
              <div className="w-full flex justify-center">
                <img
                  src={image}
                  alt={title}
                  className="w-32 h-32 rounded-lg mb-4 object-cover"
                />
              </div>
            )}
            <div className="font-bold text-[14px] text-left">{title}</div>
            <div className="text-[14px] text-left italic">by {author}</div>
            <div className="w-full flex justify-center my-4">
              <div className="h-0.5 bg-gray-200 w-full" />
            </div>
            <div className="w-full text-left mb-1 font-semibold text-[14px]">
              Description:
            </div>
            <div className="text-gray-700 text-[14px] w-full text-left italic">
              {description}
            </div>
          </div>
        </aside>
        {/* Main content */}
        <main className="flex-1 flex flex-col gap-6">
          {/* Episodes count card */}
          <div className="bg-white rounded-lg shadow-md shadow-gray-400 p-4 mb-4 w-full">
            <span className="font-bold text-[18px]">
              Episodes: {episodes.length}
            </span>
          </div>
          {/* Episodes table card */}
          <div className="bg-white rounded-lg shadow-md shadow-gray-400 p-4 w-full">
            {isEpisodeRoute ? (
              <Outlet />
            ) : (
              <EpisodesTable
                id={id || ''}
                episodes={episodesData?.results}
                isLoading={isLoading}
                error={error}
              />
            )}
          </div>
        </main>
      </div>
    </>
  )
}
