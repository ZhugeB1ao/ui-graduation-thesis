interface ChatHistoryItemProps {
  title: string
  isActive: boolean
  onClick: () => void
}

export function ChatHistoryItem({ title, isActive, onClick }: ChatHistoryItemProps) {
  if (isActive) {
    return (
      <div
        className="w-full flex items-center px-3 py-2 rounded-xl bg-[#212121] text-white font-normal truncate cursor-pointer"
        onClick={onClick}
      >
        {title}
      </div>
    )
  }

  return (
    <button
      className="w-full flex items-center px-3 py-2 rounded-xl text-white/90 hover:bg-[#212121] transition-colors text-left font-normal truncate"
      type="button"
      onClick={onClick}
    >
      {title}
    </button>
  )
}
