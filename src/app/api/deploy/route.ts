import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	const response = await fetch(
		'https://api.github.com/repos/jxxnixx/LoogleFE/actions/workflows/deploy.yml/dispatches',
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
		return NextResponse.json({ message: 'Deployment triggered' })
	} else {
		const errorMessage = await response.text() // 에러 메시지를 가져와서 리턴
		return NextResponse.json(
			{ message: 'Error triggering deployment', error: errorMessage },
			{ status: response.status }
		)
	}
}
