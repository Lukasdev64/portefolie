"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei"
import { useRef, Suspense } from "react"
import * as THREE from "three"

function FloatingShape({ position, color, scale, delay = 0 }: { position: [number, number, number], color: string, scale: number, delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 + delay
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 + delay
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={position}>
      <mesh ref={meshRef} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.4}
          metalness={0.6}
          wireframe
        />
      </mesh>
    </Float>
  )
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          
          {/* Left Shape */}
          <FloatingShape position={[-6, 0, 0]} color="#8b5cf6" scale={2.5} delay={0} />
          
          {/* Right Shape */}
          <FloatingShape position={[6, 1, 0]} color="#7c3aed" scale={2} delay={2} />
          
          {/* Top Right Small */}
          <FloatingShape position={[4, 4, -2]} color="#a78bfa" scale={1} delay={1} />
          
          {/* Bottom Left Small */}
          <FloatingShape position={[-4, -4, -2]} color="#6d28d9" scale={1.5} delay={3} />
        </Suspense>
      </Canvas>
    </div>
  )
}
