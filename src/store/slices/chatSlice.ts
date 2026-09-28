import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { Message, SourceCitation, Conversation } from '@/domain/types'
import { askQuestion } from '@/services/conversationService'

export interface ChatSliceState {
  chatState: 'idle' | 'active'
  messages: Message[]
  isLoading: boolean
  error: string | null
  currentTitle: string
  sources: SourceCitation[]
}

const initialState: ChatSliceState = {
  chatState: 'idle',
  messages: [],
  isLoading: false,
  error: null,
  currentTitle: '',
  sources: [],
}

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (content: string, { rejectWithValue }) => {
    try {
      const response = await askQuestion(content)
      return response
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi khi gửi tin nhắn'
      return rejectWithValue(msg)
    }
  }
)

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    startNewChat: (state) => {
      state.chatState = 'idle'
      state.messages = []
      state.isLoading = false
      state.error = null
      state.currentTitle = ''
      state.sources = []
    },
    loadConversation: (state, action: PayloadAction<Conversation>) => {
      state.messages = action.payload.messages
      state.currentTitle = action.payload.title
      state.chatState = action.payload.messages.length > 0 ? 'active' : 'idle'
      state.isLoading = false
      state.error = null
    },
    addUserMessage: (state, action: PayloadAction<string>) => {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: action.payload,
      }
      state.messages.push(userMsg)
      state.chatState = 'active'
      if (!state.currentTitle) {
        state.currentTitle = action.payload.slice(0, 30)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        state.isLoading = true
        state.error = null
        // Đưa tin nhắn của user vào danh sách ngay khi bắt đầu gửi
        const userContent = action.meta.arg
        state.messages.push({
          id: `user-${Date.now()}`,
          role: 'user',
          content: userContent,
        })
        state.chatState = 'active'
        if (!state.currentTitle) {
          state.currentTitle = userContent.slice(0, 30)
        }
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false
        // Đưa tin nhắn của Assistant vào danh sách
        state.messages.push({
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: action.payload.answer,
        })
        // Cập nhật danh sách tài liệu tham chiếu (sources)
        state.sources = action.payload.sources
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as string) || 'Có lỗi xảy ra'
        state.messages.push({
          id: `assistant-err-${Date.now()}`,
          role: 'assistant',
          content: `Xin lỗi, đã xảy ra lỗi trong quá trình xử lý: ${state.error}`,
        })
      })
  },
})

export const { startNewChat, loadConversation, addUserMessage } = chatSlice.actions
export default chatSlice.reducer
