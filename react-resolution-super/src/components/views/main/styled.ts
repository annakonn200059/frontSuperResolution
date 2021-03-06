import styled from 'styled-components'
import { COLORS } from 'constants/colors'
import { ReactComponent as ArrowEl } from 'assets/examples/arrow.svg'

export const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 30px 30px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const IntroContainer = styled.div`
  width: 100%;
  height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.backgroundGrey};
  padding-top: 30vh;
`
export const DropBoxContainer = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25vh;
`
export const ExamplesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.lightBlue};
`

export const MainHeader = styled.div`
  font-weight: 600;
  font-size: 40px;
  color: ${COLORS.lightGrey};
  margin-bottom: 50px;
  white-space: pre-line;
  text-align: center;
`

export const ScrollButton = styled.button`
  background-color: ${COLORS.blue};
  padding: 10px 20px;
  border-radius: 10px;
  color: ${COLORS.white};
  font-weight: 600;
  margin-bottom: 40vh;
  font-size: 16px;
  cursor: pointer;
`

export const DropHeader = styled.div`
  font-weight: 600;
  font-size: 25px;
  color: ${COLORS.lightGrey};
  margin-bottom: 30px;
`

export const ContainerPhotoBlocks = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 100px;
  padding-bottom: 100px;
  column-gap: 130px;
`

interface IPhotoBlock {
  isLeft?: boolean
}

export const SectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const BotLinkContainer = styled.div`
  margin-left: 200px;
  margin-bottom: 50px;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: ${COLORS.lightGrey};
  text-shadow: 0 4px 20px rgb(0 0 0 / 20%);
  white-space: pre-wrap;
`

export const BotLink = styled.a`
  color: ${COLORS.blue};
  cursor: pointer;
`

export const PhotoBlock = styled.div<IPhotoBlock>`
  display: flex;
  justify-content: ${(props) => (props.isLeft ? 'flex-start' : 'flex-start')};
  margin-left: ${(props) => (props.isLeft ? '200px' : '330px')};
`

const Photo = styled.img`
  box-shadow: 0 4px 40px rgb(0 0 0 / 30%);
  border-radius: 8px;
`
export const Photo1 = styled(Photo)`
  width: 86px;
  height: 96px;
`
export const Photo2 = styled(Photo)`
  width: 166px;
  height: 196px;
`
export const Photo3 = styled(Photo)`
  width: 256px;
  height: 296px;
`

export const Photos = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  padding-right: 200px;
  width: 100%;
`

export const DescriptionText = styled.div`
  text-align: justify;
  max-width: 380px;
  white-space: pre-wrap;
  font-size: 16px;
  line-height: 28px;
  color: ${COLORS.lightGrey};
  text-shadow: 0 4px 20px rgb(0 0 0 / 20%);
`

const Arrow = styled(ArrowEl)`
  position: relative;
`

export const Arrow1 = styled(Arrow)`
  transform: rotate(25deg);
  top: 40px;
  left: 40px;
`
export const Arrow2 = styled(Arrow)`
  transform: scale(-1, 1) rotate(40deg);
  top: 120px;
  right: 40px;
`
