import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function CameraAdjuster() {
  const { camera, size, gl } = useThree()
  
  useEffect(() => {
    if (camera.type === 'PerspectiveCamera') {
      const perspCamera = camera as THREE.PerspectiveCamera
      const aspect = size.width / size.height
      
      // Adjust FOV based on aspect ratio to prevent cropping
      // Only increase FOV when aspect ratio is narrow (< 0.8)
      if (aspect < 0.8) {
        // Map aspect ratio 0.5-0.8 to FOV 60-45
        perspCamera.fov = 45 + (0.8 - aspect) * 50
      } else {
        perspCamera.fov = 45
      }
      
      perspCamera.aspect = aspect
      perspCamera.updateProjectionMatrix()
    }
  }, [camera, size, gl])
  
  return null
}

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
      const scale = 5 / maxDim
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
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div 
      ref={containerRef}
      className="relative mx-auto w-full max-w-[600px] h-[300px] md:h-[400px] lg:h-[500px]"
    >
      <Canvas
        camera={{ 
          position: [-3, 4, 11], 
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        }}
      >
        <CameraAdjuster />
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
