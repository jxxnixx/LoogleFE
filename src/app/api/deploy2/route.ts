import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	const response = await fetch(
		'https://api.github.com/repos/jxxnixx/LoogleFE/actions/workflows/deploy2.yml/dispatches',
		{
			method: 'POST',
			headers: {
				Authorization: `token ${process.env.DEPLOY_TOKEN}`,
				Accept: 'application/vnd.github.v3+json',
			},
			body: JSON.stringify({
				ref: 'main',
			}),
		}
	)

	if (response.ok) {
		return NextResponse.json({ message: 'Workflow triggered successfully' })
	} else {
		const errorData = await response.json()
		return NextResponse.json({ message: 'Failed to trigger workflow', error: errorData }, { status: response.status })
	}
}
