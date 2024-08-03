/** @type {import('next').NextConfig} */

const nextConfig = {
	transpilePackages: ['three'],
	sassOptions: {
		additionalData: `@use '/src/scss/abstracts/index' as *;`,
	},
}

module.exports = nextConfig
