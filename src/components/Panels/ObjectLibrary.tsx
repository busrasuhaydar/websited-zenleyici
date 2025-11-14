import { motion } from 'framer-motion'
import {
  Box as BoxIcon,
  Circle,
  Cylinder as CylinderIcon,
  Triangle,
  Donut,
  Square,
  Upload,
  Type,
  Image as ImageIcon,
  Lightbulb,
} from 'lucide-react'
import { useEditorStore } from '../../store/editorStore'
import { FileUpload } from '../UI/FileUpload'
import { useState } from 'react'

export const ObjectLibrary: React.FC = () => {
  const { addObject } = useEditorStore()
  const [showGLBUpload, setShowGLBUpload] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)

  const primitives = [
    { type: 'box' as const, icon: BoxIcon, label: 'Box' },
    { type: 'sphere' as const, icon: Circle, label: 'Sphere' },
    { type: 'cylinder' as const, icon: CylinderIcon, label: 'Cylinder' },
    { type: 'cone' as const, icon: Triangle, label: 'Cone' },
    { type: 'torus' as const, icon: Donut, label: 'Torus' },
    { type: 'plane' as const, icon: Square, label: 'Plane' },
  ]

  const handleGLBUpload = (file: File) => {
    const url = URL.createObjectURL(file)
    addObject('glb', { glbUrl: url, name: file.name })
    setShowGLBUpload(false)
  }

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file)
    addObject('image', { imageUrl: url, name: file.name })
    setShowImageUpload(false)
  }

  return (
    <div className="w-64 h-full bg-dark-900 border-r border-dark-700 flex flex-col">
      <div className="p-4 border-b border-dark-700">
        <h2 className="text-lg font-bold text-white">Objects</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Primitives */}
        <div>
          <h3 className="text-xs font-semibold text-dark-400 uppercase mb-3">
            Primitives
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {primitives.map((item) => (
              <motion.button
                key={item.type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addObject(item.type)}
                className="flex flex-col items-center gap-2 p-3 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
              >
                <item.icon size={24} className="text-primary-400" />
                <span className="text-xs text-white">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 3D Models */}
        <div>
          <h3 className="text-xs font-semibold text-dark-400 uppercase mb-3">
            3D Models
          </h3>
          {!showGLBUpload ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowGLBUpload(true)}
              className="w-full flex items-center gap-2 p-3 bg-dark-800 hover:bg-primary-600 rounded-lg transition-colors text-white"
            >
              <Upload size={20} />
              <span className="text-sm">Upload GLB/GLTF</span>
            </motion.button>
          ) : (
            <div className="space-y-2">
              <FileUpload
                accept=".glb,.gltf"
                onUpload={handleGLBUpload}
                label="Upload 3D Model"
                maxSize={50 * 1024 * 1024}
              />
              <button
                onClick={() => setShowGLBUpload(false)}
                className="text-xs text-dark-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Text */}
        <div>
          <h3 className="text-xs font-semibold text-dark-400 uppercase mb-3">
            Text & Media
          </h3>
          <div className="space-y-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addObject('text3d', { text: 'New Text' })}
              className="w-full flex items-center gap-2 p-3 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors text-white"
            >
              <Type size={20} className="text-primary-400" />
              <span className="text-sm">3D Text</span>
            </motion.button>

            {!showImageUpload ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowImageUpload(true)}
                className="w-full flex items-center gap-2 p-3 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors text-white"
              >
                <ImageIcon size={20} className="text-primary-400" />
                <span className="text-sm">Image Plane</span>
              </motion.button>
            ) : (
              <div className="space-y-2">
                <FileUpload
                  accept="image/*"
                  onUpload={handleImageUpload}
                  label="Upload Image"
                />
                <button
                  onClick={() => setShowImageUpload(false)}
                  className="text-xs text-dark-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Lights */}
        <div>
          <h3 className="text-xs font-semibold text-dark-400 uppercase mb-3">
            Lights
          </h3>
          <div className="space-y-2">
            {(['point', 'directional', 'spot'] as const).map((lightType) => (
              <motion.button
                key={lightType}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  addObject('light', {
                    lightType,
                    intensity: 1,
                    name: `${lightType.charAt(0).toUpperCase() + lightType.slice(1)} Light`,
                  })
                }
                className="w-full flex items-center gap-2 p-3 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors text-white"
              >
                <Lightbulb size={20} className="text-yellow-400" />
                <span className="text-sm capitalize">{lightType} Light</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
