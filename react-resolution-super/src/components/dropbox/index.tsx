import React, { useCallback, useState } from 'react'
import * as ST from './styled'
import { AuthState } from '../../types/authType'
import DropZoneField from './dropField'
import BaseSelect from 'components/ui/BaseSelect'

interface IDropBox {
  stateUser: AuthState
  coefficients: number[]
}

const DropBox = ({ stateUser, coefficients }: IDropBox) => {
  const [files, setFiles] = useState<File[]>([])
  const [chosenCoefficient, setChosenCoefficient] = useState<number>(-1)
  const handleFormSubmit = (formProps: any) => {
    const fd = new FormData()
    fd.append('imageFile', formProps.imageToUpload[0])
    alert(JSON.stringify(formProps, null, 4))
  }
  const handleOnDrop = useCallback(
    (newImageFile: File[]) => {
      setFiles(newImageFile)
    },
    [files]
  )
  const handleAddBlockInstitution = useCallback(
    (num: number) => {
      setChosenCoefficient(num)
    },
    [chosenCoefficient]
  )

  const resetForm = () => setFiles([])
  return (
    <section>
      <DropZoneField handleOnDrop={handleOnDrop} files={files} />
      <BaseSelect
        isSmallSelect={true}
        placeHolder={'Coefficients'}
        listItems={coefficients}
        name={'departmentHead'}
        value={'sdsdf'}
        typeSelect={'departmentHead'}
        setChosen={handleAddBlockInstitution}
        activeElements={[coefficients[0]]}
      />
      <button
        type="submit"
        //disabled={this.props.submitting}
      >
        Submit
      </button>
      <button
        //disabled={this.props.pristine || this.props.submitting}
        onClick={resetForm}
      >
        Clear
      </button>
      <div className="clear" />
    </section>
  )
}

export default DropBox
