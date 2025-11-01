import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Episode } from './Episode'
import { Home } from './Home'
import './index.css'
import { Podcast } from './Podcast'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/podcast/:id"
              element={<Podcast />}
            >
              <Route
                path="episode/:episodeId"
                element={<Episode />}
              />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 lg:px-8">{children}</div>
    </div>
  )
}
