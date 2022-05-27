import React, { useEffect } from 'react'
import * as ST from './styled'
import { useDropzone } from 'react-dropzone'
import { Preloader } from '../preloader'
import { useTranslation } from 'react-i18next'

interface IDropField {
  handleOnDrop: (newImageFile: File[]) => void
  files: File[]
  resetForm: () => void
  value: File[]
  isLoading: boolean
  downloadItem: string
}

const DropZoneField = ({
  handleOnDrop,
  files,
  resetForm,
  isLoading,
  downloadItem,
}: IDropField) => {
  const { t } = useTranslation(['main', 'common'])
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: handleOnDrop,
    accept: {
      'image/jpeg': ['.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/bmp': ['.bmp'],
    },
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
    <ST.ContainerDropBox
      active={fileUploaded}
      finishedUpload={!!downloadItem}
      isLoading={isLoading}
    >
      {!isLoading ? (
        <ST.DropeZone {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <ST.ImageBox />
          <ST.HeaderBox>{t('drag')}</ST.HeaderBox>
        </ST.DropeZone>
      ) : (
        <Preloader />
      )}
      {fileUploaded && (
        <ST.FileNamesContainer>
          <ST.FileNameHeader finishedUpload={!!downloadItem}>
            {downloadItem
              ? `${t('common:finished')}`
              : !isLoading
              ? `${t('common:uploadedFile')}`
              : `${t('common:processingFile')}`}
          </ST.FileNameHeader>
          <ST.FileName>{filesArr}</ST.FileName>
        </ST.FileNamesContainer>
      )}
      {!isLoading && fileUploaded && <ST.DeleteButton onClick={resetForm} />}
    </ST.ContainerDropBox>
  )
}

export default DropZoneField
