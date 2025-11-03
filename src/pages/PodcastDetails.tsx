import { useQuery } from '@tanstack/react-query'
import { Link, Outlet, useParams } from 'react-router-dom'
import { useGetPodcast } from '../api/useGetPodcast'
import { EpisodesTable } from '../components/EpisodesTable'
import { Header } from '../components/Header'
import type { Episode, EpisodesResponse } from '../types'

export const PodcastDetails = () => {
  const { id, episodeId } = useParams<{ id: string; episodeId: string }>()
  const { data: podcasts } = useGetPodcast()
  const podcast = podcasts?.find((p) => p.id === id)

  const isEpisodeRoute = Boolean(episodeId)

  const {
    data: episodes = [],
    isLoading,
    error,
  } = useQuery<EpisodesResponse, Error, Episode[]>({
    queryKey: ['podcastEpisodes', id],
    queryFn: async () => {
      if (!id) return null

      const res = await fetch(
        `https://cors-anywhere.com/https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
      )

      if (!res.ok) throw new Error('Network response was not ok')
      return await res.json()
    },
    enabled: !!id,
    staleTime: 24 * 60 * 60 * 1000,
    select: (data) =>
      data.results
        ?.filter((ep) => ep.wrapperType === 'podcastEpisode')
        .map((ep) => {
          return {
            trackId: ep.trackId,
            trackName: ep.trackName,
            trackTimeMillis: ep.trackTimeMillis,
            episodeUrl: ep.episodeUrl,
            shortDescription: ep.shortDescription,
          }
        }),
  })

  if (!podcast) {
    return (
      <>
        <Header isLoading={isLoading} />
        <div className="text-center text-gray-500 mt-8">Podcast not found.</div>
      </>
    )
  }

  return (
    <>
      <Header isLoading={isLoading} />
      <div className="flex">
        {/* Sidebar Card */}
        <aside className="w-full max-w-60 mr-8">
          <Link
            to={`/podcast/${id}`}
            className="block mb-4 w-full"
          >
            <div className="bg-white rounded-sm shadow-md shadow-gray-400 p-4 flex flex-col items-start">
              {podcast.image && (
                <div className="w-full flex justify-center">
                  <img
                    src={podcast.image}
                    alt={podcast.title}
                    className="w-32 h-32 rounded-lg mb-4 object-cover"
                  />
                </div>
              )}
              <div className="font-bold text-[14px] text-left">
                {podcast.title}
              </div>
              <div className="text-[14px] text-left italic">
                by {podcast.artist}
              </div>
              <div className="w-full flex justify-center my-4">
                <div className="h-0.5 bg-gray-200 w-full" />
              </div>
              <div className="w-full text-left mb-1 font-semibold text-[14px]">
                Description:
              </div>
              <div className="text-gray-700 text-[14px] w-full text-left italic">
                {podcast.description}
              </div>
            </div>
          </Link>
        </aside>
        {/* Main content */}
        <main className="flex-1 flex flex-col gap-6">
          {isEpisodeRoute ? (
            <Outlet
              context={{
                episode: episodes?.filter(
                  (episode) => String(episode.trackId) === episodeId
                )?.[0],
              }}
            />
          ) : (
            <>
              {/* Episodes count card */}
              <div className="bg-white rounded-sm shadow-md shadow-gray-400 px-4 py-2 mb-4 w-full">
                <span className="font-bold">Episodes: {episodes.length}</span>
              </div>
              <div className="bg-white rounded-sm shadow-md shadow-gray-400 p-4 w-full">
                <EpisodesTable
                  id={id || ''}
                  episodes={episodes}
                  isLoading={isLoading}
                  error={error}
                />
              </div>
            </>
          )}
        </main>
      </div>
    </>
  )
}
