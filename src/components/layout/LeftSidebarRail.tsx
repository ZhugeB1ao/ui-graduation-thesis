import { SidebarLeftIcon, PencilIcon, SearchIcon, ChatBubbleIcon } from '@/components/icons'
import { UserAvatar } from '@/components/sidebar/UserAvatar'
import { useAppDispatch, useAppSelector } from '@/store'
import { toggleLeftSidebar } from '@/store/slices/sidebarSlice'
import { startNewChat } from '@/store/slices/chatSlice'
import { setActiveId } from '@/store/slices/conversationSlice'

export function LeftSidebarRail() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.conversation.user)

  const handleToggle = () => {
    dispatch(toggleLeftSidebar())
  }

  const handleNewChat = () => {
    dispatch(setActiveId(null))
    dispatch(startNewChat())
  }

  return (
    <aside className="w-[52px] h-full flex flex-col justify-between items-center py-3.5 z-20 flex-shrink-0 bg-black">
      <div className="flex flex-col items-center gap-5 w-full">
        <button
          aria-label="Mở thanh bên trái"
          className="p-1.5 text-white/90 hover:text-white rounded-lg transition-colors"
          type="button"
          onClick={handleToggle}
        >
          <SidebarLeftIcon className="w-5 h-5" />
        </button>
        <button
          aria-label="Đoạn chat mới"
          className="p-1.5 text-[#b4b4b4] hover:text-white transition-colors"
          type="button"
          onClick={handleNewChat}
        >
          <PencilIcon />
        </button>
        <button
          aria-label="Tìm kiếm"
          className="p-1.5 text-[#b4b4b4] hover:text-white transition-colors"
          type="button"
        >
          <SearchIcon />
        </button>
        <button
          aria-label="Lịch sử chat"
          className="p-1.5 text-[#b4b4b4] hover:text-white transition-colors"
          type="button"
          onClick={handleToggle}
        >
          <ChatBubbleIcon />
        </button>
      </div>
      <div className="mb-1">
        <button aria-label="Hồ sơ người dùng" type="button">
          <UserAvatar initials={user.initials} color={user.avatarColor} />
        </button>
      </div>
    </aside>
  )
}
