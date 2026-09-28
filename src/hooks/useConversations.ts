import { useState } from 'react'
import type { Conversation } from '@/domain/types'
import { getConversations } from '@/services/conversationService'

export function useConversations() {
  const [conversations] = useState<Conversation[]>(getConversations)
  const [activeId, setActiveId] = useState<string | null>('1')

  return {
    conversations,
    activeId,
    setActiveId,
  }
}
