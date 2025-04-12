import React, {useRef, useState, Suspense, useEffect, useMemo} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    OrbitControls,
    PerspectiveCamera,
    Environment,
    useGLTF,
    Text,
    Html,
    useTexture,
    Sky,
    Stats
} from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import * as THREE from 'three';

// 바닥 컴포넌트
function Floor(props) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));

    // 코드로 격자 텍스처 생성
    const gridTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const context = canvas.getContext('2d');

        // 배경 색상
        context.fillStyle = '#444444';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // 격자 그리기
        context.strokeStyle = '#555555';
        context.lineWidth = 2;
        const gridSize = 50; // 격자 셀 크기

        // 수직선
        for (let i = 0; i <= canvas.width; i += gridSize) {
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, canvas.height);
            context.stroke();
        }

        // 수평선
        for (let j = 0; j <= canvas.height; j += gridSize) {
            context.beginPath();
            context.moveTo(0, j);
            context.lineTo(canvas.width, j);
            context.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);
        return texture;
    }, []);

    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial map={gridTexture} />
        </mesh>
    );
}


// 물리 기반 상자 컴포넌트
function PhysicsBox({ position, color = 'white', size = [1, 1, 1] }) {
    const [ref, api] = useBox(() => ({ mass: 1, position }));
    const [hovered, setHovered] = useState(false);

    const handleClick = () => {
        api.velocity.set(0, 5, 0); // 클릭 시 위로 튀어오름
    };

    return (
        <mesh
            ref={ref}
            castShadow
            onClick={handleClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <boxGeometry args={size} />
            <meshLambertMaterial color={hovered ? '#f50057' : color} />
        </mesh>
    );
}

// 인터랙티브 텍스트
function FloatingText({ position, text, size = 1 }) {
    const ref = useRef();
    const { camera } = useThree();

    useFrame(() => {
        ref.current.quaternion.copy(camera.quaternion);
    });

    return (
        <Text
            ref={ref}
            position={position}
            fontSize={size}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
        >
            {text}
        </Text>
    );
}

// 로딩 인디케이터
function Loader() {
    return (
        <Html center>
            <div style={{ color: 'white', background: 'rgba(0,0,0,0.7)', padding: '20px', borderRadius: '8px' }}>
                <h3>로딩 중...</h3>
                <div style={{ width: '50px', height: '50px', border: '5px solid #333',
                    borderTop: '5px solid #fff', borderRadius: '50%',
                    animation: 'spin 1s linear infinite' }}></div>
                <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        </Html>
    );
}

// 메인 Scene3D 컴포넌트
export default function View({
                                    modelPath,
                                    enablePhysics = false,
                                    skyPreset = 'sunset',
                                    showStats = false,
                                    backgroundColor = "#101020",
                                    cameraPosition = [0, 5, 10]
                                }) {
    const [models, setModels] = useState([]);

    useEffect(() => {
        // 모델 데이터를 불러오는 예시
        if (modelPath) {
            setModels([{ path: modelPath, position: [0, 0, 0], scale: 1 }]);
        } else {
            // 기본 모델이 없으면 빈 배열
            setModels([]);
        }
    }, [modelPath]);

    return (
        <div style={{ width: '100%', height: '500px', position: 'relative' }}>
            <Canvas shadows camera={{ position: cameraPosition, fov: 75 }} style={{ background: backgroundColor }}>
                {/* 통계 표시 (선택적) */}
                {showStats && <Stats />}

                {/* 카메라 설정 */}
                <PerspectiveCamera makeDefault position={cameraPosition} />

                {/* 조명 설정 */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />

                {/* 환경 설정 */}
                <Sky sunPosition={[500, 150, -1000]} turbidity={10} rayleigh={0.5} preset={skyPreset} />

                {/* 물리 엔진 (선택적) */}
                {enablePhysics ? (
                    <Physics gravity={[0, -9.8, 0]}>
                        <Floor />
                        <PhysicsBox position={[0, 5, 0]} color="#2196f3" />
                        <PhysicsBox position={[1, 7, -1]} color="#4caf50" />
                        <PhysicsBox position={[-1, 9, 1]} color="#ff9800" />
                    </Physics>
                ) : (
                    // 물리 엔진 없는 경우 바닥만 표시
                    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                        <planeGeometry args={[20, 20]} />
                        <meshStandardMaterial color="#333333" />
                    </mesh>
                )}

                {/* 3D 모델 렌더링 */}
                <Suspense fallback={<Loader />}>
                    {models.length > 0 ? (
                        models.map((model, index) => (
                            <Model key={index} path={model.path} position={model.position} scale={model.scale} />
                        ))
                    ) : (
                        <>
                            <mesh position={[-2, 1, 0]} castShadow>
                                <sphereGeometry args={[1, 32, 32]} />
                                <meshStandardMaterial color="#f50057" roughness={0.4} metalness={0.7} />
                            </mesh>

                            <mesh position={[2, 1, 0]} castShadow>
                                <torusKnotGeometry args={[0.7, 0.3, 128, 32]} />
                                <meshStandardMaterial color="#2196f3" roughness={0.3} metalness={0.5} />
                            </mesh>

                            <FloatingText position={[0, 3, 0]} text="React Three Fiber" size={1} />
                        </>
                    )}

                    <Environment preset={skyPreset} background={false} />
                </Suspense>

                {/* 카메라 컨트롤 */}
                <OrbitControls target={[0, 1, 0]} maxPolarAngle={Math.PI / 2} />
            </Canvas>

            {/* 오버레이 UI 예시 */}
            <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                padding: '5px 10px',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                borderRadius: '4px',
                fontSize: '12px'
            }}>
                3D 장면에서 마우스 드래그로 회전, 스크롤로 확대/축소
            </div>
        </div>
    );
}

// 3D 모델 컴포넌트
function Model({ path, position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
    const { scene } = useGLTF(path);
    const model = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        model.current.rotation.y = rotation[1] + Math.sin(t / 4) * 0.2;
    });

    return (
        <primitive
            ref={model}
            object={scene}
            position={position}
            scale={scale}
            rotation={rotation}
            castShadow
        />
    );
}
