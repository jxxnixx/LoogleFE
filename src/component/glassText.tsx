'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import {
	ContactShadows,
	Environment,
	Float,
	Image,
	Lightformer,
	MeshTransmissionMaterial,
	Text3D,
	useTexture,
} from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader } from 'three'

type GlassProps = {
	character: string
	index: number
}

const Text = ({ character, index }: GlassProps) => {
	const [hovered, setHovered] = useState(false)
	const [position, setPosition] = useState(new THREE.Vector3(index * 2 - 6, 0.5, 0))
	const targetPosition = new THREE.Vector3(index * 2 - 6, hovered ? 1 : 0.5, 0)

	useFrame((state, delta) => {
		position.lerp(targetPosition, delta * 5)
		setPosition(position.clone())
	})

	return (
		<Float floatIntensity={2.5} speed={index + 1}>
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
				position={position}
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}>
				{character}

				<MeshTransmissionMaterial
					color={'lightblue'}
					opacity={1}
					metalness={0}
					roughness={0}
					transmission={1}
					ior={3}
					thickness={0}
					specularIntensity={1}
					specularColor='white'
					envMapIntensity={1}
					reflectivity={1}
					iridescence={0}
					iridescenceIOR={1}
					clearcoat={1}
					clearcoatRoughness={0}
				/>
			</Text3D>
		</Float>
	)
}

const GlassText = () => {
	const text = 'LOOGLE'

	return (
		<div style={{ width: '100vw', height: '100vh', backgroundColor: '#fff' }}>
			<Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
				<Environment
					files='/image/sky.hdr'
					background
					backgroundBlurriness={0.1}
					backgroundIntensity={2.5}></Environment>

				<Suspense fallback={null}>
					{text.split('').map((char, index) => (
						<Text key={index} character={char} index={index} />
					))}
				</Suspense>
			</Canvas>
		</div>
	)
}

export default GlassText
