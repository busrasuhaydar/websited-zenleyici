export interface PanelProps {
  isOpen?: boolean
  onToggle?: () => void
}

export interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
}

export interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  label?: string
}

export interface Vector3InputProps {
  value: [number, number, number]
  onChange: (value: [number, number, number]) => void
  label?: string
  step?: number
  min?: number
  max?: number
}

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  icon?: React.ReactNode
  className?: string
}

export interface FileUploadProps {
  accept: string
  onUpload: (file: File) => void
  label?: string
  maxSize?: number
}

export interface ToolbarItemProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  active?: boolean
  disabled?: boolean
}
