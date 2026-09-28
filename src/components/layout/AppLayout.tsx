import type { ReactNode } from 'react'
import { LeftSidebarRail } from './LeftSidebarRail'
import { LeftSidebarExpanded } from './LeftSidebarExpanded'
import { RightSidebar } from './RightSidebar'
import { TopHeader } from './TopHeader'
import type { LeftSidebarState, RightSidebarState } from '@/hooks/useSidebar'
import type { User, Conversation, SourceCitation } from '@/domain/types'

interface AppLayoutProps {
  leftSidebar: LeftSidebarState
  rightSidebar: RightSidebarState
  user: User
  conversations: Conversation[]
  activeConversationId: string | null
  sources: SourceCitation[]
  onToggleLeft: () => void
  onToggleRight: () => void
  onSetRightTab: (tab: RightSidebarState) => void
  onSelectConversation: (id: string) => void
  onNewChat: () => void
  children: ReactNode
}

export function AppLayout({
  leftSidebar,
  rightSidebar,
  user,
  conversations,
  activeConversationId,
  sources,
  onToggleLeft,
  onToggleRight,
  onSetRightTab,
  onSelectConversation,
  onNewChat,
  children,
}: AppLayoutProps) {
  return (
    <div className="h-full flex overflow-hidden select-none text-[15px]">
      {/* Left Sidebar */}
      {leftSidebar === 'collapsed' ? (
        <LeftSidebarRail
          user={user}
          onToggle={onToggleLeft}
          onNewChat={onNewChat}
        />
      ) : (
        <LeftSidebarExpanded
          user={user}
          conversations={conversations}
          activeConversationId={activeConversationId}
          onClose={onToggleLeft}
          onSelectConversation={onSelectConversation}
          onNewChat={onNewChat}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-full bg-black relative overflow-hidden">
        <TopHeader
          showRightToggle={rightSidebar === 'hidden'}
          onToggleRight={onToggleRight}
        />
        {children}
      </div>

      {/* Right Sidebar */}
      {rightSidebar !== 'hidden' && (
        <RightSidebar
          activeTab={rightSidebar}
          onClose={onToggleRight}
          onTabChange={onSetRightTab}
          sources={sources}
        />
      )}
    </div>
  )
}
