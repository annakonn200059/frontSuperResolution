import styled from 'styled-components'
import { COLORS } from '../../constants/colors'
import UploadImage from 'assets/images/Upload_Illustration.svg'

export const DropeZone = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`

export const ContainerDropBox = styled.div`
  padding: 15px 0 10px 0;
  width: 558px;
  height: 235px;
  border: 4px dashed ${COLORS.backgroundGrey};
  border-radius: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`
export const HeaderBox = styled.p`
  margin-top: 15px;
`

export const ImageBox = styled.div`
  background-image: url(${UploadImage});
  background-repeat: no-repeat;
  height: 160px;
  width: 217px;
`

export const FileNamesContainer = styled.div``
export const FileNameHeader = styled.div``
export const FileName = styled.div``
