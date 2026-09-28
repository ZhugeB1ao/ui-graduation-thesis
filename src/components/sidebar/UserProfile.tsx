import type { User } from '@/domain/types'
import { UserAvatar } from './UserAvatar'

interface UserProfileProps {
  user: User
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="p-3 border-t border-white/5 flex items-center gap-2.5">
      <UserAvatar initials={user.initials} color={user.avatarColor} />
      <div className="min-w-0 flex flex-col">
        <span className="text-[14px] text-white font-medium truncate leading-tight">
          {user.name}
        </span>
        <span className="text-xs text-[#8e8e8e] truncate">
          MSSV: {user.studentId}
        </span>
      </div>
    </div>
  )
}
