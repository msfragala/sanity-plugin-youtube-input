import {defineCliConfig} from 'sanity/cli'
import vars from './sanity.json'

export default defineCliConfig({
  api: {
    projectId: vars.projectId,
    dataset: vars.dataset,
  },
})
