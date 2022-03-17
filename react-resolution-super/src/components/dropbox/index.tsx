import React, { useCallback, useState } from 'react'
import * as ST from './styled'
import { AuthState } from '../../types/authType'
import DropZoneField from './dropField'

interface IDropBox {
  stateUser: AuthState
}

const DropBox = (props: IDropBox) => {
  const [files, setFiles] = useState<File[]>([])

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
  const resetForm = () => setFiles([])

  return (
    <section>
      <DropZoneField handleOnDrop={handleOnDrop} files={files} />
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
