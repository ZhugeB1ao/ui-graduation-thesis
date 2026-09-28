import { useEffect, useRef } from 'react'
import type { Message } from '@/domain/types'
import { UserMessage } from './UserMessage'
import { AssistantMessage } from './AssistantMessage'

interface ChatAreaProps {
  messages: Message[]
}

export function ChatArea({ messages }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar px-4 sm:px-6">
      <div className="max-w-[760px] mx-auto w-full pt-3 pb-8 flex flex-col space-y-6">
        {messages.map(msg =>
          msg.role === 'user'
            ? <UserMessage key={msg.id} message={msg} />
            : <AssistantMessage key={msg.id} message={msg} />
        )}
      </div>
    </div>
  )
}
