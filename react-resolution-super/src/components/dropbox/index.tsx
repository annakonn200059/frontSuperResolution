import React, { useCallback, useState } from 'react'
import * as ST from './styled'
import DropZoneField from './dropField'
import BaseSelect from 'components/ui/BaseSelect'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { API_ENDPOINT } from 'api/request'
import { checkUploadsAmount, sendImageData } from 'api/subscription'
import InformModal from '../ui/Modals/InfromModal'
import { saveAs } from 'file-saver'
import { useDispatch } from 'react-redux'
import { setInactivePurchase } from 'store/actions/purchase'
import { useTranslation } from 'react-i18next'

interface IDropBox {
  token: string
  isSubscription: boolean
  isPaidSubscription: boolean
  coefficients: number[]
  userRole?: string
}

//TODO вынести dropbox с селектом в отдельную компоненту и использовать тут и в профиле админа
const DropBox = ({
  token,
  coefficients,
  isSubscription,
  isPaidSubscription,
  userRole,
}: IDropBox) => {
  const { t } = useTranslation(['main', 'common', 'profile'])
  const dispatch = useDispatch()
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const [responseText, setResponseText] = useState<string>('')
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')
  const [chosenCoefficient, setChosenCoefficient] = useState<number>(-1)
  const [downloadItem, setDownloadItem] = useState<string>('')
  const [availableUploads, setAvailableUploads] = useState<number | undefined>(
    0
  )
  const curLang = localStorage.getItem('i18nextLng')

  const handleModal = (): void => {
    setShowModal(!showModal)
  }

  const handleFormSubmit = async (formProps: any) => {
    if (formProps.name.split('.').length > 2) {
      setErrorText(t('profile:fileWithDots'))
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
        .finally(() => {
          setLoading(false)
        })
    } catch (err) {
      setErrorText(t('profile:error'))
    }
  }
  const handleOnDrop = useCallback(
    (newImageFile: File[]) => {
      setDownloadItem('')
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
        checkUploadsAmount(token, curLang)
          .then((resp) => {
            if (resp.success) {
              setLoading(true)
              handleFormSubmit(files[0])
            } else {
              setAvailableUploads(resp.availableAmount)
              setResponseText(resp.msg)
              handleModal()
              if (resp.notPaid) {
                dispatch(setInactivePurchase() as any)
              }
            }
          })
          .catch((err) => {
            setErrorText(t('profile:error'))
          })
      }
    },
  })

  const checkFilledData = (): boolean => {
    if (files.length === 0) {
      setErrorText(t('main:noImage'))
      return false
    }
    if (chosenCoefficient === -1) {
      setErrorText(t('profile:choseCoefficient'))
      return false
    } else return true
  }

  const redirectLogin = () => {
    navigate('/auth')
  }

  const modalText = (
    <ST.ModalHeader>
      {token ? (
        `\n${t('main:purchaseSubscr')}`
      ) : (
        <ST.LoginLink onClick={redirectLogin}>{t('main:login')}</ST.LoginLink>
      )}{' '}
      {t('main:toAccess')}
    </ST.ModalHeader>
  )

  const activeElements = (): number[] => {
    let allowedCoeffs: number[]
    if (userRole === 'admin') {
      allowedCoeffs = coefficients
      return allowedCoeffs
    }
    if (!token) {
      allowedCoeffs = [coefficients[0]]
    } else if (!isSubscription) {
      allowedCoeffs = [coefficients[0], coefficients[1]]
    } else {
      allowedCoeffs = coefficients
    }
    return allowedCoeffs
  }

  const resetForm = (): void => {
    setFiles([])
    setDownloadItem('')
    setErrorText('')
  }
  return (
    <ST.DropArea>
      <DropZoneField
        handleOnDrop={handleOnDrop}
        files={files}
        resetForm={resetForm}
        value={values.image}
        isLoading={isLoading}
        downloadItem={downloadItem}
      />
      <ST.ButtonContainer>
        <BaseSelect
          isSmallSelect={true}
          placeHolder={`${t('main:coefficients')}`}
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
          {t('main:submit')}
        </ST.SubmitButton>
      </ST.ButtonContainer>
      {downloadItem && (
        <ST.DownloadPhotoLink onClick={downloadFile}>
          {t('main:download')}
        </ST.DownloadPhotoLink>
      )}
      <ST.ErrorText>{errorText ? errorText : ''}</ST.ErrorText>
      <InformModal text={responseText} show={showModal} onClose={handleModal} />
    </ST.DropArea>
  )
}

export default DropBox
