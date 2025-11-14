import { Canvas3D } from './components/Editor/Canvas3D'
import { Toolbar } from './components/Panels/Toolbar'
import { ObjectLibrary } from './components/Panels/ObjectLibrary'
import { PropertiesPanel } from './components/Panels/PropertiesPanel'

function App() {
  return (
    <div className="w-screen h-screen flex flex-col bg-dark-950 text-white">
      {/* Toolbar */}
      <Toolbar />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Object Library */}
        <ObjectLibrary />

        {/* Center - 3D Canvas */}
        <div className="flex-1 relative">
          <Canvas3D />
        </div>

        {/* Right Panel - Properties */}
        <PropertiesPanel />
      </div>
    </div>
  )
}

export default App
