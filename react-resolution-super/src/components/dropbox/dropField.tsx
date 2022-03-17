import React, { useEffect } from 'react'
import * as ST from './styled'
import DropZone, { useDropzone } from 'react-dropzone'
import ImagePreview from './imagePreview'
import Placeholder from './placeholder'
import ShowError from './showError'
import BoxContent from './boxContent'

interface IDropField {
  handleOnDrop: (newImageFile: File[]) => void
  files: File[]
}

const DropZoneField = ({ handleOnDrop, files }: IDropField) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    onDrop: handleOnDrop,
    accept: 'image/jpeg, image/png, image/gif, image/bmp',
  })

  const filesArr = files.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ))

  useEffect(() => {
    handleOnDrop(acceptedFiles)
  }, [acceptedFiles])

  return (
    <ST.ContainerDropBox>
      <ST.DropeZone {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <ST.ImageBox />
        <ST.HeaderBox>
          Drag and drop some files here, or click to select files
        </ST.HeaderBox>
      </ST.DropeZone>
      {files.length > 0 && (
        <ST.FileNamesContainer>
          <ST.FileNameHeader>Files List:</ST.FileNameHeader>
          <ST.FileName>{filesArr}</ST.FileName>
        </ST.FileNamesContainer>
      )}
    </ST.ContainerDropBox>
  )
}

export default DropZoneField
