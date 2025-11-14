import type { LightType } from '../../types/scene'

interface LightProps {
  lightType: LightType
  intensity: number
  color: string
  position?: [number, number, number]
  distance?: number
  angle?: number
  penumbra?: number
}

export const LightComponent: React.FC<LightProps> = ({
  lightType,
  intensity,
  color,
  position = [0, 0, 0],
  distance = 0,
  angle = Math.PI / 3,
  penumbra = 0,
}) => {
  switch (lightType) {
    case 'ambient':
      return <ambientLight intensity={intensity} color={color} />

    case 'directional':
      return (
        <directionalLight
          position={position}
          intensity={intensity}
          color={color}
          castShadow
        />
      )

    case 'point':
      return (
        <pointLight
          position={position}
          intensity={intensity}
          color={color}
          distance={distance}
          castShadow
        />
      )

    case 'spot':
      return (
        <spotLight
          position={position}
          intensity={intensity}
          color={color}
          angle={angle}
          penumbra={penumbra}
          distance={distance}
          castShadow
        />
      )

    default:
      return null
  }
}
