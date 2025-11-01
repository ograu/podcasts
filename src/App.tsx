import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
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
