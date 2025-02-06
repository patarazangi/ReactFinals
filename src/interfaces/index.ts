export interface Image {
  id: string
  urls: { small: string }

  // rest of the keys
  [key: string]: any
}

export interface ImageStats {
  likes: number
  views: number
  downloads: number

  // rest of the keys
  [key: string]: any
}

export interface ImageCache {
  [key: string]: Image
}
