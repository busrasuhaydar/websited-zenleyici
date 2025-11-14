import { useEffect, useRef } from 'react'
import { TransformControls } from '@react-three/drei'
import { useEditorStore } from '../../store/editorStore'

export const TransformGizmo: React.FC = () => {
  const { getSelectedObject, editorState, updateObjectTransform } =
    useEditorStore()
  const transformRef = useRef<any>(null)

  const selectedObject = getSelectedObject()

  useEffect(() => {
    if (transformRef.current && selectedObject) {
      const controls = transformRef.current

      const handleChange = () => {
        if (controls.object) {
          const position: [number, number, number] = [
            controls.object.position.x,
            controls.object.position.y,
            controls.object.position.z,
          ]
          const rotation: [number, number, number] = [
            controls.object.rotation.x,
            controls.object.rotation.y,
            controls.object.rotation.z,
          ]
          const scale: [number, number, number] = [
            controls.object.scale.x,
            controls.object.scale.y,
            controls.object.scale.z,
          ]

          if (editorState.transformMode === 'translate') {
            updateObjectTransform(selectedObject.id, 'position', position)
          } else if (editorState.transformMode === 'rotate') {
            updateObjectTransform(selectedObject.id, 'rotation', rotation)
          } else if (editorState.transformMode === 'scale') {
            updateObjectTransform(selectedObject.id, 'scale', scale)
          }
        }
      }

      controls.addEventListener('change', handleChange)
      return () => {
        controls.removeEventListener('change', handleChange)
      }
    }
  }, [selectedObject, editorState.transformMode, updateObjectTransform])

  if (!selectedObject || selectedObject.type === 'light') return null

  return (
    <TransformControls
      ref={transformRef}
      mode={editorState.transformMode}
      position={selectedObject.transform.position}
      rotation={selectedObject.transform.rotation}
      scale={selectedObject.transform.scale}
      translationSnap={editorState.snapToGrid ? editorState.gridSize : undefined}
    />
  )
}
