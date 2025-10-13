'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

// Disable SSR for the studio page
export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}
