import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function Model() {
  const gltf = useGLTF('/isabelle-animal-crossing/source/Isabelle.glb')
  const { scene, animations } = gltf
  const modelRef = useRef<THREE.Group>(null)
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)

  useEffect(() => {
    if (scene) {
      // Center the model
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      scene.position.sub(center)
      
      // Scale the model 
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 6 / maxDim
      scene.scale.setScalar(scale)
    }

    // Setup animation mixer
    if (animations && animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(scene)
      
      // Log available animations to console
      console.log('Available animations:', animations.map((anim, i) => `${i}: ${anim.name}`))
      
      // Play all animations (or you can select specific ones)
      animations.forEach((clip) => {
        const action = mixerRef.current!.clipAction(clip)
        action.play()
      })
    }

    return () => {
      mixerRef.current?.stopAllAction()
    }
  }, [scene, animations])

  // Update animation mixer
  useFrame((_state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta)
    }
  })

  return <primitive ref={modelRef} object={scene} />
}

export function IsabelleModel() {
  return (
    <div className="mx-auto h-[300px] w-full max-w-[567px] md:h-[400px] lg:h-[500px]">
      <Canvas
        camera={{ position: [-3,4,11], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} />
        <pointLight position={[0, 2, 0]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
