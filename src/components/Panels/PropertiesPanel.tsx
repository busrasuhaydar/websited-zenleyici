import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Unlock } from 'lucide-react'
import { useEditorStore } from '../../store/editorStore'
import { Input } from '../UI/Input'
import { ColorPicker } from '../UI/ColorPicker'
import { Vector3Input } from '../UI/Vector3Input'

export const PropertiesPanel: React.FC = () => {
  const { getSelectedObject, updateObject } = useEditorStore()
  const selectedObject = getSelectedObject()

  if (!selectedObject) {
    return (
      <div className="w-80 h-full bg-dark-900 border-l border-dark-700 flex items-center justify-center">
        <p className="text-dark-500 text-sm">No object selected</p>
      </div>
    )
  }

  const handleUpdate = (field: string, value: any) => {
    updateObject(selectedObject.id, { [field]: value })
  }

  const handleTransformUpdate = (
    type: 'position' | 'rotation' | 'scale',
    value: [number, number, number]
  ) => {
    updateObject(selectedObject.id, {
      transform: {
        ...selectedObject.transform,
        [type]: value,
      },
    })
  }

  const handleMaterialUpdate = (field: string, value: any) => {
    if (selectedObject.material) {
      updateObject(selectedObject.id, {
        material: {
          ...selectedObject.material,
          [field]: value,
        },
      })
    }
  }

  return (
    <div className="w-80 h-full bg-dark-900 border-l border-dark-700 flex flex-col">
      <div className="p-4 border-b border-dark-700">
        <h2 className="text-lg font-bold text-white">Properties</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Basic Info */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-dark-300">Basic</h3>
          <Input
            label="Name"
            value={selectedObject.name}
            onChange={(e) => handleUpdate('name', e.target.value)}
          />
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleUpdate('visible', !selectedObject.visible)}
              className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg transition-colors ${
                selectedObject.visible
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-800 text-dark-400'
              }`}
            >
              {selectedObject.visible ? <Eye size={16} /> : <EyeOff size={16} />}
              <span className="text-sm">
                {selectedObject.visible ? 'Visible' : 'Hidden'}
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleUpdate('locked', !selectedObject.locked)}
              className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg transition-colors ${
                selectedObject.locked
                  ? 'bg-red-600 text-white'
                  : 'bg-dark-800 text-dark-400'
              }`}
            >
              {selectedObject.locked ? <Lock size={16} /> : <Unlock size={16} />}
              <span className="text-sm">
                {selectedObject.locked ? 'Locked' : 'Unlocked'}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Transform */}
        {selectedObject.type !== 'light' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-dark-300">Transform</h3>
            <Vector3Input
              label="Position"
              value={selectedObject.transform.position}
              onChange={(value) => handleTransformUpdate('position', value)}
              step={0.1}
            />
            <Vector3Input
              label="Rotation"
              value={selectedObject.transform.rotation}
              onChange={(value) => handleTransformUpdate('rotation', value)}
              step={0.1}
            />
            <Vector3Input
              label="Scale"
              value={selectedObject.transform.scale}
              onChange={(value) => handleTransformUpdate('scale', value)}
              step={0.1}
              min={0.01}
            />
          </div>
        )}

        {/* Material */}
        {selectedObject.material && selectedObject.type !== 'light' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-dark-300">Material</h3>
            <ColorPicker
              label="Color"
              color={selectedObject.material.color}
              onChange={(value) => handleMaterialUpdate('color', value)}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-dark-200">
                Metalness
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={selectedObject.material.metalness || 0}
                onChange={(e) =>
                  handleMaterialUpdate('metalness', parseFloat(e.target.value))
                }
                className="w-full"
              />
              <span className="text-xs text-dark-400">
                {(selectedObject.material.metalness || 0).toFixed(2)}
              </span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-dark-200">
                Roughness
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={selectedObject.material.roughness || 1}
                onChange={(e) =>
                  handleMaterialUpdate('roughness', parseFloat(e.target.value))
                }
                className="w-full"
              />
              <span className="text-xs text-dark-400">
                {(selectedObject.material.roughness || 1).toFixed(2)}
              </span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-dark-200">
                Opacity
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={selectedObject.material.opacity || 1}
                onChange={(e) => {
                  const opacity = parseFloat(e.target.value)
                  handleMaterialUpdate('opacity', opacity)
                  handleMaterialUpdate('transparent', opacity < 1)
                }}
                className="w-full"
              />
              <span className="text-xs text-dark-400">
                {(selectedObject.material.opacity || 1).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="wireframe"
                checked={selectedObject.material.wireframe || false}
                onChange={(e) =>
                  handleMaterialUpdate('wireframe', e.target.checked)
                }
                className="w-4 h-4"
              />
              <label htmlFor="wireframe" className="text-sm text-dark-200">
                Wireframe
              </label>
            </div>
          </div>
        )}

        {/* Light Properties */}
        {selectedObject.type === 'light' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-dark-300">Light</h3>
            <ColorPicker
              label="Color"
              color={selectedObject.material?.color || '#ffffff'}
              onChange={(value) => handleMaterialUpdate('color', value)}
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-dark-200">
                Intensity
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={selectedObject.intensity || 1}
                onChange={(e) =>
                  handleUpdate('intensity', parseFloat(e.target.value))
                }
                className="w-full"
              />
              <span className="text-xs text-dark-400">
                {(selectedObject.intensity || 1).toFixed(1)}
              </span>
            </div>

            {selectedObject.lightType !== 'ambient' && (
              <Vector3Input
                label="Position"
                value={selectedObject.transform.position}
                onChange={(value) => handleTransformUpdate('position', value)}
                step={0.1}
              />
            )}
          </div>
        )}

        {/* Text Properties */}
        {selectedObject.type === 'text3d' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-dark-300">Text</h3>
            <Input
              label="Content"
              value={selectedObject.text || ''}
              onChange={(e) => handleUpdate('text', e.target.value)}
            />
          </div>
        )}

        {/* Object Info */}
        <div className="pt-4 border-t border-dark-700">
          <div className="text-xs text-dark-500 space-y-1">
            <p>Type: {selectedObject.type}</p>
            <p>ID: {selectedObject.id.slice(0, 8)}...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
