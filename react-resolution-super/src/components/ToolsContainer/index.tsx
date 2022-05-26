import React from 'react'
import * as ST from './styled'
import { UserTools, AdminTools } from './data'
import { useTranslation } from 'react-i18next'

interface ITools {
  isAdmin: boolean
  setTool: (tool: number) => void
  tool: number
}

export const ToolsContainer = ({ isAdmin, setTool, tool }: ITools) => {
  const { t } = useTranslation(['profile'])
  const dataToolsItems = isAdmin ? AdminTools : UserTools
  return (
    <ST.Container>
      {dataToolsItems.map((toolEl) => (
        <ST.ToolItem
          key={toolEl.id}
          isActive={tool === toolEl.id}
          onClick={() => setTool(toolEl.id)}
        >
          <ST.ToolIcon
            src={require(`assets/icons/${toolEl.img}.svg`)}
            img={toolEl.img}
          />
          <ST.ItemHeader>{t(`${toolEl.toolName}`)}</ST.ItemHeader>
        </ST.ToolItem>
      ))}
    </ST.Container>
  )
}
