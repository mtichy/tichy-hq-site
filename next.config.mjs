/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const defaultStorybook =
      '/storybook?path=/story/foundations-colors--palette'
    return [
      // Bare /storybook (and path=/) leaves Storybook with an empty story id,
      // so the canvas toolbar never registers. Send visitors to a real story.
      {
        source: '/storybook',
        missing: [{ type: 'query', key: 'path' }],
        destination: defaultStorybook,
        permanent: false,
      },
      {
        source: '/storybook',
        has: [{ type: 'query', key: 'path', value: '/' }],
        destination: defaultStorybook,
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      // Browser URL stays /storybook (no trailing slash). Relative Storybook
      // assets are resolved via <base href="/storybook/"> injected at publish.
      {
        source: '/storybook',
        destination: '/storybook/index.html',
      },
    ]
  },
}

export default nextConfig
