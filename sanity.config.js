import {defineConfig, defineType} from 'sanity'
import {deskTool} from 'sanity/desk'
import {youtubeInput} from './src'

export default defineConfig({
  name: 'default',
  title: 'sanity-plugin-youtube-input',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  plugins: [
    deskTool(),
    youtubeInput({
      apiKey: process.env.SANITY_STUDIO_GOOGLE_API_KEY,
    }),
  ],
  schema: {
    types: [
      defineType({
        name: 'youtubeEmbed',
        type: 'document',
        fields: [
          {name: 'title', type: 'string'},
          {name: 'video', type: 'youtubeVideo'},
        ],
      }),
    ],
  },
})
