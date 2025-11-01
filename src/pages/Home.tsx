import { useQuery } from '@tanstack/react-query'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'

export const Home = () => {
  const { data, error, isLoading } = useQuery({
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
  })

  const [filter, setFilter] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

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
      <Header isLoading={isLoading} />
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
          <Link
            key={podcast.id?.attributes['im:id']}
            to={`/podcast/${podcast.id?.attributes['im:id']}`}
            className="bg-white rounded-sm shadow-lg shadow-gray-400 p-4 flex flex-col items-center cursor-pointer hover:bg-blue-50 transition no-underline"
          >
            <img
              src={podcast['im:image']?.[2]?.label}
              alt={podcast['im:name']?.label}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <div className="font-bold text-center mb-2 uppercase">
              {podcast['im:name']?.label}
            </div>
            <div className="text-gray-500 text-sm text-center">
              Author: {podcast['im:artist']?.label}
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
