import type { SourceCitation } from '@/types'
import rawData from '@/data/conversations.json'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

interface RawApiSource {
  source: string
  text: string
  score: number
}

export interface StreamCallbacks {
  onSources?: (sources: SourceCitation[], inScope: boolean) => void
  onDelta?: (text: string) => void
}

export async function askQuestionStream(
  question: string,
  callbacks: StreamCallbacks,
  top_k?: number
): Promise<void> {
  const { onSources, onDelta } = callbacks
  try {
    const token = localStorage.getItem('accessToken')
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
    const endpoint = API_BASE_URL.includes('9090')
      ? `${API_BASE_URL}/api/ai/ask/stream`
      : `${API_BASE_URL}/ask/stream`

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ question, ...(top_k !== undefined ? { top_k } : {}) }),
    })
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData.detail || `Lỗi máy chủ (${res.status})`)
    }
    if (!res.body) {
      throw new Error('Trình duyệt không hỗ trợ ReadableStream.')
    }
    const reader = res.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let buffer = ''
    while (true) {
      const { done, value } = await reader.read()

      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        const trimmedLine = line.trim()

        if (trimmedLine.startsWith('data: ')) {
          const raw = trimmedLine.slice(6).trim()

          if (raw === '[DONE]') return
          try {
            const payload = JSON.parse(raw)

            if (payload.event === 'sources' && onSources) {
              const mappedSources: SourceCitation[] = (payload.sources || []).map(
                (s: RawApiSource, index: number) => ({
                  id: `src-${Date.now()}-${index}`,
                  type: 'document',
                  title: s.source,
                  description: `Độ tương đồng: ${(s.score * 100).toFixed(1)}%`,
                  text: s.text,
                  score: s.score,
                  fileType: s.source.split('.').pop()?.toUpperCase() || 'DOC',
                })
              )
              onSources(mappedSources, payload.in_scope ?? true)
            } else if (payload.event === 'delta' && onDelta) {
              onDelta(payload.text)
            }
          } catch (e) {
            console.warn('[SSE] Lỗi parse JSON:', raw, e)
          }
        }
      }
    }
  } catch (err: unknown) {
    console.warn(`[ChatHSU SSE] Không thể kết nối tới ${API_BASE_URL}/ask/stream:`, err)
    // Fallback mô phỏng nếu chưa bật FastAPI Backend
    if (onSources) {
      onSources(rawData.sources as SourceCitation[], true)
    }
    if (onDelta) {
      const mockText = `Mình đã nhận được câu hỏi: "${question}".\n\n(Lưu ý: Chưa thể kết nối tới FastAPI Backend tại ${API_BASE_URL}. Hãy chạy lệnh: \`uvicorn api:app --reload --port 8000\` để nhận câu trả lời dạng SSE stream từ mô hình RAG).`
      onDelta(mockText)
    }
  }
}

// export interface AskApiResponse {
//   answer: string
//   sources: SourceCitation[]
// }

// interface RawAskResponse {
//   answer: string
//   sources: Array<{ source: string; text: string; score: number }>
// }

// export async function askQuestion(question: string, top_k?: number): Promise<AskApiResponse> {
//   try {
//     const res = await fetch(`${API_BASE_URL}/ask`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ question, ...(top_k !== undefined ? { top_k } : {}) }),
//     })
//
//     if (!res.ok) throw new Error(`Lỗi máy chủ (${res.status})`)
//
//     const json: RawAskResponse = await res.json()
//
//     return {
//       answer: json.answer,
//       sources: (json.sources || []).map((s, index) => ({
//         id: `src-${Date.now()}-${index}`,
//         type: 'document',
//         title: s.source,
//         description: `Độ tương đồng: ${(s.score * 100).toFixed(1)}%`,
//         text: s.text,
//         score: s.score,
//         fileType: s.source.split('.').pop()?.toUpperCase() || 'DOC',
//       })),
//     }
//   } catch (err: unknown) {
//     console.warn(`[ChatHSU] Fallback mô phỏng (${API_BASE_URL}):`, err)
//     return {
//       answer: `Mình đã nhận được câu hỏi: "${question}".\n\n(Lưu ý: Chưa thể kết nối tới FastAPI Backend tại ${API_BASE_URL}. Hãy chạy: \`uvicorn api:app --reload --port 8000\` để nhận phản hồi từ mô hình RAG).`,
//       sources: rawData.sources as SourceCitation[],
//     }
//   }
// }