import styled from 'styled-components'
import { COLORS } from 'constants/colors'
import Check from 'assets/images/select/check.svg'
import ArrowUp from 'assets/images/select/arrow_up.svg'
import ArrowDown from 'assets/images/select/arrow_down.svg'

interface ISelect {
  isOpen: boolean
  isSmallSelect?: boolean
}

export const SelectBlock = styled.div`
  position: relative;
`

export const DropDownList = styled.div<ISelect>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  width: ${(props) => (props.isSmallSelect ? '120px' : 'calc(100% - 40px)')};
  background: ${COLORS.white};
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 10px 10px;
  padding: 10px 0 10px 20px;
  flex-direction: column;
  gap: 12px;
  position: absolute;
  z-index: 2;
  top: 30px;
`

interface IListItem {
  active?: boolean
}

export const ListItem = styled.p<IListItem>`
  font-size: 16px;
  line-height: 140%;
  color: ${(props) =>
    props.active ? `${COLORS.lightGrey}` : `${COLORS.backgroundGrey}`};
  position: relative;
  :hover {
    cursor: pointer;
    color: ${(props) => (props.active ? '#606060' : ``)};
  }

  &.active {
    color: ${COLORS.lightGrey};

    :after {
      content: '';
      background: url(${Check});
      width: 24px;
      height: 24px;
      right: 5px;
      position: absolute;
    }
  }
`

export const Select = styled.input<ISelect>`
  border-radius: 10px;
  border: none;
  background: ${(props) =>
      props.isOpen
        ? `${COLORS.white} url(${ArrowUp})`
        : `${COLORS.inputBG} url(${ArrowDown})`}
    95% 50% no-repeat;
  box-shadow: ${(props) =>
    props.isOpen ? '0 -1px 8px rgba(0, 0, 0, 0.1)' : 'null'};
  padding: 10px 30px 10px 20px;
  height: 20px;
  font-weight: 400;
  font-size: 16px;
  line-height: 110%;
  width: ${(props) => (props.isSmallSelect ? '90px' : 'calc(100% - 40px)')};
  color: ${COLORS.lightGrey};

  ::placeholder {
    opacity: 1;
    color: ${COLORS.lightGrey};
  }

  :hover {
    cursor: pointer;
  }
`
