import type { Conversation, User, SourceCitation } from '@/domain/types'
import rawData from '@/data/conversations.json'

interface ConversationData {
  user: User
  conversations: Conversation[]
  sources: SourceCitation[]
}

const data = rawData as ConversationData
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export function getUser(): User {
  return data.user
}

export function getConversations(): Conversation[] {
  return data.conversations
}

export function getConversationById(id: string): Conversation | undefined {
  return data.conversations.find(c => c.id === id)
}

export function getSources(): SourceCitation[] {
  return data.sources
}

export interface AskApiResponse {
  answer: string
  sources: SourceCitation[]
}

interface RawApiSource {
  source: string
  text: string
  score: number
}

interface RawAskResponse {
  answer: string
  sources: RawApiSource[]
}

export async function askQuestion(question: string, top_k: number = 3): Promise<AskApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, top_k }),
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      const errorMsg = errorData.detail || `Lỗi máy chủ (${res.status})`
      throw new Error(errorMsg)
    }

    const json: RawAskResponse = await res.json()

    const mappedSources: SourceCitation[] = (json.sources || []).map((s, index) => ({
      id: `src-${Date.now()}-${index}`,
      type: 'document',
      title: s.source,
      description: `Độ tương đồng: ${(s.score * 100).toFixed(1)}%`,
      text: s.text,
      score: s.score,
      fileType: s.source.split('.').pop()?.toUpperCase() || 'DOC',
    }))

    return {
      answer: json.answer,
      sources: mappedSources,
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Lỗi không xác định'
    console.warn(`[ChatHSU API] Không thể gọi API thật tại ${API_BASE_URL}/ask:`, message)

    // Nếu backend chưa bật hoặc lỗi kết nối, fallback phản hồi mô phỏng để giao diện luôn hoạt động mượt mà
    return {
      answer: `Mình đã nhận được câu hỏi: "${question}".\n\n(Lưu ý: Chưa thể kết nối tới FastAPI Backend tại ${API_BASE_URL}. Vui lòng chạy lệnh: \`uvicorn api:app --reload --port 8000\` để nhận câu trả lời thật từ mô hình RAG).`,
      sources: data.sources,
    }
  }
}
