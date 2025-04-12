import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { Button, Slider } from 'antd';
import { ZoomOutOutlined, ZoomInOutlined, ReloadOutlined } from '@ant-design/icons';


// 기본 3D 모델 컴포넌트
const Model = ({ color = 'royalblue' }) => {
    const meshRef = useRef();

    // 간단한 애니메이션
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};

// 조명 설정 컴포넌트
const Lights = () => {
    const directionalLightRef = useRef();
    // 개발 모드에서만 조명 헬퍼를 표시
    useHelper(directionalLightRef, import.meta.env.DEV ? THREE.DirectionalLightHelper : null, 1);

    return (
        <>
            <ambientLight intensity={0.3} />
            <directionalLight
                ref={directionalLightRef}
                position={[5, 5, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />
        </>
    );
};

// 메인 컴포넌트
const ZoomableScene3D = () => {
    const controlsRef = useRef();
    const [cameraPosition, setCameraPosition] = useState([3, 3, 3]);
    const [zoomLevel, setZoomLevel] = useState(1);

    // 확대 함수
    const zoomIn = () => {
        if (zoomLevel < 2) {
            const newZoom = zoomLevel + 0.1;
            setZoomLevel(newZoom);
            if (controlsRef.current) {
                controlsRef.current.dollyIn(1.1);
                controlsRef.current.update();
            }
        }
    };

    // 축소 함수
    const zoomOut = () => {
        if (zoomLevel > 0.5) {
            const newZoom = zoomLevel - 0.1;
            setZoomLevel(newZoom);
            if (controlsRef.current) {
                controlsRef.current.dollyOut(1.1);
                controlsRef.current.update();
            }
        }
    };

    // 초기화 함수
    const resetView = () => {
        setCameraPosition([3, 3, 3]);
        setZoomLevel(1);
        if (controlsRef.current) {
            controlsRef.current.reset();
        }
    };

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Canvas shadows>
                <PerspectiveCamera
                    makeDefault
                    position={cameraPosition}
                    fov={75}
                />
                <OrbitControls
                    ref={controlsRef}
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    zoomSpeed={1}
                    panSpeed={1}
                    rotateSpeed={1}
                />
                <Environment preset="city" />
                <Lights />
                <Model />
                <axesHelper args={[5]} />
                <gridHelper args={[10, 10]} />
            </Canvas>

            {/* 확대/축소 컨트롤 패널 */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 500,
                    left: 20,
                    background: 'rgba(255, 255, 255, 0.7)',
                    padding: 10,
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10
                }}
            >
                <Button icon={<ZoomInOutlined />} onClick={zoomIn} />
                <Slider
                    value={zoomLevel}
                    min={0.5}
                    max={2}
                    step={0.1}
                    onChange={(value) => {
                        setZoomLevel(value);
                        if (controlsRef.current) {
                            // 현재 줌 레벨과 새 줌 레벨의 비율만큼 확대/축소
                            const ratio = value / zoomLevel;
                            if (ratio > 1) {
                                controlsRef.current.dollyIn(ratio);
                            } else {
                                controlsRef.current.dollyOut(1 / ratio);
                            }
                            controlsRef.current.update();
                        }
                    }}
                    vertical
                    style={{ height: 100 }}
                />
                <Button icon={<ZoomOutOutlined />} onClick={zoomOut} />
                <Button icon={<ReloadOutlined />} onClick={resetView} />
            </div>
        </div>
    );
};

export default ZoomableScene3D;
