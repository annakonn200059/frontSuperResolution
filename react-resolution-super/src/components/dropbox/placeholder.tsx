import React from 'react'

interface IPlaceHolder {
  error?: string
  touched?: boolean
}

const Placeholder = ({ error, touched }: IPlaceHolder) => (
  <div className={`placeholder-preview ${error && touched ? 'has-error' : ''}`}>
    <p>Click or drag image file to this area to upload.</p>
  </div>
)

export default Placeholder
