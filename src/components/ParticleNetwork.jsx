import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

// A dynamic wave of particles resembling a digital terrain or data flow
function DigitalTerrain({ count = 1500, color = "#00F0FF" }) {
    const mesh = useRef();
    const { viewport } = useThree();
    // Responsive width for terrain
    const terrainWidth = viewport.width > 20 ? viewport.width : 20;

    // Use TypedArray for improved performance
    const particles = useMemo(() => {
        const data = new Float32Array(count * 5); // x, y, z, factor, speed

        for (let i = 0; i < count; i++) {
            const i5 = i * 5;
            data[i5] = (Math.random() - 0.5) * terrainWidth * 1.5;     // x
            data[i5 + 1] = -4;                                         // y
            data[i5 + 2] = (Math.random() - 0.5) * 40;                 // z
            data[i5 + 3] = Math.random() * 10;                         // factor
            data[i5 + 4] = Math.random() * 0.5 + 0.5;                  // speed
        }
        return data;
    }, [count, terrainWidth]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!mesh.current) return;

        const t = state.clock.getElapsedTime();

        for (let i = 0; i < count; i++) {
            const i5 = i * 5;
            const x = particles[i5];
            const y = particles[i5 + 1];
            const z = particles[i5 + 2];
            // factor is particles[i5 + 3] - unused in simple wave but kept for structure
            const speed = particles[i5 + 4];

            // Wave equation
            const yOffset = Math.sin(t * speed + x * 0.2) * Math.cos(t * 0.3 + z * 0.2) * 1.5;

            dummy.position.set(x, y + yOffset, z);

            // Pulse scale slightly based on wave height
            const s = Math.max(0.2, 1 + yOffset * 0.5) * 0.05;
            dummy.scale.set(s, s, s);

            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        }
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]} frustumCulled={false}>
            <sphereGeometry args={[1, 6, 6]} /> {/* Reduced geometry complexity */}
            <meshBasicMaterial color={color} transparent opacity={0.4} depthWrite={false} />
        </instancedMesh>
    );
}

// Geometric floating shapes for depth
function GeometricFloaters() {
    const [hovered, setHovered] = useState(null);

    return (
        <group>
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
                <mesh
                    position={[4, 2, -2]}
                    rotation={[0, 0.5, 0]}
                    onPointerOver={() => setHovered('cone')}
                    onPointerOut={() => setHovered(null)}
                    scale={hovered === 'cone' ? 1.2 : 1}
                >
                    <coneGeometry args={[0.5, 1, 4]} />
                    <meshStandardMaterial
                        color={hovered === 'cone' ? "#00F0FF" : "#BD00FF"}
                        wireframe
                        emissive={hovered === 'cone' ? "#00F0FF" : "#000000"}
                        emissiveIntensity={2}
                    />
                </mesh>
            </Float>
            <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
                <mesh
                    position={[-4, -2, -3]}
                    rotation={[0.5, 0, 0]}
                    onPointerOver={() => setHovered('oct')}
                    onPointerOut={() => setHovered(null)}
                    scale={hovered === 'oct' ? 1.2 : 1}
                >
                    <octahedronGeometry args={[0.7]} />
                    <meshStandardMaterial
                        color={hovered === 'oct' ? "#BD00FF" : "#00F0FF"}
                        wireframe
                        emissive={hovered === 'oct' ? "#BD00FF" : "#000000"}
                        emissiveIntensity={2}
                    />
                </mesh>
            </Float>
            <Float speed={2.5} rotationIntensity={2} floatIntensity={1}>
                <mesh
                    position={[-3, 4, -5]}
                    onPointerOver={() => setHovered('torus')}
                    onPointerOut={() => setHovered(null)}
                    scale={hovered === 'torus' ? 1.2 : 1}
                >
                    <torusKnotGeometry args={[0.4, 0.1, 64, 8]} />
                    <meshStandardMaterial
                        color={hovered === 'torus' ? "#ffffff" : "#BD00FF"}
                        wireframe
                        transparent
                        opacity={0.3}
                        emissive={hovered === 'torus' ? "#ffffff" : "#000000"}
                        emissiveIntensity={0.5}

                    />
                </mesh>
            </Float>
        </group>
    );
}

// Central Hero Object - Abstract Tech Core
function TechCore() {
    const mesh = useRef();
    const outerMesh = useRef();
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();
        if (mesh.current && outerMesh.current) {
            // Rotate core
            mesh.current.rotation.x = t * (hovered ? 0.5 : 0.1);
            mesh.current.rotation.y = t * (hovered ? 0.8 : 0.15);

            // Rotate outer shell oppposite
            outerMesh.current.rotation.x = -t * (hovered ? 0.2 : 0.05);
            outerMesh.current.rotation.z = t * (hovered ? 0.2 : 0.05);

            // Pulse size & Color transition
            const targetColor = hovered ? new THREE.Color("#00F0FF") : new THREE.Color("#0a0a0a");
            const targetEmissive = hovered ? new THREE.Color("#00F0FF") : new THREE.Color("#1a1a1a");

            easing.dampC(mesh.current.material.color, targetColor, 0.2, delta);
            easing.dampC(mesh.current.material.emissive, targetEmissive, 0.2, delta);

            const scale = 1 + Math.sin(t) * 0.05;
            const targetScale = hovered ? 1.2 : scale;

            easing.damp3(mesh.current.scale, [targetScale, targetScale, targetScale], 0.2, delta);
        }
    });

    return (
        <group>
            {/* Inner Solid Core */}
            <mesh
                ref={mesh}
                onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
                onPointerOut={() => setHover(false)}
            >
                <icosahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial
                    roughness={0.1}
                    metalness={0.9}
                />
            </mesh>

            {/* Outer Wireframe Shield */}
            <group ref={outerMesh}>
                <mesh scale={[1.8, 1.8, 1.8]} rotation={[0.5, 0.5, 0]}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshBasicMaterial wireframe color="#00F0FF" transparent opacity={0.1} />
                </mesh>
                <mesh scale={[2.2, 2.2, 2.2]} rotation={[-0.5, -0.5, 0]}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshBasicMaterial wireframe color="#BD00FF" transparent opacity={0.05} />
                </mesh>
            </group>
        </group>
    );
}


export default function ParticleNetwork() {
    return (
        <>
            {/* Cinematic Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
            <pointLight position={[-10, -5, -10]} intensity={1} color="#BD00FF" />
            <spotLight
                position={[0, 15, 0]}
                angle={0.3}
                penumbra={1}
                intensity={0.5}
                color="#ffffff"
            />

            {/* Elements */}
            <TechCore />
            <DigitalTerrain count={3000} color="#00F0FF" />
            <GeometricFloaters />

            {/* Background Atmosphere */}
            <Stars
                radius={80}
                depth={50}
                count={3000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />
        </>
    );
}
