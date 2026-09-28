import type { ReactNode } from 'react'
import { LeftSidebarRail } from './LeftSidebarRail'
import { LeftSidebarExpanded } from './LeftSidebarExpanded'
import { RightSidebar } from './RightSidebar'
import { TopHeader } from './TopHeader'
import { useAppSelector } from '@/store'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { leftSidebar, rightSidebar } = useAppSelector((state) => state.sidebar)

  return (
    <div className="h-full flex overflow-hidden select-none text-[15px]">
      {/* Left Sidebar */}
      {leftSidebar === 'collapsed' ? (
        <LeftSidebarRail />
      ) : (
        <LeftSidebarExpanded />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-full bg-black relative overflow-hidden">
        <TopHeader />
        {children}
      </div>

      {/* Right Sidebar */}
      {rightSidebar !== 'hidden' && (
        <RightSidebar />
      )}
    </div>
  )
}
