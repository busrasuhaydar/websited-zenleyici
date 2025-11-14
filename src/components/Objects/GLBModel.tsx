import { useRef, useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import type { Mesh, Material, Color, Object3D } from 'three'
import type { MaterialProps } from '../../types/scene'

interface GLBModelProps {
  url: string
  material?: MaterialProps
  onClick?: (event?: any) => void
  isSelected?: boolean
}

export const GLBModel: React.FC<GLBModelProps> = ({
  url,
  material,
  onClick,
}) => {
  const groupRef = useRef<any>(null)

  try {
    const gltf = useLoader(GLTFLoader, url)

    useEffect(() => {
      if (gltf && material && groupRef.current) {
        groupRef.current.traverse((child: Object3D) => {
          if ((child as Mesh).isMesh) {
            const mesh = child as Mesh
            if (mesh.material) {
              const mat = mesh.material as Material & {
                color?: Color
                metalness?: number
                roughness?: number
                transparent?: boolean
                opacity?: number
                wireframe?: boolean
              }

              if (material.color && mat.color) {
                mat.color.set(material.color)
              }
              if (material.metalness !== undefined) mat.metalness = material.metalness
              if (material.roughness !== undefined) mat.roughness = material.roughness
              if (material.transparent !== undefined) mat.transparent = material.transparent
              if (material.opacity !== undefined) mat.opacity = material.opacity
              if (material.wireframe !== undefined) mat.wireframe = material.wireframe
            }
          }
        })
      }
    }, [gltf, material])

    return (
      <group ref={groupRef} onClick={onClick}>
        <primitive object={gltf.scene} />
      </group>
    )
  } catch (err) {
    console.error('Error loading GLB model:', err)
    return (
      <mesh onClick={onClick}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" wireframe />
      </mesh>
    )
  }
}
