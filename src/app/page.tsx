import React from 'react'

import Scene from '@/component/glassText'

export default function Home() {
	return (
		<main>
			<div
				style={{
					position: 'absolute',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					top: '50%',
					width: '100vw',
					height: '40px',
					zIndex: 1,
				}}>
				<input
					style={{
						minWidth: '380px',
						maxWidth: '500px',
						width: '50%',
						height: '100%',
						border: '1px solid navy',
						borderRadius: '20px',
						backgroundColor: 'white',
					}}></input>
			</div>
			<Scene />
		</main>
	)
}
