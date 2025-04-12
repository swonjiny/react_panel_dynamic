// src/components/3D/RotatingCube.jsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'

export default function RotatingCube() {
    const meshRef = useRef()

    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta
        meshRef.current.rotation.y += delta * 0.5
    })

    return (
        <Box
            ref={meshRef}
            args={[1, 1, 1]}
            scale={1.5}
        >
            <meshStandardMaterial color="royalblue" />
        </Box>
    )
}
