/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ['three'],
	sassOptions: {
		additionalData: `@use '/src/scss/abstracts/index' as *;`,
	},
	async rewrites() {
		return [
			{
				source: '/:path*',
				destination: process.env.NEXT_PUBLIC_LOOGLE_BASE + '/:path*',
			},
		]
	},
}
const withImages = require('next-images')
module.exports = withImages()

module.exports = nextConfig
