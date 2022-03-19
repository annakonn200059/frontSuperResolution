import React, { FC, useEffect, useState } from 'react'
import * as ST from './styled'
import { ReactComponent as Close } from 'assets/icons/cancel.svg'

interface ISelectProps {
  children: any
  show: boolean
  onClose: () => void
}

const DefaultPopup: FC<ISelectProps> = ({
  children,
  show,
  onClose,
}: ISelectProps) => {
  //const modalRoot = document.createElement('div')
  //modalRoot.setAttribute('id', 'modal-root')

  return (
    <>
      {show ? (
        <ST.ModalOverlay onClick={onClose}>
          <ST.Modal
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              e.stopPropagation()
            }
          >
            <ST.ModalContent>
              <ST.Close onClick={onClose}>
                <Close />
              </ST.Close>
              {children}
            </ST.ModalContent>
          </ST.Modal>
        </ST.ModalOverlay>
      ) : null}
    </>
  )
}

export default DefaultPopup
