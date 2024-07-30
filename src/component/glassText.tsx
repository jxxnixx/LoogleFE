'use client'

import { Suspense, useEffect, useState } from 'react'
import { ContactShadows, Environment, Float, Lightformer, MeshTransmissionMaterial, Text3D } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'

type Props = {
	children?: string
}

const GlassText = ({ children }: Props) => {
	return (
		<Text3D
			font='/font/Lonely Coffee_Regular.json'
			size={2}
			height={1}
			curveSegments={12}
			bevelEnabled
			bevelThickness={0.3}
			bevelSize={0.04}
			bevelOffset={0}
			bevelSegments={5}
			position={[-5, 0.5, 0]}>
			{children}
			<MeshTransmissionMaterial
				thickness={0.5}
				roughness={0.1}
				transmission={1}
				ior={1.5}
				specularIntensity={1}
				color='#c1d8ff'
			/>
			{/* <meshPhysicalMaterial
				color='#c1d8ff'
				transmission={1}
				opacity={1}
				roughness={0}
				metalness={0}
				clearcoat={1}
				iridescence={1}
				ior={2}
				clearcoatRoughness={1}
				reflectivity={1}
				transparent
				specularIntensity={1}
			/> */}
		</Text3D>
	)
}

const Rig = () => {
	const [cursorVisible, setCursorVisible] = useState(true)
	const { gl } = useThree()

	useEffect(() => {
		const handleMouseLeave = () => setCursorVisible(false)
		const handleMouseEnter = () => setCursorVisible(true)

		gl.domElement.addEventListener('mouseleave', handleMouseLeave)
		gl.domElement.addEventListener('mouseenter', handleMouseEnter)

		return () => {
			gl.domElement.removeEventListener('mouseleave', handleMouseLeave)
			gl.domElement.removeEventListener('mouseenter', handleMouseEnter)
		}
	}, [gl])

	useFrame((state, delta) => {
		const pointer = cursorVisible ? state.pointer : { x: 0, y: 0 }
		easing.damp3(
			state.camera.position,
			[Math.sin(-pointer.x) * 5, Math.sin(-pointer.y) * 5, 15 + Math.cos(pointer.x) * 3],
			0.2,
			delta
		)
		state.camera.lookAt(0, 0, 0)
	})

	return null
}

const Scene = () => {
	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
				<color attach='background' args={['#c1d8ff']} />

				<spotLight position={[20, 20, -10]} penumbra={1} castShadow angle={0.2} />
				<ambientLight intensity={0.5} />
				<directionalLight intensity={0.5} position={[-5, 5, -15]} />
				<pointLight intensity={0.5} position={[-5, -5, -10]} />

				<ContactShadows scale={100} position={[0, -5.5, 0]} blur={1} far={100} opacity={0.85} />

				<Environment>
					<color attach='background' args={['#c1d8ff']} />
					<Lightformer
						intensity={8}
						position={[10, 5, -10]}
						scale={[10, 50, 1]}
						onUpdate={(self) => self.lookAt(0, 0, 0)}
					/>
				</Environment>

				<Suspense fallback={null}>
					<Float floatIntensity={2}>
						<GlassText>LOOGLE</GlassText>
					</Float>
				</Suspense>

				<Rig />

				<ambientLight intensity={Math.PI / 2} />
				<directionalLight intensity={1} castShadow position={[1, 1, 10]} />
			</Canvas>
		</div>
	)
}

export default Scene
