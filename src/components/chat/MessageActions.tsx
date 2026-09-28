import { CopyIcon, ThumbsDownIcon, ShareIcon, RegenerateIcon, MoreDotsIcon } from '@/components/icons'
import { IconButton } from '@/components/common/IconButton'

export function MessageActions() {
  return (
    <div className="flex items-center gap-3 pt-1 text-[#8f8f8f]">
      <IconButton label="Sao chép">
        <CopyIcon />
      </IconButton>
      <IconButton label="Không thích">
        <ThumbsDownIcon />
      </IconButton>
      <IconButton label="Chia sẻ">
        <ShareIcon />
      </IconButton>
      <IconButton label="Tạo lại phản hồi">
        <RegenerateIcon />
      </IconButton>
      <IconButton label="Tùy chọn khác">
        <MoreDotsIcon />
      </IconButton>
    </div>
  )
}
