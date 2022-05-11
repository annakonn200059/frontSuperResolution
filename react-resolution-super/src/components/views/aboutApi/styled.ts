import styled from 'styled-components'
import { COLORS } from 'constants/colors'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Header = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${COLORS.blue};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const HeaderText = styled.h1`
  color: white;
  text-shadow: 0 4px 20px rgb(0 0 0 / 30%);
`
export const CodeBlock = styled.pre`
  background-color: #404041;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 1px 3px 6px rgb(0 0 0 / 50%);
  margin-top: 40px;
`

export const Wrapper = styled.div`
  padding: 60px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const CodePart = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`

export const CodeHeader = styled.h3`
  font-weight: bold;
  font-size: 1.17em;
  color: ${COLORS.lightGrey};
  text-align: center;
}
`

export const Code = styled.code`
  color: #cecece;
`

export const YellowCode = styled.span`
  color: ${COLORS.yellow};
`

interface IBlueCode {
  isLink?: boolean
}

export const BlueCode = styled.span<IBlueCode>`
  color: ${COLORS.blue};
  ${(props) => (props.isLink ? 'cursor: pointer' : '')}
`
export const GreyCode = styled.span`
  color: #848484;
`
