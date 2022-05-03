import React, {
  FC,
  ReactElement,
  ReactHTMLElement,
  useEffect,
  useState,
} from 'react'
import * as ST from './styled'
import DefaultPopup from '../defaultModal'

interface ISelectProps {
  text: string | ReactElement | undefined
  show: boolean
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}

const InformModal: FC<ISelectProps> = ({
  text,
  show,
  onClose,
}: ISelectProps) => {
  const handleClose = (): void => {
    onClose(!show)
  }

  return (
    <DefaultPopup show={show} onClose={handleClose}>
      <ST.PopupContent>
        <ST.HeaderText>{text}</ST.HeaderText>
        <ST.PopupCloseButton onClick={handleClose}>OK</ST.PopupCloseButton>
      </ST.PopupContent>
    </DefaultPopup>
  )
}

export default InformModal
