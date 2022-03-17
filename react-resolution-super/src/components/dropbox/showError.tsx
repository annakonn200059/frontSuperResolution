import React from 'react'

interface IError {
  error: string
}

const ShowError = ({ error }: IError) => <div className="error">{error}</div>

export default ShowError
