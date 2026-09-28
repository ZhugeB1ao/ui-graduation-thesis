import type { Message } from '@/domain/types'
import { MessageActions } from './MessageActions'

interface AssistantMessageProps {
  message: Message
}

export function AssistantMessage({ message }: AssistantMessageProps) {
  return (
    <article aria-label="Phản hồi của ChatGPT" className="flex flex-col items-start w-full space-y-2 select-text">
      <div className="text-[#e2e2e2] text-[15px] leading-relaxed">
        {message.content}
      </div>
      <MessageActions />
    </article>
  )
}
