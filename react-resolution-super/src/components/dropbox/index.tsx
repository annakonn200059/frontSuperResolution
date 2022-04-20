import React, { useCallback, useState } from 'react'
import * as ST from './styled'
import { AuthState } from '../../types/authType'
import DropZoneField from './dropField'
import BaseSelect from 'components/ui/BaseSelect'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { API_ENDPOINT } from 'api/request'
import { checkUploadsAmount, sendImageData } from 'api/subscription'
import InformModal from '../ui/Modals/InfromModal'
import { saveAs } from 'file-saver'

interface IDropBox {
  stateUser: AuthState
  coefficients: number[]
}
//TODO вынести dropbox с селектом в отдельную компоненту и использовать тут и в профиле админа
//TODO коэффициенты в стейт
const DropBox = ({ stateUser, coefficients }: IDropBox) => {
  const [files, setFiles] = useState<File[]>([])
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')
  const [chosenCoefficient, setChosenCoefficient] = useState<number>(-1)
  const [downloadItem, setDownloadItem] = useState<string>('')
  const [availableUploads, setAvailableUploads] = useState<number | undefined>(
    0
  )

  const handleModal = (): void => {
    setShowModal(!showModal)
  }

  const handleFormSubmit = async (formProps: any) => {
    if (formProps.name.split('.').length > 2) {
      setErrorText('File name includes more than one dots')
      return false
    }
    const fd = new FormData()
    fd.append('imageFile', formProps)
    fd.append('coefficient', '' + chosenCoefficient)
    try {
      sendImageData(fd)
        .then((resp) => {
          setErrorText('')
          setDownloadItem(resp.msg)
        })
        .catch((e) => {
          setErrorText(e.response.data.msg)
        })
    } catch (err) {
      setErrorText('Error')
    }
  }
  const handleOnDrop = useCallback(
    (newImageFile: File[]) => {
      setFiles(newImageFile)
    },
    [files]
  )

  const downloadFile = () => {
    saveAs(`${API_ENDPOINT}/api/downloadImage?image=${downloadItem}`)
  }

  const handleSetCoefficient = useCallback(
    (num: number) => {
      setChosenCoefficient(num)
    },
    [chosenCoefficient]
  )

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: { image: files, coefficientValue: chosenCoefficient },
    onSubmit: async () => {
      const submit: boolean = checkFilledData()
      if (submit) {
        setErrorText('')
        checkUploadsAmount()
          .then((resp) => {
            if (resp.success) {
              handleFormSubmit(files[0])
            } else {
              setAvailableUploads(resp.availableAmount)
              handleModal()
            }
          })
          .catch((err) => {
            setErrorText('Error')
          })
      }
    },
  })

  const checkFilledData = (): boolean => {
    if (files.length === 0) {
      setErrorText('No image was chosen')
      return false
    }
    if (chosenCoefficient === -1) {
      setErrorText('Chose coefficient')
      return false
    } else return true
  }

  const redirectLogin = () => {
    navigate('/auth')
  }

  const modalText = (
    <ST.ModalHeader>
      <ST.LoginLink onClick={redirectLogin}>Login</ST.LoginLink> to access this
      coefficient
    </ST.ModalHeader>
  )

  const uploadsEndedText = (
    <ST.ModalHeader>
      Sorry, You have no possible uploads left.{' '}
      {stateUser.accessToken ? (
        '\nPurchase the subscription'
      ) : (
        <ST.LoginLink onClick={redirectLogin}> Login</ST.LoginLink>
      )}{' '}
      to access more than {availableUploads} uploads
    </ST.ModalHeader>
  )

  const activeElements = (): number[] => {
    let allowedCoeffs: number[]
    if (!stateUser.accessToken) {
      allowedCoeffs = [coefficients[0]]
    } else {
      allowedCoeffs = coefficients
    }
    return allowedCoeffs
  }

  const resetForm = (): void => setFiles([])
  return (
    <ST.DropArea>
      <DropZoneField
        handleOnDrop={handleOnDrop}
        files={files}
        resetForm={resetForm}
        value={values.image}
      />
      <ST.ButtonContainer>
        <BaseSelect
          isSmallSelect={true}
          placeHolder={'Coefficients'}
          listItems={coefficients}
          name={'departmentHead'}
          value={values.coefficientValue}
          typeSelect={'departmentHead'}
          setChosen={handleSetCoefficient}
          activeElements={activeElements()}
          modalText={modalText}
        />
        <ST.SubmitButton
          type="submit"
          onClick={() => {
            handleSubmit()
          }}
        >
          Submit
        </ST.SubmitButton>
      </ST.ButtonContainer>
      {downloadItem && (
        <ST.DownloadPhotoLink onClick={downloadFile}>
          {' '}
          DOWNLOAD YOUR SUPER IMAGE
        </ST.DownloadPhotoLink>
      )}
      <ST.ErrorText>{errorText ? errorText : ''}</ST.ErrorText>
      <InformModal
        text={uploadsEndedText}
        show={showModal}
        onClose={handleModal}
      />
    </ST.DropArea>
  )
}

export default DropBox
