import type { ColorPickerProps } from '../../types/ui'

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  label,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark-200 mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-10 rounded-lg cursor-pointer border-2 border-dark-600 hover:border-primary-500 transition-colors"
            style={{ backgroundColor: color }}
          />
        </div>
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="#000000"
        />
      </div>
    </div>
  )
}
