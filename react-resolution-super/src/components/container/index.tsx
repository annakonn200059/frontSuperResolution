import React, { ReactElement, FC } from 'react'
import * as ST from './styled'

interface Props {
  children: ReactElement | ReactElement[] | string | null
}
export const Container: FC<Props> = ({ children }: Props) => (
  <ST.Container>{children}</ST.Container>
)
