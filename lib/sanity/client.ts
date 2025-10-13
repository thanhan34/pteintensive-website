import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = '2023-05-03'

if (!projectId || !dataset) {
  throw new Error('Missing Sanity project ID or dataset. Please check your environment variables.')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published',
})

// Client for preview mode (always fresh data)
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  if (!source) return builder
  return builder.image(source)
}

// Helper function to get the appropriate client
export function getClient(preview = false) {
  return preview ? previewClient : client
}
