import { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { Mesh } from 'three'

interface Image3DProps {
  imageUrl: string
  onClick?: (event?: any) => void
  isSelected?: boolean
  size?: [number, number]
}

export const Image3D: React.FC<Image3DProps> = ({
  imageUrl,
  onClick,
  size = [2, 2],
}) => {
  const meshRef = useRef<Mesh>(null)

  try {
    const texture = useLoader(TextureLoader, imageUrl)

    return (
      <mesh ref={meshRef} onClick={onClick}>
        <planeGeometry args={size} />
        <meshStandardMaterial map={texture} transparent />
      </mesh>
    )
  } catch (err) {
    console.error('Error loading image:', err)
    return (
      <mesh ref={meshRef} onClick={onClick}>
        <planeGeometry args={size} />
        <meshStandardMaterial color="#888888" />
      </mesh>
    )
  }
}
