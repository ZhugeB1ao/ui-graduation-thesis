import { SidebarRightIcon } from '@/components/icons'

interface TopHeaderProps {
  showRightToggle: boolean
  onToggleRight: () => void
}

export function TopHeader({ showRightToggle, onToggleRight }: TopHeaderProps) {
  return (
    <header className="h-14 flex items-center justify-end px-5 gap-3.5 flex-shrink-0 z-10">
      <button
        className="flex items-center gap-1.5 text-[#55b9ff] hover:text-[#7dcdff] text-[13.5px] font-normal transition-colors py-1.5 px-2.5 rounded-lg hover:bg-white/5"
        type="button"
      />
      {showRightToggle && (
        <button
          aria-label="Mở thanh bên"
          className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          type="button"
          onClick={onToggleRight}
        >
          <SidebarRightIcon className="w-5 h-5" />
        </button>
      )}
    </header>
  )
}
