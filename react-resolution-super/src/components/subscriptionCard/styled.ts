import styled from 'styled-components'
import { COLORS } from 'constants/colors'
import { ReactComponent as EditButton } from 'assets/icons/subscriptions/subscriptions.svg'
import { ReactComponent as DeleteButton } from 'assets/icons/subscriptions/delete.svg'

export const SubscriptionCard = styled.div`
  //padding: 20px;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 295px;
`

export const CardHeader = styled.h4`
  padding: 15px 0 15px 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  text-align: center;
  border-radius: 8px 8px 0 0;
  margin-top: -1px;
  position: relative;
`

export const SubscriptionName = styled.p`
  text-align: center;
`

export const EditContact = styled(EditButton)`
  cursor: pointer;
  position: absolute;
  top: 13px;
  right: 13px;
`
export const DeleteContact = styled(DeleteButton)`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
`

export const CardBody = styled.div`
  flex: 1 1 auto;
  padding: 1rem 1rem;
  text-align: center;
`

export const Price = styled.h1``

export const SubscriptionInfoList = styled.div`
  margin: 15px 0 15px 0;
  text-align: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`
export const InfoItem = styled.div`
  max-width: 90%;
  margin-top: 5px;
  &:last-child {
    margin-top: 10px;
  }
`

export const AmountSpan = styled.span`
  font-weight: bold;
`
