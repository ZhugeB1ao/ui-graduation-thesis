import { useState } from 'react'
import { SidebarRightIcon, BookIcon, EyeIcon, DocumentIcon, ExternalLinkIcon } from '@/components/icons'
import { useAppDispatch, useAppSelector } from '@/store'
import { toggleRightSidebar, setRightSidebar, type RightSidebarState } from '@/store/slices/sidebarSlice'
import { getSources } from '@/services/conversationService'

export function RightSidebar() {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector((state) => state.sidebar.rightSidebar)
  const chatSources = useAppSelector((state) => state.chat.sources)
  const [selectedSourceIndex, setSelectedSourceIndex] = useState<number>(0)

  // Nếu trong chat có sources thật từ API thì dùng, không thì dùng sources mock mặc định
  const sources = chatSources.length > 0 ? chatSources : getSources()
  const selectedSource = sources[selectedSourceIndex] || sources[0]

  const handleClose = () => {
    dispatch(toggleRightSidebar())
  }

  const handleTabChange = (tab: RightSidebarState) => {
    dispatch(setRightSidebar(tab))
  }

  const handleSelectSource = (index: number) => {
    setSelectedSourceIndex(index)
    dispatch(setRightSidebar('detail'))
  }

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
              onClick={handleClose}
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
            onClick={() => handleTabChange('sources')}
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
            onClick={() => handleTabChange('detail')}
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
            {sources.map((source, idx) => (
              <div
                key={source.id}
                className="p-2.5 rounded-xl bg-[#212121]/60 hover:bg-[#212121] border border-white/5 hover:border-white/15 transition-all cursor-pointer group"
                onClick={() => handleSelectSource(idx)}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[#55b9ff] bg-[#1e3c66]/40 border border-[#55b9ff]/20">
                    <DocumentIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-[13px] font-medium text-white truncate group-hover:text-[#55b9ff] transition-colors">
                        {source.title}
                      </h4>
                      {source.score !== undefined && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-[#55b9ff] font-mono flex-shrink-0">
                          {(source.score * 100).toFixed(0)}%
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#8e8e8e] mt-0.5 line-clamp-2">
                      {source.text || source.description || 'Xem nội dung đối chiếu'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'detail' && selectedSource && (
          <div className="space-y-4 text-left select-text">
            <div className="rounded-xl bg-[#212121]/70 border border-white/10 overflow-hidden shadow-sm flex flex-col">
              <div className="p-3 bg-[#1e232d]/80 border-b border-white/5 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[#55b9ff] bg-[#1e3c66]/50 border border-[#55b9ff]/20">
                    <DocumentIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-[13px] font-semibold text-white truncate">
                        {selectedSource.title}
                      </h4>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#1e3c66] text-[#55b9ff] font-semibold flex-shrink-0">
                        {selectedSource.fileType || 'PDF'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8e8e8e] truncate">
                      {selectedSource.description || 'Tài liệu trường Đại học Hoa Sen'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Excerpt Body */}
              <div className="p-3.5 bg-black/50 space-y-3 font-sans text-xs leading-relaxed text-[#b4b4b4]">
                <div className="border-b border-white/5 pb-2">
                  <h5 className="text-[12px] font-semibold text-[#55b9ff] tracking-tight">
                    Đoạn văn bản trích dẫn đối chiếu
                  </h5>
                </div>
                <p className="text-[#e2e2e2] bg-white/5 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                  {selectedSource.text || selectedSource.previewText || 'Không có nội dung xem trước.'}
                </p>
              </div>

              {/* Footer */}
              <div className="p-2.5 bg-[#171717] border-t border-white/5 flex items-center justify-between text-[11px] text-[#8e8e8e]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10A37F]" />
                  Đã xác thực bởi HSU RAG
                </span>
                <button
                  type="button"
                  className="text-[#55b9ff] hover:underline flex items-center gap-1 font-medium"
                  onClick={() => handleTabChange('sources')}
                >
                  <span>Xem nguồn khác</span>
                  <ExternalLinkIcon className="w-3 h-3" />
                </button>
              </div>
            </div>
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
