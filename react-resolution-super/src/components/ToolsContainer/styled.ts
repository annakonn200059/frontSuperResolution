import styled from 'styled-components'
import { COLORS } from 'constants/colors'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

interface IToolItem {
  isActive: boolean
}

export const ToolItem = styled.div<IToolItem>`
  background-color: ${(props) =>
    props.isActive ? `${COLORS.backgroundGrey}` : ''};
  border-radius: 45px;
  margin-top: 18px;
  display: flex;
  cursor: pointer;
  padding: 10px 0 10px 28px;

  &:hover {
    background-color: ${COLORS.backgroundGrey};
    background-opacity: 0.6;
  }
`

export const ItemHeader = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: ${COLORS.neutral3};
`

interface IToolImg {
  img: string
}

export const ToolIcon = styled.img<IToolImg>`
  //background: url(${(props) => props.img}) 50% 50% no-repeat;
  //background: url('src/assets/icons/dashboard.svg') 50% 50% no-repeat;
  width: 24px;
  height: 24px;
  // border-radius: 50%;
  //background-size: 81px 45px;
  margin-right: 15px;
  //margin-bottom: 10px;
`
