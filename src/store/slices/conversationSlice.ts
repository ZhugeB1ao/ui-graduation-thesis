import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Conversation, User } from '@/domain/types'
import { getConversations, getUser } from '@/services/conversationService'

export interface ConversationSliceState {
  conversations: Conversation[]
  activeId: string | null
  user: User
}

const initialState: ConversationSliceState = {
  conversations: getConversations(),
  activeId: '1',
  user: getUser(),
}

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setActiveId: (state, action: PayloadAction<string | null>) => {
      state.activeId = action.payload
    },
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.unshift(action.payload)
      state.activeId = action.payload.id
    },
  },
})

export const { setActiveId, addConversation } = conversationSlice.actions
export default conversationSlice.reducer
