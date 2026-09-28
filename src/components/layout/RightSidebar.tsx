import { SidebarRightIcon, BookIcon, EyeIcon } from '@/components/icons'
import type { RightSidebarState } from '@/hooks/useSidebar'
import type { SourceCitation } from '@/domain/types'

interface RightSidebarProps {
  activeTab: RightSidebarState
  onClose: () => void
  onTabChange: (tab: RightSidebarState) => void
  sources: SourceCitation[]
}

export function RightSidebar({ activeTab, onClose, onTabChange, sources }: RightSidebarProps) {
  return (
    <aside className="w-[340px] h-full flex flex-col justify-between bg-black text-[#ECECEC] z-20 flex-shrink-0 border-l border-white/5 select-none">
      {/* Header */}
      <div className="p-3.5 border-b border-white/5 flex flex-col gap-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold text-white tracking-tight">
              Tài liệu tham chiếu
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#8e8e8e]">
            <button
              aria-label="Đóng thanh tài liệu"
              className="p-1.5 hover:text-white rounded-lg hover:bg-white/10 text-[#8e8e8e] transition-colors"
              type="button"
              onClick={onClose}
            >
              <SidebarRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-[#212121] p-1 rounded-xl gap-1 text-[13px]">
          <button
            className={`flex-1 py-1.5 px-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'sources'
                ? 'bg-black/60 text-white shadow-sm'
                : 'text-[#8e8e8e] hover:text-white'
            }`}
            type="button"
            onClick={() => onTabChange('sources')}
          >
            <BookIcon className={`w-3.5 h-3.5 ${activeTab === 'sources' ? 'text-white' : ''}`} />
            <span>Nguồn trích</span>
            <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/90 ml-0.5">
              {sources.length}
            </span>
          </button>
          <button
            className={`flex-1 py-1.5 px-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'detail'
                ? 'bg-black/60 text-white shadow-sm'
                : 'text-[#8e8e8e] hover:text-white'
            }`}
            type="button"
            onClick={() => onTabChange('detail')}
          >
            <EyeIcon className={`w-3.5 h-3.5 ${activeTab === 'detail' ? 'text-white' : ''}`} />
            <span>Xem chi tiết</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto no-scrollbar p-3.5 space-y-4">
        {activeTab === 'sources' && (
          <div className="space-y-2">
            {sources.map(source => (
              <div
                key={source.id}
                className="p-2.5 rounded-xl bg-[#212121]/60 hover:bg-[#212121] border border-white/5 hover:border-white/15 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-2.5">
                  <div className="min-w-0">
                    <h4 className="text-[13px] font-medium text-white truncate">
                      {source.title}
                    </h4>
                    <p className="text-[11px] text-[#8e8e8e] mt-0.5">
                      {source.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'detail' && (
          <div className="text-[13px] text-[#8e8e8e] text-center py-8">
            Chọn một nguồn trích để xem chi tiết
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="p-3 border-t border-white/5 flex items-center justify-between text-xs text-[#8e8e8e] bg-black">
        <span className="truncate text-[11px]">
          {sources.length}&nbsp;tài liệu liên kết chat
        </span>
      </div>
    </aside>
  )
}
