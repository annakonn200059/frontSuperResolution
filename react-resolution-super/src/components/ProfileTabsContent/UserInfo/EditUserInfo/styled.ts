import styled from 'styled-components'
import Edit from 'assets/icons/subscriptions.svg'
import { COLORS } from 'constants/colors'

export const UserFieldsWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  row-gap: 20px;
  width: 100%;
`

export const FieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.2fr;
`

export const FieldHeader = styled.p`
  font-weight: bold;
`

const UserField = styled.div``

export const EditImage = styled.div`
  width: 20px;
  height: 20px;
  background: url(${Edit}) 50% 50% no-repeat;
  cursor: pointer;
`

export const NameField = styled(UserField)``
export const EmailField = styled(UserField)``
export const PasswordField = styled(UserField)``

export const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: pre-line;
`

export const HeaderText = styled.div`
  text-align: center;
  white-space: pre-wrap;
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 25px;
`

export const SubHeader = styled.p`
  color: ${COLORS.lightGrey};
  margin-bottom: 20px;
`

export const NewPropertyInput = styled.input`
  padding: 0 0 3px 20px;
  width: calc(250px);
  max-width: 480px;
  min-width: 220px;
  height: 47px;
  border-radius: 16px;
  background: ${COLORS.white};
  font-size: 16px;
  line-height: 140%;
  border: 1px solid ${COLORS.blue};
  color: ${COLORS.lightGrey};
  margin-bottom: 30px;
`

export const InputLabel = styled.div`
  font-weight: 600;
  line-height: 1.5;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 10px;
  display: inline-block;
`

export const ErrorText = styled.div`
  font-size: 14px;
  line-height: 140%;
  color: ${COLORS.errorRed};
  margin-bottom: 15px;
`

export const SubmitButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 40px;
  width: 100px;
  height: 38px;
  background: ${COLORS.blue};
  border-radius: 8px;
  user-select: none;
  color: ${COLORS.white};
  font-size: 16px;
  line-height: 140%;
`
