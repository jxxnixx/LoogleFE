import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	const response = await fetch(
		'https://api.github.com/repos/jxxnixx/LoogleFE/actions/workflows/deploy.yml/dispatches',
		{
			method: 'POST',
			headers: {
				Authorization: `token ${process.env.DEPLOY_TOKEN}`,
				Accept: 'application/vnd.github+json',
			},
			body: JSON.stringify({
				ref: 'main',
			}),
		}
	)

	if (response.ok) {
		return NextResponse.json({ message: 'Deployment triggered' })
	} else {
		const errorMessage = await response.text()

		return NextResponse.json(
			{ message: 'Error triggering deployment', error: errorMessage },
			{ status: response.status }
		)
	}
}
