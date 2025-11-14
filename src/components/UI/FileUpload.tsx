import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import type { FileUploadProps } from '../../types/ui'

export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  onUpload,
  label,
  maxSize = 10 * 1024 * 1024, // 10MB default
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles[0])
      }
    },
    [onUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { [accept]: [] },
    maxSize,
    multiple: false,
  })

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark-200 mb-2">
          {label}
        </label>
      )}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-all duration-200
          ${
            isDragActive
              ? 'border-primary-500 bg-primary-500/10'
              : 'border-dark-600 hover:border-primary-500 hover:bg-dark-800'
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload className="w-8 h-8 mx-auto mb-2 text-dark-400" />
        {isDragActive ? (
          <p className="text-primary-400">Drop file here...</p>
        ) : (
          <div className="text-dark-400">
            <p>Drag & drop or click to upload</p>
            <p className="text-xs mt-1">
              Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
