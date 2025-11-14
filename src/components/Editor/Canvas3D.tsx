import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, GizmoHelper, GizmoViewport, Environment } from '@react-three/drei'
import { SceneObject } from './SceneObject'
import { TransformGizmo } from './TransformGizmo'
import { useEditorStore } from '../../store/editorStore'

export const Canvas3D: React.FC = () => {
  const { scene, editorState, selectObject } = useEditorStore()

  const handleCanvasClick = () => {
    selectObject(null)
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: scene.camera.position,
          fov: scene.camera.fov,
          near: scene.camera.near,
          far: scene.camera.far,
        }}
        shadows
        onPointerMissed={handleCanvasClick}
        style={{ background: scene.settings.backgroundColor }}
      >
        {/* Environment */}
        <Environment preset="sunset" />

        {/* Scene Objects */}
        {scene.objects.map((object) => (
          <SceneObject key={object.id} object={object} />
        ))}

        {/* Transform Controls */}
        <TransformGizmo />

        {/* Grid */}
        {editorState.showGrid && (
          <Grid
            args={[50, 50]}
            cellSize={editorState.gridSize}
            cellThickness={0.5}
            cellColor="#6b7280"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#9ca3af"
            fadeDistance={100}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid
          />
        )}

        {/* Axes Helper */}
        {editorState.showAxes && (
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport
              axisColors={['#ef4444', '#22c55e', '#3b82f6']}
              labelColor="white"
            />
          </GizmoHelper>
        )}

        {/* Camera Controls */}
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.05}
          minDistance={0.1}
          maxDistance={1000}
        />
      </Canvas>
    </div>
  )
}
