type Label = {
  label: string
}

export type PodcastsResponse = {
  feed: {
    entry: {
      id: {
        attributes: {
          ['im:id']: string
        }
      }
      ['im:name']: Label
      ['im:artist']: Label
      ['im:image']: Label[]
      summary: Label
    }[]
  }
}

export type Podcast = {
  id: string
  title: string
  artist: string
  image: string
  description: string
}

export type EpisodesResponse = {
  results: {
    episodeUrl: string
    releaseDate: string
    shortDescription: string
    trackId: number
    trackName: string
    trackTimeMillis: number
    wrapperType: 'track' | 'podcastEpisode'
  }[]
}

export type Episode = {
  episodeUrl: string
  releaseDate: string
  shortDescription: string
  trackId: number
  trackName: string
  trackTimeMillis: number
}
