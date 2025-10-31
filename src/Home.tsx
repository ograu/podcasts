import { useQuery } from '@tanstack/react-query'
import React, { useMemo, useState } from 'react'
import { Header } from './components/Header'
import { useDebouncedCallback } from './hooks/useDeboounceCallback'

export function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['podcasts'],
    queryFn: async () => {
      const cacheKey = 'podcasts_cache_v1'
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
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
      )
      if (!res.ok) throw new Error('Network response was not ok')
      const json = await res.json()
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ data: json, timestamp: Date.now() })
      )
      return json
    },
  })

  const [filter, setFilter] = useState('')

  const { debounced: handleInputChange } = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value)
    },
    500
  )

  const podcasts = data?.feed?.entry || []

  const filteredPodcasts = useMemo(() => {
    if (!filter) return podcasts
    const lower = filter.toLowerCase()
    return podcasts.filter((podcast: any) => {
      const title = podcast['im:name']?.label?.toLowerCase() || ''
      const author = podcast['im:artist']?.label?.toLowerCase() || ''
      return title.includes(lower) || author.includes(lower)
    })
  }, [podcasts, filter])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {(error as Error).message}</div>

  return (
    <>
      <Header title="Home" />
      <div className="flex items-center justify-end mb-4 pr-[50px]">
        <span className="rounded-lg bg-[#5ea5cf] text-white px-2 text-base font-semibold mr-3">
          {filteredPodcasts.length}
        </span>
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="Filter podcasts..."
          className="border border-gray-300 rounded px-3 py-1 text-sm w-64 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredPodcasts.map((podcast: any) => (
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
    </>
  )
}
