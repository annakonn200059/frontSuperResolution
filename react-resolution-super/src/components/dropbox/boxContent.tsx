import ImagePreview from './imagePreview'
import Placeholder from './placeholder'
import React from 'react'

interface IBoxContent {
  files: File[]
}

const BoxContent = ({ files }: IBoxContent) => {
  return (
    <div>
      {files && files.length > 0 ? (
        <ImagePreview files={files} />
      ) : (
        <Placeholder />
        /*<Placeholder error={error} touched={touched} />*/
      )}
    </div>
  )
}

export default BoxContent
