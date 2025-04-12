// src/components/3D/Scene3D.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import RotatingCube from './RotatingCube'
import styles from './Scene3D.module.css'

export default function Scene3D() {
    return (
        <div className={styles.scene3dContainer}>
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <RotatingCube />
            </Canvas>
        </div>
    )
}
