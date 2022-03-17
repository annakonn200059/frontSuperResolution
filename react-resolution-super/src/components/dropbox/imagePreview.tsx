import React from 'react'

interface IImagePreview {
  files: File[]
}
const ImagePreview = ({ files }: IImagePreview) => {
  return (
    <React.Fragment>
      {files.map(({ name, size }) => (
        <div key={name} className="render-preview">
          <div className="image-container">{name}</div>
          <div className="details">
            {name} - {(size / 1024000).toFixed(2)}MB
          </div>
        </div>
      ))}
    </React.Fragment>
  )
}
export default ImagePreview
