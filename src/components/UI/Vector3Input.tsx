import type { Vector3InputProps } from '../../types/ui'

export const Vector3Input: React.FC<Vector3InputProps> = ({
  value,
  onChange,
  label,
  step = 0.1,
  min,
  max,
}) => {
  const handleChange = (index: number, newValue: string) => {
    const numValue = parseFloat(newValue) || 0
    const newVector: [number, number, number] = [...value]
    newVector[index] = numValue
    onChange(newVector)
  }

  const labels = ['X', 'Y', 'Z']
  const colors = ['text-red-400', 'text-green-400', 'text-blue-400']

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark-200 mb-2">
          {label}
        </label>
      )}
      <div className="grid grid-cols-3 gap-2">
        {value.map((val, index) => (
          <div key={index} className="flex flex-col">
            <span className={`text-xs font-bold mb-1 ${colors[index]}`}>
              {labels[index]}
            </span>
            <input
              type="number"
              value={val.toFixed(2)}
              onChange={(e) => handleChange(index, e.target.value)}
              step={step}
              min={min}
              max={max}
              className="w-full px-2 py-1.5 bg-dark-800 border border-dark-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
