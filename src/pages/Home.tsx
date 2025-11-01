import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetPodcast } from '../api/useGetPodcast'
import { Header } from '../components/Header'

export const Home = () => {
  const { data: podcasts, error, isLoading } = useGetPodcast()
  const [filter, setFilter] = useState('')

  const filteredPodcasts = useMemo(() => {
    if (!podcasts) return []
    if (!filter) return podcasts

    const lower = filter.toLowerCase()

    return podcasts.filter(({ title, artist }) => {
      return (
        title.toLowerCase().includes(lower) ||
        artist.toLowerCase().includes(lower)
      )
    })
  }, [podcasts, filter])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

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
        {filteredPodcasts.map((podcast) => (
          <Link
            key={podcast.id}
            to={`/podcast/${podcast.id}`}
            className="bg-white rounded-sm shadow-lg shadow-gray-400 p-4 flex flex-col items-center cursor-pointer hover:bg-blue-50 transition no-underline"
          >
            <img
              src={podcast.image}
              alt={podcast.title}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <div className="font-bold text-center mb-2 uppercase">
              {podcast.title}
            </div>
            <div className="text-gray-500 text-sm text-center">
              Author: {podcast.artist}
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
