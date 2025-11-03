import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { mockPodcastsResponse } from '../api/mocks/podcasts'
import { Home } from './Home'

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function renderHome() {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/podcast/:id"
            element={<div>Podcast Details</div>}
          />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('Home', () => {
  const podcasts = mockPodcastsResponse.feed.entry

  it('renders image, title, and author for each podcast', async () => {
    server.use(
      http.get(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
        () => HttpResponse.json(mockPodcastsResponse)
      )
    )

    renderHome()

    await screen.findByText(podcasts[0]['im:name'].label)

    for (const podcast of podcasts) {
      const title = screen.getByText(podcast['im:name'].label)
      expect(title).toBeInTheDocument()

      const card = title.closest('a') as HTMLAnchorElement
      expect(
        within(card).getByAltText(`Cover art for ${podcast['im:name'].label}`)
      ).toBeInTheDocument()
      expect(
        within(card).getByText(`Author: ${podcast['im:artist'].label}`)
      ).toBeInTheDocument()
    }
  })

  it('navigates to podcast details on card click', async () => {
    const user = userEvent.setup()
    server.use(
      http.get(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
        () => HttpResponse.json(mockPodcastsResponse)
      )
    )

    renderHome()
    const card = await screen.findByText('Podcast One')
    user.click(card)

    expect(await screen.findByText('Podcast Details')).toBeInTheDocument()
  })
})
