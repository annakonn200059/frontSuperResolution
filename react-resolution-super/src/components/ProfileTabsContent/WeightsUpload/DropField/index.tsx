import React, { useCallback, useEffect, useState } from 'react'
import * as ST from 'components/dropbox/styled'
import { useDropzone } from 'react-dropzone'

interface IDropZone {
  handleOnDrop: (newImageFile: File[]) => void
  files: File[]
  resetForm: () => void
  value: File[]
}

export const DropField = ({
  handleOnDrop,
  files,
  resetForm,
  value,
}: IDropZone) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    onDrop: handleOnDrop,
    accept: '.pth, .pt',
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
        <ST.HeaderBox>Select weight and upload .pth or .pt file</ST.HeaderBox>
      </ST.DropeZone>
      {fileUploaded && (
        <ST.FileNamesContainer>
          <ST.FileNameHeader>File was uploaded!</ST.FileNameHeader>
          <ST.FileName>{filesArr}</ST.FileName>
        </ST.FileNamesContainer>
      )}
      {fileUploaded && <ST.DeleteButton onClick={resetForm} />}
    </ST.ContainerDropBox>
  )
}
