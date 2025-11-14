import { Text } from '@react-three/drei'
import type { MaterialProps } from '../../types/scene'

interface Text3DProps {
  text: string
  material: MaterialProps
  onClick?: (event?: any) => void
  isSelected?: boolean
  fontSize?: number
}

export const Text3D: React.FC<Text3DProps> = ({
  text,
  material,
  onClick,
  fontSize = 1,
}) => {
  return (
    <Text
      fontSize={fontSize}
      color={material.color}
      anchorX="center"
      anchorY="middle"
      onClick={onClick}
    >
      {text || 'Text'}
    </Text>
  )
}
