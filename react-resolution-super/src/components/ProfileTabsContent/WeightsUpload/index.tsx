import React, { useCallback, useState } from 'react'
import * as ST from './styled'
import { checkUploadsAmount } from 'api/subscription'
import { DropField } from './DropField'
import BaseSelect from '../../ui/BaseSelect'
import { useFormik } from 'formik'
import { sendWeightFile } from 'api/dashboard'
import { CoefficientsState } from 'types/coefficients'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'

export const WeightsUpload = () => {
  const [files, setFiles] = useState<File[]>([])
  const [chosenWeight, setChosenWeight] = useState<number>(-1)
  const [errorText, setErrorText] = useState<string>('')
  const [isLoading, setLoading] = useState(false)
  const availableExtensions = ['pth', 'pt']

  const coefficients: CoefficientsState = useSelector<
    RootState,
    CoefficientsState
  >((state) => state.coeffs)

  const handleOnDrop = useCallback(
    (newWeightFile: File[]) => {
      setFiles(newWeightFile)
    },
    [files]
  )

  const checkFilledFields = (): boolean => {
    if (files.length === 0) {
      setErrorText('No file was chosen')
      return false
    }
    if (chosenWeight === -1) {
      setErrorText('Chose coefficient value')
      return false
    } else return true
  }

  const handleDataSubmit = async (formProps: any) => {
    if (formProps.name.split('.').length > 2) {
      setErrorText('File name includes more than one dots')
      return false
    }

    if (!availableExtensions.includes(formProps.name.split('.')[1])) {
      setErrorText('File extension must be .pth or .pt')
      return false
    }
    const fd = new FormData()
    fd.append('weightFile', formProps)
    fd.append('coefficient', '' + chosenWeight)
    try {
      sendWeightFile(fd)
        .then((resp) => {
          setErrorText('')
        })
        .catch((e) => {
          setErrorText(e.response.data.msg)
        })
    } catch (err) {
      setErrorText('Error')
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
          handleDataSubmit(files[0])
          setLoading(false)
        } catch (err) {
          setLoading(false)
          setErrorText('Error in uploading')
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
          />
          <ST.ButtonContainer>
            <BaseSelect
              isSmallSelect={true}
              placeHolder={'Coefficients'}
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
              Submit
            </ST.SubmitButton>
          </ST.ButtonContainer>
          <ST.ErrorText>{errorText ? errorText : ''}</ST.ErrorText>
        </ST.DropArea>
      </ST.DropContainer>
    </ST.Container>
  )
}
