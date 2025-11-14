import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import type {
  Scene,
  SceneObject,
  EditorState,
  TransformMode,
  CameraSettings,
  SceneSettings,
  ObjectType,
} from '../types/scene'

interface EditorStore {
  // Scene data
  scene: Scene
  editorState: EditorState

  // History for undo/redo
  history: {
    past: Scene[]
    future: Scene[]
  }

  // Actions - Scene
  createNewScene: () => void
  loadScene: (scene: Scene) => void
  updateSceneName: (name: string) => void
  updateSceneSettings: (settings: Partial<SceneSettings>) => void

  // Actions - Objects
  addObject: (type: ObjectType, additionalProps?: Partial<SceneObject>) => void
  removeObject: (id: string) => void
  updateObject: (id: string, updates: Partial<SceneObject>) => void
  duplicateObject: (id: string) => void

  // Actions - Selection
  selectObject: (id: string | null) => void
  getSelectedObject: () => SceneObject | null

  // Actions - Transform
  setTransformMode: (mode: TransformMode) => void
  updateObjectTransform: (
    id: string,
    transformType: 'position' | 'rotation' | 'scale',
    value: [number, number, number]
  ) => void

  // Actions - Camera
  updateCamera: (settings: Partial<CameraSettings>) => void

  // Actions - Editor State
  toggleGrid: () => void
  toggleAxes: () => void
  toggleSnapToGrid: () => void
  setGridSize: (size: number) => void

  // Actions - History
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean

  // Actions - Export/Import
  exportScene: () => string
  importScene: (jsonString: string) => void
}

// Default scene
const createDefaultScene = (): Scene => ({
  id: uuidv4(),
  name: 'Untitled Scene',
  objects: [
    // Default ambient light
    {
      id: uuidv4(),
      name: 'Ambient Light',
      type: 'light',
      lightType: 'ambient',
      intensity: 0.5,
      transform: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
      },
      material: {
        color: '#ffffff',
        type: 'standard',
      },
      visible: true,
      locked: false,
    },
    // Default directional light
    {
      id: uuidv4(),
      name: 'Directional Light',
      type: 'light',
      lightType: 'directional',
      intensity: 1,
      transform: {
        position: [5, 5, 5],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
      },
      material: {
        color: '#ffffff',
        type: 'standard',
      },
      visible: true,
      locked: false,
    },
  ],
  camera: {
    position: [5, 5, 5],
    fov: 75,
    near: 0.1,
    far: 1000,
    target: [0, 0, 0],
  },
  settings: {
    backgroundColor: '#1a1a2e',
    gridVisible: true,
    axesVisible: true,
    ambientLightIntensity: 0.5,
    fogEnabled: false,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

const defaultEditorState: EditorState = {
  selectedObjectId: null,
  transformMode: 'translate',
  snapToGrid: false,
  gridSize: 1,
  showGrid: true,
  showAxes: true,
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  scene: createDefaultScene(),
  editorState: defaultEditorState,
  history: {
    past: [],
    future: [],
  },

  // Scene actions
  createNewScene: () => {
    const newScene = createDefaultScene()
    set({
      scene: newScene,
      editorState: { ...defaultEditorState },
      history: { past: [], future: [] },
    })
  },

  loadScene: (scene: Scene) => {
    set({
      scene,
      editorState: { ...defaultEditorState },
      history: { past: [], future: [] },
    })
  },

  updateSceneName: (name: string) => {
    set((state) => ({
      scene: {
        ...state.scene,
        name,
        updatedAt: new Date().toISOString(),
      },
    }))
  },

  updateSceneSettings: (settings: Partial<SceneSettings>) => {
    set((state) => ({
      scene: {
        ...state.scene,
        settings: { ...state.scene.settings, ...settings },
        updatedAt: new Date().toISOString(),
      },
    }))
  },

  // Object actions
  addObject: (type: ObjectType, additionalProps = {}) => {
    const newObject: SceneObject = {
      id: uuidv4(),
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${get().scene.objects.length + 1}`,
      type,
      transform: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
      },
      material: {
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        type: 'standard',
        metalness: 0.5,
        roughness: 0.5,
        opacity: 1,
        transparent: false,
        wireframe: false,
      },
      visible: true,
      locked: false,
      ...additionalProps,
    }

    set((state) => {
      const past = [...state.history.past, state.scene]
      return {
        scene: {
          ...state.scene,
          objects: [...state.scene.objects, newObject],
          updatedAt: new Date().toISOString(),
        },
        history: {
          past,
          future: [],
        },
        editorState: {
          ...state.editorState,
          selectedObjectId: newObject.id,
        },
      }
    })
  },

  removeObject: (id: string) => {
    set((state) => {
      const past = [...state.history.past, state.scene]
      return {
        scene: {
          ...state.scene,
          objects: state.scene.objects.filter((obj) => obj.id !== id),
          updatedAt: new Date().toISOString(),
        },
        history: {
          past,
          future: [],
        },
        editorState: {
          ...state.editorState,
          selectedObjectId:
            state.editorState.selectedObjectId === id
              ? null
              : state.editorState.selectedObjectId,
        },
      }
    })
  },

  updateObject: (id: string, updates: Partial<SceneObject>) => {
    set((state) => ({
      scene: {
        ...state.scene,
        objects: state.scene.objects.map((obj) =>
          obj.id === id ? { ...obj, ...updates } : obj
        ),
        updatedAt: new Date().toISOString(),
      },
    }))
  },

  duplicateObject: (id: string) => {
    const object = get().scene.objects.find((obj) => obj.id === id)
    if (!object) return

    const duplicated: SceneObject = {
      ...object,
      id: uuidv4(),
      name: `${object.name} (Copy)`,
      transform: {
        ...object.transform,
        position: [
          object.transform.position[0] + 1,
          object.transform.position[1],
          object.transform.position[2] + 1,
        ],
      },
    }

    set((state) => {
      const past = [...state.history.past, state.scene]
      return {
        scene: {
          ...state.scene,
          objects: [...state.scene.objects, duplicated],
          updatedAt: new Date().toISOString(),
        },
        history: {
          past,
          future: [],
        },
        editorState: {
          ...state.editorState,
          selectedObjectId: duplicated.id,
        },
      }
    })
  },

  // Selection
  selectObject: (id: string | null) => {
    set((state) => ({
      editorState: {
        ...state.editorState,
        selectedObjectId: id,
      },
    }))
  },

  getSelectedObject: () => {
    const { scene, editorState } = get()
    if (!editorState.selectedObjectId) return null
    return (
      scene.objects.find((obj) => obj.id === editorState.selectedObjectId) ||
      null
    )
  },

  // Transform
  setTransformMode: (mode: TransformMode) => {
    set((state) => ({
      editorState: {
        ...state.editorState,
        transformMode: mode,
      },
    }))
  },

  updateObjectTransform: (
    id: string,
    transformType: 'position' | 'rotation' | 'scale',
    value: [number, number, number]
  ) => {
    set((state) => ({
      scene: {
        ...state.scene,
        objects: state.scene.objects.map((obj) =>
          obj.id === id
            ? {
                ...obj,
                transform: {
                  ...obj.transform,
                  [transformType]: value,
                },
              }
            : obj
        ),
        updatedAt: new Date().toISOString(),
      },
    }))
  },

  // Camera
  updateCamera: (settings: Partial<CameraSettings>) => {
    set((state) => ({
      scene: {
        ...state.scene,
        camera: { ...state.scene.camera, ...settings },
        updatedAt: new Date().toISOString(),
      },
    }))
  },

  // Editor state
  toggleGrid: () => {
    set((state) => ({
      editorState: {
        ...state.editorState,
        showGrid: !state.editorState.showGrid,
      },
    }))
  },

  toggleAxes: () => {
    set((state) => ({
      editorState: {
        ...state.editorState,
        showAxes: !state.editorState.showAxes,
      },
    }))
  },

  toggleSnapToGrid: () => {
    set((state) => ({
      editorState: {
        ...state.editorState,
        snapToGrid: !state.editorState.snapToGrid,
      },
    }))
  },

  setGridSize: (size: number) => {
    set((state) => ({
      editorState: {
        ...state.editorState,
        gridSize: size,
      },
    }))
  },

  // History
  undo: () => {
    set((state) => {
      if (state.history.past.length === 0) return state

      const previous = state.history.past[state.history.past.length - 1]
      const newPast = state.history.past.slice(0, -1)

      return {
        scene: previous,
        history: {
          past: newPast,
          future: [state.scene, ...state.history.future],
        },
      }
    })
  },

  redo: () => {
    set((state) => {
      if (state.history.future.length === 0) return state

      const next = state.history.future[0]
      const newFuture = state.history.future.slice(1)

      return {
        scene: next,
        history: {
          past: [...state.history.past, state.scene],
          future: newFuture,
        },
      }
    })
  },

  canUndo: () => get().history.past.length > 0,
  canRedo: () => get().history.future.length > 0,

  // Export/Import
  exportScene: () => {
    return JSON.stringify(get().scene, null, 2)
  },

  importScene: (jsonString: string) => {
    try {
      const scene = JSON.parse(jsonString) as Scene
      get().loadScene(scene)
    } catch (error) {
      console.error('Failed to import scene:', error)
    }
  },
}))
