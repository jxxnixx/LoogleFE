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

type Props = {
	character: string
	index: number
}

const GlassText = ({ character, index }: Props) => {
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
const BackgroundPlane = () => {
	const backgroundTexture = useLoader(TextureLoader, '/image/gradientBackground.png')

	return (
		<mesh castShadow receiveShadow>
			<color attach='background' args={['white']} />
			<meshBasicMaterial color={'#fff'} />
			{/* <meshBasicMaterial map={backgroundTexture} opacity={1} color={'#fff'} /> */}
		</mesh>
	)
}

const Scene = () => {
	const text = 'LOOGLE'

	return (
		<div style={{ width: '100vw', height: '100vh', backgroundColor: '#fff' }}>
			<Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
				{/* <color attach='background' args={['#fff']} /> */}

				{/* <spotLight position={[20, 20, -10]} penumbra={1} castShadow angle={0.2} />
				<ambientLight intensity={0.5} />
				<directionalLight intensity={0.5} position={[-5, 5, -15]} />
				<pointLight intensity={0.5} position={[-5, -5, -10]} /> */}
				{/* 
				<pointLight intensity={1} position={[10, 10, 10]} />
				<pointLight intensity={1} position={[-10, -10, 10]} />
				<pointLight intensity={1} position={[10, -10, -10]} />
				<pointLight intensity={1} position={[-10, 10, -10]} />
				<pointLight intensity={1} position={[0, 10, 0]} />
				<pointLight intensity={1} position={[0, -10, 0]} /> */}

				{/* <ContactShadows scale={100} position={[0, -5.5, 0]} blur={1} far={100} opacity={0.85} /> */}

				{/* <Environment preset='dawn' background> */}
				<Environment files='/image/sky.hdr' background backgroundBlurriness={0.2} backgroundIntensity={2}>
					{/* <Lightformer
						intensity={20}
						position={[10, 50, -10]}
						scale={[1, 50, 1]}
						onUpdate={(self) => self.lookAt(0, 0, 0)}
					/> */}
				</Environment>

				<Suspense fallback={null}>
					<BackgroundPlane />
					{text.split('').map((char, index) => (
						<GlassText key={index} character={char} index={index} />
					))}
				</Suspense>

				{/* <ambientLight intensity={Math.PI / 2} /> */}
				{/* <directionalLight intensity={1} castShadow position={[1, 1, 10]} /> */}
			</Canvas>
		</div>
	)
}

export default Scene
