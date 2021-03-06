import styled from 'styled-components'
import { COLORS } from '../../constants/colors'
import UploadImage from 'assets/images/Upload_Illustration.svg'
import { ReactComponent as Trash } from 'assets/icons/delete.svg'
import Zip from 'assets/icons/file_zip.svg'

export const DropArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const DropeZone = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`

interface ContainerDropBoxProps {
  active: boolean
  finishedUpload?: boolean
  isLoading?: boolean
}

export const ContainerDropBox = styled.div<ContainerDropBoxProps>`
  padding: ${(props) => (!props.isLoading ? `15px 0 50px 0` : `40px 0 50px 0`)};
  position: relative;
  width: 558px;
  border: 4px dashed
    ${(props) =>
      props.finishedUpload
        ? `${COLORS.green}`
        : props.active
        ? `${COLORS.blue}`
        : `${COLORS.backgroundGrey}`};
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

export const FileNamesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`

interface INameFile {
  finishedUpload?: boolean
}

export const FileNameHeader = styled.div<INameFile>`
  margin-top: 8px;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 18px;
  color: ${(props) =>
    props.finishedUpload ? `${COLORS.green}` : `${COLORS.blue}`};
`
export const FileName = styled.div`
  position: relative;
  //text-align: center;
  word-break: break-word;
  max-width: 85%;
`
export const ModalHeader = styled.div`
  color: ${COLORS.lightGrey};
  font-size: 20px;
`
export const LoginLink = styled.span`
  color: ${COLORS.blue};
  cursor: pointer;
  font-weight: 600;
`

export const DeleteButton = styled(Trash)`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`

export const FileItem = styled.div`
  ::before {
    content: '';
    width: 24px;
    height: 24px;
    background: url(${Zip}) 99% 50% no-repeat;
    position: absolute;
    top: 1px;
    left: -30px;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

export const SubmitButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px 20px 23px 20px;
  width: 140px;
  height: 40px;
  background: ${COLORS.blue};
  border-radius: 10px;
  user-select: none;
  color: ${COLORS.white};
  font-size: 16px;
  line-height: 140%;
  margin-left: 40px;
  &:disabled {
    background: ${COLORS.lightGrey};
  }
`

export const DownloadPhotoLink = styled.p`
  color: ${COLORS.blue};
  text-decoration: underline;
  margin-top: 20px;
  cursor: pointer;
`

export const ErrorText = styled.div`
  margin-top: 20px;
  line-height: 140%;
  color: ${COLORS.errorRed};
  margin-bottom: 15px;
  font-size: 16px;
`

export const LoaderWrapper = styled.div`
  margin-top: 10%;
`
