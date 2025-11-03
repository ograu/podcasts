import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import './index.css'
import { EpisodeDetails } from './pages/EpisodeDetails'
import { Home } from './pages/Home'
import { PodcastDetails } from './pages/PodcastDetails'
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
              element={<PodcastDetails />}
            >
              <Route
                path="episode/:episodeId"
                element={<EpisodeDetails />}
              />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
