import React, { useCallback, useEffect, useState } from 'react'
import * as ST from 'components/dropbox/styled'
import { useDropzone } from 'react-dropzone'
import { Preloader } from '../../../preloader'

interface IDropZone {
  handleOnDrop: (newImageFile: File[]) => void
  files: File[]
  resetForm: () => void
  value: File[]
  setError: React.Dispatch<React.SetStateAction<string>>
  isLoading: boolean
  finishedUpload: boolean
}

export const DropField = ({
  handleOnDrop,
  files,
  resetForm,
  value,
  setError,
  isLoading,
  finishedUpload,
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

  useEffect(() => {
    if (isDragReject) setError('Choose correct file format')
  }, [isDragReject])

  return (
    <ST.ContainerDropBox
      active={fileUploaded}
      isLoading={isLoading}
      finishedUpload={finishedUpload}
    >
      <ST.DropeZone {...getRootProps({ className: 'dropzone' })}>
        {!isLoading ? (
          <>
            <input {...getInputProps()} />
            <ST.ImageBox />
            <ST.HeaderBox>
              Select weight and upload .pth or .pt file
            </ST.HeaderBox>
          </>
        ) : (
          <ST.LoaderWrapper>
            <Preloader />
          </ST.LoaderWrapper>
        )}
      </ST.DropeZone>
      {fileUploaded && (
        <ST.FileNamesContainer>
          <ST.FileNameHeader>
            {finishedUpload
              ? 'Finished!'
              : !isLoading
              ? 'File was uploaded!'
              : 'File is processing'}
          </ST.FileNameHeader>
          <ST.FileName>{filesArr}</ST.FileName>
        </ST.FileNamesContainer>
      )}
      {fileUploaded && <ST.DeleteButton onClick={resetForm} />}
    </ST.ContainerDropBox>
  )
}
