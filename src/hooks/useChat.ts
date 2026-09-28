import { useState, useCallback } from 'react'
import type { Message, Conversation } from '@/domain/types'

export type ChatState = 'idle' | 'active'

export function useChat(initialConversation?: Conversation) {
  const [chatState, setChatState] = useState<ChatState>(
    initialConversation?.messages.length ? 'active' : 'idle'
  )
  const [messages, setMessages] = useState<Message[]>(
    initialConversation?.messages ?? []
  )
  const [currentTitle, setCurrentTitle] = useState(
    initialConversation?.title ?? ''
  )

  const sendMessage = useCallback((content: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    }
    setMessages(prev => [...prev, userMsg])
    setChatState('active')
    if (!currentTitle) {
      setCurrentTitle(content.slice(0, 30))
    }

    // Simulate assistant response
    setTimeout(() => {
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Đây là phản hồi mẫu cho: "${content}"`,
      }
      setMessages(prev => [...prev, assistantMsg])
    }, 800)
  }, [currentTitle])

  const startNewChat = useCallback(() => {
    setMessages([])
    setChatState('idle')
    setCurrentTitle('')
  }, [])

  const loadConversation = useCallback((conversation: Conversation) => {
    setMessages(conversation.messages)
    setCurrentTitle(conversation.title)
    setChatState(conversation.messages.length ? 'active' : 'idle')
  }, [])

  return {
    chatState,
    messages,
    currentTitle,
    sendMessage,
    startNewChat,
    loadConversation,
  }
}
