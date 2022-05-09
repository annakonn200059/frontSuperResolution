import styled from 'styled-components'
import { COLORS } from 'constants/colors'

export const Container = styled.div`
  padding: 50px 60px 0 60px;
  display: flex;
  flex-direction: column;
  //justify-content: flex-start;
  align-items: flex-start;
`

export const BlocksWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 100px;
  width: 100%;
  margin-top: 50px;
  //align-items: flex-start;
`

export const Header = styled.h1`
  font-size: 48px;
  line-height: 74px;
  color: ${COLORS.lightGrey};
`

export const BlockContainer = styled.div`
  padding: 40px;
  box-shadow: 0 8px 64px rgba(15, 34, 67, 0.05), 0 0 1px rgba(15, 34, 67, 0.08);
  border-radius: 8px;
`
