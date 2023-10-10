import {defineConfig, defineType} from 'sanity'
import {deskTool} from 'sanity/desk'
import {youtubeInput} from './src'
import vars from './.sanity.json'

export default defineConfig({
  name: 'default',
  title: 'sanity-plugin-youtube-input',
  projectId: vars.projectId,
  dataset: vars.dataset,
  plugins: [
    deskTool(),
    youtubeInput({
      apiKey: vars.googleApiKey,
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
