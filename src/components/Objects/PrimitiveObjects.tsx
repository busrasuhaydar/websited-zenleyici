import { useRef } from 'react'
import { Mesh, BoxGeometry } from 'three'
import type { MaterialProps } from '../../types/scene'

interface PrimitiveObjectProps {
  material: MaterialProps
  onClick?: (event?: any) => void
  isSelected?: boolean
}

// Box
export const Box: React.FC<PrimitiveObjectProps & { size?: [number, number, number] }> = ({
  material,
  onClick,
  isSelected,
  size = [1, 1, 1],
}) => {
  const meshRef = useRef<Mesh>(null)

  return (
    <mesh ref={meshRef} onClick={onClick}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={material.color}
        metalness={material.metalness || 0}
        roughness={material.roughness || 1}
        transparent={material.transparent || false}
        opacity={material.opacity || 1}
        wireframe={material.wireframe || false}
        emissive={material.emissive || '#000000'}
        emissiveIntensity={material.emissiveIntensity || 0}
      />
      {isSelected && (
        <lineSegments>
          <edgesGeometry args={[new BoxGeometry(...size)]} />
          <lineBasicMaterial color="#00f0ff" linewidth={2} />
        </lineSegments>
      )}
    </mesh>
  )
}

// Sphere
export const Sphere: React.FC<PrimitiveObjectProps & { radius?: number; segments?: number }> = ({
  material,
  onClick,
  radius = 1,
  segments = 32,
}) => {
  const meshRef = useRef<Mesh>(null)

  return (
    <mesh ref={meshRef} onClick={onClick}>
      <sphereGeometry args={[radius, segments, segments]} />
      <meshStandardMaterial
        color={material.color}
        metalness={material.metalness || 0}
        roughness={material.roughness || 1}
        transparent={material.transparent || false}
        opacity={material.opacity || 1}
        wireframe={material.wireframe || false}
        emissive={material.emissive || '#000000'}
        emissiveIntensity={material.emissiveIntensity || 0}
      />
    </mesh>
  )
}

// Cylinder
export const Cylinder: React.FC<
  PrimitiveObjectProps & { radiusTop?: number; radiusBottom?: number; height?: number }
> = ({
  material,
  onClick,
  radiusTop = 1,
  radiusBottom = 1,
  height = 2,
}) => {
  const meshRef = useRef<Mesh>(null)

  return (
    <mesh ref={meshRef} onClick={onClick}>
      <cylinderGeometry args={[radiusTop, radiusBottom, height, 32]} />
      <meshStandardMaterial
        color={material.color}
        metalness={material.metalness || 0}
        roughness={material.roughness || 1}
        transparent={material.transparent || false}
        opacity={material.opacity || 1}
        wireframe={material.wireframe || false}
        emissive={material.emissive || '#000000'}
        emissiveIntensity={material.emissiveIntensity || 0}
      />
    </mesh>
  )
}

// Cone
export const Cone: React.FC<PrimitiveObjectProps & { radius?: number; height?: number }> = ({
  material,
  onClick,
  radius = 1,
  height = 2,
}) => {
  const meshRef = useRef<Mesh>(null)

  return (
    <mesh ref={meshRef} onClick={onClick}>
      <coneGeometry args={[radius, height, 32]} />
      <meshStandardMaterial
        color={material.color}
        metalness={material.metalness || 0}
        roughness={material.roughness || 1}
        transparent={material.transparent || false}
        opacity={material.opacity || 1}
        wireframe={material.wireframe || false}
        emissive={material.emissive || '#000000'}
        emissiveIntensity={material.emissiveIntensity || 0}
      />
    </mesh>
  )
}

// Torus
export const Torus: React.FC<
  PrimitiveObjectProps & { radius?: number; tube?: number }
> = ({
  material,
  onClick,
  radius = 1,
  tube = 0.4,
}) => {
  const meshRef = useRef<Mesh>(null)

  return (
    <mesh ref={meshRef} onClick={onClick}>
      <torusGeometry args={[radius, tube, 16, 100]} />
      <meshStandardMaterial
        color={material.color}
        metalness={material.metalness || 0}
        roughness={material.roughness || 1}
        transparent={material.transparent || false}
        opacity={material.opacity || 1}
        wireframe={material.wireframe || false}
        emissive={material.emissive || '#000000'}
        emissiveIntensity={material.emissiveIntensity || 0}
      />
    </mesh>
  )
}

// Plane
export const Plane: React.FC<PrimitiveObjectProps & { size?: [number, number] }> = ({
  material,
  onClick,
  size = [10, 10],
}) => {
  const meshRef = useRef<Mesh>(null)

  return (
    <mesh ref={meshRef} onClick={onClick} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={size} />
      <meshStandardMaterial
        color={material.color}
        metalness={material.metalness || 0}
        roughness={material.roughness || 1}
        transparent={material.transparent || false}
        opacity={material.opacity || 1}
        wireframe={material.wireframe || false}
        emissive={material.emissive || '#000000'}
        emissiveIntensity={material.emissiveIntensity || 0}
        side={2} // DoubleSide
      />
    </mesh>
  )
}
