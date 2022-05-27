import React, { useCallback, useState } from 'react'
import * as ST from './styled'
import { DropField } from './DropField'
import BaseSelect from '../../ui/BaseSelect'
import { useFormik } from 'formik'
import { sendWeightFile } from 'api/dashboard'
import { CoefficientsState } from 'types/coefficients'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { coeffs } from 'store/selectors'
import { useTranslation } from 'react-i18next'

export const WeightsUpload = () => {
  const { t } = useTranslation(['profile'])
  const curLang = localStorage.getItem('i18nextLng')
  const [files, setFiles] = useState<File[]>([])
  const [chosenWeight, setChosenWeight] = useState<number>(-1)
  const [errorText, setErrorText] = useState<string>('')
  const [isLoading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const availableExtensions = ['pth', 'pt']

  const coefficients: CoefficientsState = useSelector<
    RootState,
    CoefficientsState
  >(coeffs)

  const handleOnDrop = useCallback(
    (newWeightFile: File[]) => {
      setFiles(newWeightFile)
    },
    [files]
  )

  const checkFilledFields = (): boolean => {
    if (files.length === 0) {
      setErrorText(`${t('noFile')}`)
      return false
    }
    if (chosenWeight === -1) {
      setErrorText(`${t('choseCoefficient')}`)
      return false
    } else return true
  }

  const handleDataSubmit = async (formProps: any) => {
    if (formProps.name.split('.').length > 2) {
      setErrorText(`${t('fileWithDots')}`)
      setLoading(false)
      return false
    }

    if (!availableExtensions.includes(formProps.name.split('.')[1])) {
      setErrorText(`${t('wrongExtension')}`)
      setLoading(false)
      return false
    }
    const fd = new FormData()
    fd.append('weightFile', formProps)
    fd.append('coefficient', '' + chosenWeight)
    fd.append('curLang', '' + curLang)
    try {
      sendWeightFile(fd)
        .then((resp) => {
          setErrorText('')
          setFinished(true)
        })
        .catch((e) => {
          setErrorText(e.response.data.msg)
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (err) {
      setErrorText(`${t('error')}`)
    }
  }

  const { handleSubmit, values } = useFormik({
    initialValues: { file: files, weightValue: chosenWeight },
    onSubmit: async () => {
      const submit: boolean = checkFilledFields()
      if (submit) {
        setErrorText('')
        setLoading(true)
        try {
          await handleDataSubmit(files[0])
        } catch (err) {
          setLoading(false)
          setErrorText(`${t('errorUploading')}`)
        }
      }
    },
  })

  const handleSetWeight = useCallback(
    (num: number) => {
      setChosenWeight(num)
    },
    [chosenWeight]
  )

  const resetForm = (): void => setFiles([])

  return (
    <ST.Container>
      <ST.DropContainer>
        <ST.DropArea>
          <DropField
            handleOnDrop={handleOnDrop}
            files={files}
            resetForm={resetForm}
            value={values.file}
            setError={setErrorText}
            isLoading={isLoading}
            finishedUpload={finished}
          />
          <ST.ButtonContainer>
            <BaseSelect
              isSmallSelect={true}
              placeHolder={`${t('coefficients')}`}
              listItems={coefficients.coefficients}
              name={'Coefficients'}
              value={values.weightValue}
              typeSelect={'Coefficients'}
              setChosen={handleSetWeight}
            />
            <ST.SubmitButton
              type="submit"
              onClick={() => {
                handleSubmit()
              }}
            >
              {t('submit')}
            </ST.SubmitButton>
          </ST.ButtonContainer>
          <ST.ErrorText>{errorText ? errorText : ''}</ST.ErrorText>
        </ST.DropArea>
      </ST.DropContainer>
    </ST.Container>
  )
}
