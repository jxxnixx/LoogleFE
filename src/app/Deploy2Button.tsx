'use client'

import React from 'react'

const Deploy2Button = () => {
	const triggerDeployment = async () => {
		const response = await fetch('/api/deploy2', { method: 'POST' })

		if (response.ok) {
			alert('Deployment triggered!')
		} else {
			const { message, error } = await response.json() // 에러 메시지 추출
			alert(`Failed to trigger deployment: ${message} - ${error}`)
		}
	}

	return <button onClick={triggerDeployment}>Deploy 2</button>
}

export default Deploy2Button
