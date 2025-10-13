import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { codeInput } from '@sanity/code-input'

import { schemaTypes } from './lib/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'PTE Intensive Blog',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Posts')
              .child(
                S.documentTypeList('post')
                  .title('Posts')
                  .filter('_type == "post"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('Categories')
              .child(
                S.documentTypeList('category')
                  .title('Categories')
                  .filter('_type == "category"')
              ),
            S.listItem()
              .title('Authors')
              .child(
                S.documentTypeList('author')
                  .title('Authors')
                  .filter('_type == "author"')
              ),
          ])
    }),
    visionTool(),
    colorInput(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    productionUrl: async (prev, context) => {
      const { document } = context
      if (document._type === 'post' && document.slug && typeof document.slug === 'object' && 'current' in document.slug) {
        return `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${document.slug.current}`
      }
      return prev
    },
  },
})
