"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Preload, Text } from "@react-three/drei"
import { useRef, Suspense, useState } from "react"
import * as THREE from "three"

function StarField(props: any) {
  const ref = useRef<any>(null)
  const [sphere] = useState(() => {
    const positions = new Float32Array(6000 * 3)
    for (let i = 0; i < 6000; i++) {
      const r = 25
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      
      const dist = r + (Math.random() - 0.5) * 10
      
      positions[i * 3] = dist * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = dist * Math.cos(phi)
    }
    return positions
  })

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15
      ref.current.rotation.y -= delta / 20
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

function BrightStars() {
  const ref = useRef<any>(null)
  const [positions] = useState(() => {
    const pos = new Float32Array(300 * 3)
    for (let i = 0; i < 300; i++) {
      const r = 20
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      const dist = r + (Math.random() - 0.5) * 5
      pos[i * 3] = dist * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = dist * Math.cos(phi)
    }
    return pos
  })

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20
      ref.current.rotation.y -= delta / 25
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 3]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

function Crawl() {
  const group = useRef<any>(null)
  
  useFrame((state, delta) => {
    if (group.current) {
      group.current.position.y += delta * 1.5
      if (group.current.position.y > 40) {
        group.current.position.y = -40
      }
    }
  })

  return (
    <group rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, -5]}>
      <group ref={group} position={[0, -40, 0]}>
        <Text
          color="#fbbf24"
          fontSize={1.5}
          maxWidth={12}
          lineHeight={1.4}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.15}
        >
          {`ÉPISODE 2025\n\nLE RÉVEIL DU PORTFOLIO\n\nC'est une époque de développement web moderne.\nLe développeur rebelle Lukas Andries\nfrappe depuis une base cachée\nutilisant Next.js et React.\n\nArmé de TypeScript,\nil combat les bugs et\nles problèmes de performance à travers\nla galaxie.\n\nÉvitant le redoutable Code Spaghetti,\nil a établi une nouvelle\nbase secrète sur le système\néloigné de Vercel...`}
        </Text>
      </group>
    </group>
  )
}

function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null)
  const [startPos] = useState(() => ({
    x: (Math.random() - 0.5) * 40,
    y: (Math.random() - 0.5) * 40,
    z: (Math.random() - 0.5) * 20
  }))
  
  useFrame((state) => {
    if (!ref.current) return
    const time = state.clock.getElapsedTime()
    const t = (time * 2 + startPos.x) % 5
    
    if (t < 0.5) {
      ref.current.position.x = startPos.x + t * 10
      ref.current.position.y = startPos.y - t * 10
      ref.current.scale.setScalar(1 - t * 2)
      ref.current.visible = true
    } else {
      ref.current.visible = false
    }
  })

  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
    </mesh>
  )
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-black/0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Crawl />
          <StarField />
          <BrightStars />
          {Array.from({ length: 5 }).map((_, i) => (
            <ShootingStar key={i} />
          ))}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
