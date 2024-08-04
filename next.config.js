/** @type {import('next').NextConfig} */

const nextConfig = {
	output: 'standalone',
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
	async redirects() {
		return [
			{
				source: '/:path*',
				has: [
					{
						type: 'custom',
						value: (req) => {
							return !req.query?.path
						},
					},
				],
				destination: '/',
				permanent: false,
			},
		]
	},

	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img1.shopcider.com',
				port: '',
				pathname: '/**',
			},
		],
	},
}
const withImages = require('next-images')
module.exports = withImages(nextConfig)
