import { motion } from 'framer-motion'
import {
  File,
  Download,
  Upload,
  Undo,
  Redo,
  Move,
  RotateCw,
  Maximize2,
  Grid3x3,
  Compass,
  Trash2,
  Copy,
} from 'lucide-react'
import { Button } from '../UI/Button'
import { useEditorStore } from '../../store/editorStore'

export const Toolbar: React.FC = () => {
  const {
    createNewScene,
    undo,
    redo,
    canUndo,
    canRedo,
    setTransformMode,
    editorState,
    toggleGrid,
    toggleAxes,
    exportScene,
    importScene,
    removeObject,
    duplicateObject,
    scene,
  } = useEditorStore()

  const handleExport = () => {
    const sceneJson = exportScene()
    const blob = new Blob([sceneJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${scene.name.replace(/\s+/g, '_')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const json = event.target?.result as string
          importScene(json)
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleDelete = () => {
    if (editorState.selectedObjectId) {
      removeObject(editorState.selectedObjectId)
    }
  }

  const handleDuplicate = () => {
    if (editorState.selectedObjectId) {
      duplicateObject(editorState.selectedObjectId)
    }
  }

  return (
    <div className="h-14 bg-dark-900 border-b border-dark-700 flex items-center px-4 gap-4">
      {/* File Operations */}
      <div className="flex items-center gap-2 border-r border-dark-700 pr-4">
        <Button variant="ghost" size="sm" onClick={createNewScene} icon={<File size={18} />}>
          New
        </Button>
        <Button variant="ghost" size="sm" onClick={handleImport} icon={<Upload size={18} />}>
          Import
        </Button>
        <Button variant="ghost" size="sm" onClick={handleExport} icon={<Download size={18} />}>
          Export
        </Button>
      </div>

      {/* History */}
      <div className="flex items-center gap-2 border-r border-dark-700 pr-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={undo}
          disabled={!canUndo()}
          icon={<Undo size={18} />}
        >
          Undo
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={redo}
          disabled={!canRedo()}
          icon={<Redo size={18} />}
        >
          Redo
        </Button>
      </div>

      {/* Transform Modes */}
      <div className="flex items-center gap-2 border-r border-dark-700 pr-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTransformMode('translate')}
          className={`p-2 rounded-lg transition-colors ${
            editorState.transformMode === 'translate'
              ? 'bg-primary-600 text-white'
              : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
          }`}
          title="Move (G)"
        >
          <Move size={18} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTransformMode('rotate')}
          className={`p-2 rounded-lg transition-colors ${
            editorState.transformMode === 'rotate'
              ? 'bg-primary-600 text-white'
              : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
          }`}
          title="Rotate (R)"
        >
          <RotateCw size={18} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTransformMode('scale')}
          className={`p-2 rounded-lg transition-colors ${
            editorState.transformMode === 'scale'
              ? 'bg-primary-600 text-white'
              : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
          }`}
          title="Scale (S)"
        >
          <Maximize2 size={18} />
        </motion.button>
      </div>

      {/* View Options */}
      <div className="flex items-center gap-2 border-r border-dark-700 pr-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleGrid}
          className={`p-2 rounded-lg transition-colors ${
            editorState.showGrid
              ? 'bg-primary-600 text-white'
              : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
          }`}
          title="Toggle Grid"
        >
          <Grid3x3 size={18} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleAxes}
          className={`p-2 rounded-lg transition-colors ${
            editorState.showAxes
              ? 'bg-primary-600 text-white'
              : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
          }`}
          title="Toggle Axes"
        >
          <Compass size={18} />
        </motion.button>
      </div>

      {/* Object Operations */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDuplicate}
          disabled={!editorState.selectedObjectId}
          icon={<Copy size={18} />}
        >
          Duplicate
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          disabled={!editorState.selectedObjectId}
          icon={<Trash2 size={18} />}
        >
          Delete
        </Button>
      </div>

      {/* Scene Name */}
      <div className="ml-auto text-dark-300 text-sm font-medium">
        {scene.name}
      </div>
    </div>
  )
}
