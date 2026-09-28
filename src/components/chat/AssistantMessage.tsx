import type { Message } from '@/domain/types'
import { MessageActions } from './MessageActions'

interface AssistantMessageProps {
  message: Message
}

export function AssistantMessage({ message }: AssistantMessageProps) {
  // Lấy tài liệu có score cao nhất từ sources
  const topSource =
    message.sources && message.sources.length > 0
      ? [...message.sources].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0]
      : null

  const extraCount =
    message.sources && message.sources.length > 1
      ? message.sources.length - 1
      : 0

  // Xử lý hoàn toàn tại Frontend: Thay vì dùng dấu *, chuyển đổi thành xuống dòng
  const formattedContent = message.content
    ? message.content
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/(?:^|\r\n|\r|\n|\s)\*+\s*/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
    : ''

  return (
    <article aria-label="Phản hồi của ChatGPT" className="flex flex-col items-start w-full space-y-2 select-text">
      <div className="text-[#e2e2e2] text-[15px] leading-relaxed whitespace-pre-wrap">
        <span>{formattedContent}</span>
        {topSource && (
          <span
            className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-[#2a2a2a] hover:bg-[#333333] border border-white/10 text-xs text-[#e2e2e2] align-middle select-none transition-colors cursor-default"
            title={`Nguồn: ${topSource.title}${topSource.score ? ` (Độ khớp: ${(topSource.score * 100).toFixed(0)}%)` : ''}`}
          >
            <span className="font-normal truncate max-w-[160px]">{topSource.title}</span>
            {extraCount > 0 && (
              <span className="text-[10.5px] text-[#8e8e8e] font-mono font-medium">+{extraCount}</span>
            )}
          </span>
        )}
      </div>
      <MessageActions />
    </article>
  )
}
