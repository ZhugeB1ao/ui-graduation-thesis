import { useState, useCallback } from 'react'

export type LeftSidebarState = 'collapsed' | 'expanded'
export type RightSidebarState = 'hidden' | 'sources' | 'detail'

export function useSidebar() {
  const [leftSidebar, setLeftSidebar] = useState<LeftSidebarState>('collapsed')
  const [rightSidebar, setRightSidebar] = useState<RightSidebarState>('hidden')

  const toggleLeft = useCallback(() => {
    setLeftSidebar(s => s === 'collapsed' ? 'expanded' : 'collapsed')
  }, [])

  const toggleRight = useCallback(() => {
    setRightSidebar(s => s === 'hidden' ? 'sources' : 'hidden')
  }, [])

  const setRightTab = useCallback((tab: RightSidebarState) => {
    setRightSidebar(tab)
  }, [])

  return { leftSidebar, rightSidebar, toggleLeft, toggleRight, setRightTab }
}
