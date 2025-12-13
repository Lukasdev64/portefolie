"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Preload, Text, Instance, Instances } from "@react-three/drei"
import { useRef, Suspense, useState, useMemo } from "react"
import * as THREE from "three"

function WarpStars({ isWarping }: { isWarping: boolean }) {
  const count = 2000
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const stars = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100
      const y = (Math.random() - 0.5) * 100
      const z = (Math.random() - 0.5) * 100
      temp.push({ x, y, z, initialZ: z })
    }
    return temp
  }, [])

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Speed factor
    const speed = isWarping ? 50 : 2
    // Stretch factor
    const stretch = isWarping ? 20 : 1

    stars.forEach((star, i) => {
      // Move star towards camera (positive Z)
      star.z += delta * speed
      
      // Reset if passed camera
      if (star.z > 50) {
        star.z = -50
        star.x = (Math.random() - 0.5) * 100
        star.y = (Math.random() - 0.5) * 100
      }

      dummy.position.set(star.x, star.y, star.z)
      
      // Scale Z based on warp state
      dummy.scale.z = stretch
      dummy.scale.x = isWarping ? 0.2 : 1
      dummy.scale.y = isWarping ? 0.2 : 1
      
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.1, 0.1, 1]} />
      <meshBasicMaterial color="#e9d5ff" transparent opacity={isWarping ? 0.8 : 0.4} />
    </instancedMesh>
  )
}

function StarField({ isWarping, ...props }: { isWarping: boolean } & any) {
  // Keep the original starfield for background depth, but fade it out during warp
  const ref = useRef<any>(null)
  const [sphere] = useState(() => {
    const positions = new Float32Array(3000 * 3) // Reduced count
    for (let i = 0; i < 3000; i++) {
      const r = 30
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
      ref.current.rotation.x -= delta / 20
      ref.current.rotation.y -= delta / 30
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#4c1d95" // Darker purple
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={isWarping ? 0.2 : 0.8} // Fade out during warp
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
  const [consts] = useState(() => ({
    x: (Math.random() - 0.5) * 40,
    y: (Math.random() - 0.5) * 40,
    z: -15 - Math.random() * 10, // Pushed back behind text
    speed: 1.5 + Math.random(), // Random speed
    offset: Math.random() * 10
  }))
  
  useFrame((state) => {
    if (!ref.current) return
    const time = state.clock.getElapsedTime()
    const t = (time * consts.speed + consts.offset) % 5
    
    if (t < 0.5) {
      ref.current.position.x = consts.x + t * 10
      ref.current.position.y = consts.y - t * 10
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

export function Scene3D({ isWarping = false }: { isWarping?: boolean }) {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-black/0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Crawl />
          <StarField isWarping={isWarping} />
          <WarpStars isWarping={isWarping} />
          {Array.from({ length: 20 }).map((_, i) => (
            <ShootingStar key={i} />
          ))}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
