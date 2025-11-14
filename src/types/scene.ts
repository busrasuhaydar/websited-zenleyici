// Object Types
export type ObjectType =
  | 'box'
  | 'sphere'
  | 'cylinder'
  | 'cone'
  | 'torus'
  | 'plane'
  | 'glb'
  | 'text3d'
  | 'image'
  | 'light'
  | 'camera'

export type LightType =
  | 'ambient'
  | 'directional'
  | 'point'
  | 'spot'

export type MaterialType =
  | 'standard'
  | 'physical'
  | 'basic'
  | 'lambert'
  | 'phong'

export type TransformMode =
  | 'translate'
  | 'rotate'
  | 'scale'

// Material Properties
export interface MaterialProps {
  color: string
  type: MaterialType
  metalness?: number
  roughness?: number
  opacity?: number
  transparent?: boolean
  wireframe?: boolean
  emissive?: string
  emissiveIntensity?: number
}

// Transform Properties
export interface Transform {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
}

// Scene Object
export interface SceneObject {
  id: string
  name: string
  type: ObjectType
  transform: Transform
  material?: MaterialProps
  visible: boolean
  locked: boolean

  // Specific properties
  glbUrl?: string
  text?: string
  imageUrl?: string

  // Light specific
  lightType?: LightType
  intensity?: number
  distance?: number
  angle?: number
  penumbra?: number

  // Geometry specific
  args?: number[]

  // Hierarchy
  parentId?: string
  children?: string[]
}

// Light Object
export interface LightObject extends SceneObject {
  type: 'light'
  lightType: LightType
  intensity: number
  color: string
}

// Camera Settings
export interface CameraSettings {
  position: [number, number, number]
  fov: number
  near: number
  far: number
  target: [number, number, number]
}

// Scene Settings
export interface SceneSettings {
  backgroundColor: string
  gridVisible: boolean
  axesVisible: boolean
  ambientLightIntensity: number
  fogEnabled: boolean
  fogColor?: string
  fogNear?: number
  fogFar?: number
}

// Complete Scene
export interface Scene {
  id: string
  name: string
  objects: SceneObject[]
  camera: CameraSettings
  settings: SceneSettings
  createdAt: string
  updatedAt: string
}

// Editor State
export interface EditorState {
  selectedObjectId: string | null
  transformMode: TransformMode
  snapToGrid: boolean
  gridSize: number
  showGrid: boolean
  showAxes: boolean
}

// History for Undo/Redo
export interface HistoryState {
  past: Scene[]
  present: Scene
  future: Scene[]
}
