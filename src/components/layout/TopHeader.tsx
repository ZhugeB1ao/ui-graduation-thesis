import { SidebarRightIcon } from '@/components/icons'
import { useAppDispatch, useAppSelector } from '@/store'
import { toggleRightSidebar } from '@/store/slices/sidebarSlice'

export function TopHeader() {
  const dispatch = useAppDispatch()
  const { rightSidebar } = useAppSelector((state) => state.sidebar)
  const sourcesCount = useAppSelector((state) => state.chat.sources.length)

  const showRightToggle = rightSidebar === 'hidden'

  return (
    <header className="h-14 flex items-center justify-end px-5 gap-3.5 flex-shrink-0 z-10">
      <button
        className="flex items-center gap-1.5 text-[#55b9ff] hover:text-[#7dcdff] text-[13.5px] font-normal transition-colors py-1.5 px-2.5 rounded-lg hover:bg-white/5"
        type="button"
      />
      {showRightToggle && (
        <button
          aria-label="Mở thanh bên"
          className="relative text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          type="button"
          onClick={() => dispatch(toggleRightSidebar())}
        >
          <SidebarRightIcon className="w-5 h-5" />
          {sourcesCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#1d63d6]" />
          )}
        </button>
      )}
    </header>
  )
}
