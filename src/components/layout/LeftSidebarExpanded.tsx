import { SidebarLeftIcon, SearchIcon, PencilIcon, MoreDotsIcon } from '@/components/icons'
import { ChatHistoryList } from '@/components/sidebar/ChatHistoryList'
import { UserProfile } from '@/components/sidebar/UserProfile'
import { useAppDispatch, useAppSelector } from '@/store'
import { toggleLeftSidebar } from '@/store/slices/sidebarSlice'
import { startNewChat, loadConversation } from '@/store/slices/chatSlice'
import { setActiveId } from '@/store/slices/conversationSlice'

export function LeftSidebarExpanded() {
  const dispatch = useAppDispatch()
  const { user, conversations, activeId } = useAppSelector((state) => state.conversation)

  const handleClose = () => {
    dispatch(toggleLeftSidebar())
  }

  const handleNewChat = () => {
    dispatch(setActiveId(null))
    dispatch(startNewChat())
  }

  const handleSelectConversation = (id: string) => {
    dispatch(setActiveId(id))
    const conv = conversations.find((c) => c.id === id)
    if (conv) {
      dispatch(loadConversation(conv))
    }
  }

  return (
    <aside className="w-[260px] h-full flex flex-col justify-between bg-black text-[#ECECEC] z-20 flex-shrink-0 select-none border-r border-white/5">
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto no-scrollbar px-3 pt-3.5">
        {/* Header */}
        <div className="flex items-center justify-between px-2 mb-4">
          <span className="text-[18px] font-semibold tracking-tight text-white">
            {import.meta.env.VITE_APP_TITLE || 'ChatHSU'}
          </span>
          <div className="flex items-center gap-1 text-[#b4b4b4]">
            <button
              aria-label="Tìm kiếm"
              className="p-1.5 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              type="button"
            >
              <SearchIcon className="w-[18px] h-[18px]" />
            </button>
            <button
              aria-label="Đóng thanh bên"
              className="p-1.5 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              type="button"
              onClick={handleClose}
            >
              <SidebarLeftIcon className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-0.5 mb-5 text-[14px]">
          <button
            className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-white hover:bg-[#212121] transition-colors text-left font-normal"
            type="button"
            onClick={handleNewChat}
          >
            <PencilIcon className="w-5 h-5 text-white/90" />
            <span>Đoạn chat mới</span>
          </button>
          <button
            className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-white hover:bg-[#212121] transition-colors text-left font-normal"
            type="button"
          >
            <MoreDotsIcon className="w-5 h-5 text-white/90" />
            <span>Thêm</span>
          </button>
        </div>

        {/* Chat history */}
        <ChatHistoryList
          conversations={conversations}
          activeId={activeId}
          onSelect={handleSelectConversation}
        />
      </div>

      {/* User profile */}
      <UserProfile user={user} />
    </aside>
  )
}
