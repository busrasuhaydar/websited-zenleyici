import { useRef, useEffect } from 'react'
import { Group } from 'three'
import type { SceneObject as SceneObjectType } from '../../types/scene'
import { Box, Sphere, Cylinder, Cone, Torus, Plane } from '../Objects/PrimitiveObjects'
import { GLBModel } from '../Objects/GLBModel'
import { Text3D } from '../Objects/Text3D'
import { Image3D } from '../Objects/Image3D'
import { LightComponent } from '../Objects/Lights'
import { useEditorStore } from '../../store/editorStore'

interface SceneObjectProps {
  object: SceneObjectType
}

export const SceneObject: React.FC<SceneObjectProps> = ({ object }) => {
  const groupRef = useRef<Group>(null)
  const { selectObject, editorState } = useEditorStore()

  const isSelected = editorState.selectedObjectId === object.id

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...object.transform.position)
      groupRef.current.rotation.set(...object.transform.rotation)
      groupRef.current.scale.set(...object.transform.scale)
    }
  }, [object.transform])

  const handleClick = (e: any) => {
    e.stopPropagation()
    if (!object.locked) {
      selectObject(object.id)
    }
  }

  if (!object.visible) return null

  // Lights don't need group wrapper
  if (object.type === 'light' && object.lightType) {
    return (
      <LightComponent
        lightType={object.lightType}
        intensity={object.intensity || 1}
        color={object.material?.color || '#ffffff'}
        position={object.transform.position}
        distance={object.distance}
        angle={object.angle}
        penumbra={object.penumbra}
      />
    )
  }

  const renderObject = () => {
    if (!object.material) return null

    switch (object.type) {
      case 'box':
        return (
          <Box
            material={object.material}
            onClick={handleClick}
            isSelected={isSelected}
            size={object.args as [number, number, number] || [1, 1, 1]}
          />
        )

      case 'sphere':
        return (
          <Sphere
            material={object.material}
            onClick={handleClick}
            isSelected={isSelected}
            radius={(object.args?.[0] as number) || 1}
          />
        )

      case 'cylinder':
        return (
          <Cylinder
            material={object.material}
            onClick={handleClick}
            isSelected={isSelected}
            radiusTop={(object.args?.[0] as number) || 1}
            radiusBottom={(object.args?.[1] as number) || 1}
            height={(object.args?.[2] as number) || 2}
          />
        )

      case 'cone':
        return (
          <Cone
            material={object.material}
            onClick={handleClick}
            isSelected={isSelected}
            radius={(object.args?.[0] as number) || 1}
            height={(object.args?.[1] as number) || 2}
          />
        )

      case 'torus':
        return (
          <Torus
            material={object.material}
            onClick={handleClick}
            isSelected={isSelected}
            radius={(object.args?.[0] as number) || 1}
            tube={(object.args?.[1] as number) || 0.4}
          />
        )

      case 'plane':
        return (
          <Plane
            material={object.material}
            onClick={handleClick}
            isSelected={isSelected}
            size={object.args as [number, number] || [10, 10]}
          />
        )

      case 'glb':
        if (!object.glbUrl) return null
        return (
          <GLBModel
            url={object.glbUrl}
            material={object.material}
            onClick={handleClick}
            isSelected={isSelected}
          />
        )

      case 'text3d':
        return (
          <Text3D
            text={object.text || 'Text'}
            material={object.material}
            onClick={handleClick}
            isSelected={isSelected}
          />
        )

      case 'image':
        if (!object.imageUrl) return null
        return (
          <Image3D
            imageUrl={object.imageUrl}
            onClick={handleClick}
            isSelected={isSelected}
          />
        )

      default:
        return null
    }
  }

  return (
    <group ref={groupRef} name={object.name}>
      {renderObject()}
    </group>
  )
}
