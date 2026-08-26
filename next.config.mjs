/** @type {import('next').NextConfig} */
const nextConfig = {
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
