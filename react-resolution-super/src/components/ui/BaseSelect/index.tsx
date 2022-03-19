import React, { FC, useEffect, useState } from 'react'
import * as ST from './styled'
import { useDispatch } from 'react-redux'
import InformModal from '../Modals/InfromModal'

interface Props {
  placeHolder: string
  listItems: any[]
  isSmallSelect?: boolean
  passValue?: (type: string, currentValue: string) => void
  typeSelect?: string
  name?: string
  value?: string
  setActive?: (str: string) => void
  activeSelect?: string | null
  setChosen?: (any: number) => void
  activeElements?: any[]
}

const BaseSelect: FC<Props> = ({
  placeHolder,
  isSmallSelect,
  typeSelect,
  listItems,
  passValue,
  setActive,
  activeSelect,
  setChosen,
  activeElements,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [valueSelect, setValueSelect] = useState<string>('')
  const [visibleValues, setVisibleValues] = useState<boolean>(false)
  const [visibleItem, setVisibleItem] = useState<number>(-1)
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleModal = (): void => {
    setShowModal(!showModal)
  }

  const dispatch = useDispatch()
  const handleClickSelect = (): void => {
    setOpen(!open)
    if (setActive) {
      setActive(typeSelect!)
    }
  }

  useEffect(() => {
    if (activeSelect !== typeSelect && activeSelect) {
      setOpen(false)
    }
  }, [handleClickSelect])

  const handleClick = (
    item: any,
    index: number,
    type: string,
    value: any,
    active: boolean
  ): void => {
    if (active) {
      setVisibleItem(index)
      setValueSelect(item)
      if (setChosen) {
        setChosen(item)
      }
      if (passValue) {
        passValue!(type, value)
      }
    } else {
      handleModal()
    }
    setVisibleValues(true)
    setTimeout(() => setOpen(!open), 150)
  }
  return (
    <>
      <ST.SelectBlock>
        <ST.Select
          onClick={handleClickSelect}
          isOpen={open}
          readOnly={true}
          placeholder={visibleValues ? '' : placeHolder}
          value={visibleValues ? valueSelect : ''}
          isSmallSelect={isSmallSelect}
        />
        <ST.DropDownList isOpen={open} isSmallSelect={isSmallSelect}>
          {open
            ? listItems!.map((item, index) => {
                let activeEl = true
                if (activeElements) {
                  activeEl = activeElements.indexOf(item) !== -1
                }
                return (
                  <ST.ListItem
                    active={activeEl}
                    key={index}
                    onClick={() =>
                      handleClick(
                        item,
                        index,
                        typeSelect!,
                        listItems![index],
                        activeEl
                      )
                    }
                    className={visibleItem === index ? 'active' : ''}
                  >
                    {item}
                  </ST.ListItem>
                )
              })
            : null}
        </ST.DropDownList>
      </ST.SelectBlock>
      <InformModal
        text={'This coefficient is available only for authorized users'}
        show={showModal}
        onClose={handleModal}
      />
    </>
  )
}

export default BaseSelect
