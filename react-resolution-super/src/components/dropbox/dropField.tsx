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
  resetForm: () => void
  value: File[]
}

const DropZoneField = ({
  handleOnDrop,
  files,
  resetForm,
  value,
}: IDropField) => {
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

  const fileUploaded: boolean = files.length > 0

  const filesArr = files.map((file) => (
    <ST.FileItem key={file.name}>
      {file.name} - {file.size} bytes
    </ST.FileItem>
  ))

  useEffect(() => {
    handleOnDrop(acceptedFiles)
  }, [acceptedFiles])

  return (
    <ST.ContainerDropBox active={fileUploaded}>
      <ST.DropeZone {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <ST.ImageBox />
        <ST.HeaderBox>
          Drag and drop image here, or click to select from folder
        </ST.HeaderBox>
      </ST.DropeZone>
      {fileUploaded && (
        <ST.FileNamesContainer>
          <ST.FileNameHeader>Image was uploaded!</ST.FileNameHeader>
          <ST.FileName>{filesArr}</ST.FileName>
        </ST.FileNamesContainer>
      )}
      {fileUploaded && <ST.DeleteButton onClick={resetForm} />}
    </ST.ContainerDropBox>
  )
}

export default DropZoneField
