import { addons } from 'storybook/manager-api'

const DEFAULT_STORY_ID = 'foundations-colors--palette'

addons.register('marktichy/default-story', (api) => {
  const path = new URLSearchParams(window.location.search).get('path')
  if (!path || path === '/') {
    api.selectStory(DEFAULT_STORY_ID)
  }
})
