import React from 'react'
import * as ST from './styled'
import { UserTools, AdminTools } from './data'

interface ITools {
  isAdmin: boolean
  setTool: (tool: number) => void
  tool: number
}

export const ToolsContainer = ({ isAdmin, setTool, tool }: ITools) => {
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
          <ST.ItemHeader>{toolEl.toolName}</ST.ItemHeader>
        </ST.ToolItem>
      ))}
    </ST.Container>
  )
}
