import { SidebarLeftIcon, PencilIcon, SearchIcon, ChatBubbleIcon } from '@/components/icons'
import { UserAvatar } from '@/components/sidebar/UserAvatar'
import type { User } from '@/domain/types'

interface LeftSidebarRailProps {
  user: User
  onToggle: () => void
  onNewChat: () => void
}

export function LeftSidebarRail({ user, onToggle, onNewChat }: LeftSidebarRailProps) {
  return (
    <aside className="w-[52px] h-full flex flex-col justify-between items-center py-3.5 z-20 flex-shrink-0 bg-black">
      <div className="flex flex-col items-center gap-5 w-full">
        <button
          aria-label="Mở thanh bên trái"
          className="p-1.5 text-white/90 hover:text-white rounded-lg transition-colors"
          type="button"
          onClick={onToggle}
        >
          <SidebarLeftIcon className="w-5 h-5" />
        </button>
        <button
          aria-label="Đoạn chat mới"
          className="p-1.5 text-[#b4b4b4] hover:text-white transition-colors"
          type="button"
          onClick={onNewChat}
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
          onClick={onToggle}
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
