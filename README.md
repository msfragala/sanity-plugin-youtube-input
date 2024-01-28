# sanity-plugin-youtube-input

**:sparkles: Enriched YouTube video data for Sanity. :sparkles:**

Enrich the YouTube videos in your Sanity studio with metadata pulled from Google's YouTube Data API, along with in-studio embeds so you can preview and play videos right in your studio. Enter any valid YouTube video URL and this plugin populates the video's title, description, published date, and supported thumbnails for you.

## Installation

```sh
npm install sanity-plugin-youtube-input
```

## Setup

Add it as a plugin in `sanity.config.ts`:

```ts
import { defineConfig } from 'sanity'
import { youtubeInput } from 'sanity-plugin-youtube-input'

export default defineConfig({
  plugins: [
    youtubeInput({ apiKey: '<your-google-api-key>' })
  ],
})
```

You'll need a Google API token with access to the [YouTube Data API](https://developers.google.com/youtube/v3/getting-started). If you don't already have one, you can create an API token in the [Google API Console](https://console.cloud.google.com). Follow this [guide](https://developers.google.com/youtube/registering_an_application) from the YouTube Data API docs if you aren't sure how to do so.

## Usage

This plugin adds a `youtubeVideo` type to your schema. Use this type to create a field for YouTube videos with enriched data, like in this example of a content model for YouTube embeds:

```ts
defineType({
  name: 'youtubeEmbed,
  type: 'object',
  fields: [
    {
      name: 'video',
      type: 'youtubeVideo',
    },
    {
      name: 'autoplay',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'controls',
      type: 'boolean',
      initialValue: true,
    },
  ]
})
```

## Screenshots

<img alt="" width="600" src="https://github.com/msfragala/sanity-plugin-youtube-input/assets/13405208/9fd6560e-7eb0-4284-bda1-0cb0b7b7afc0">

<img alt="" width="600" src="https://github.com/msfragala/sanity-plugin-youtube-input/assets/13405208/2325e5cb-fc42-4a12-a1ce-7cd3d3cb6648">

## License

[MIT](LICENSE) © Mitchell Fragala
