import { useQuery } from '@tanstack/react-query'
import type { Podcast, PodcastsResponse } from '../types'

export const useGetPodcast = () => {
  return useQuery<PodcastsResponse, Error, Podcast[]>({
    queryKey: ['podcasts'],
    queryFn: async () => {
      const res = await fetch(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
      )
      if (!res.ok) throw new Error('Network response was not ok')
      const json = await res.json()

      return json
    },
    staleTime: 24 * 60 * 60 * 1000,
    select: (data) => {
      const podcasts = data?.feed?.entry || []
      return podcasts.map((podcast) => ({
        id: podcast.id?.attributes['im:id'],
        title: podcast['im:name']?.label,
        artist: podcast['im:artist']?.label,
        image: podcast['im:image']?.[0]?.label,
        description: podcast?.summary?.label || '',
      }))
    },
  })
}
