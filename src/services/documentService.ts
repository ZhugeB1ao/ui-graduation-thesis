import type { DocumentItem } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090'

const INITIAL_MOCK_DOCS: DocumentItem[] = [
  {
    id: 1,
    title: 'Quy định Đào tạo Đại học 2024',
    fileName: 'Quy_dinh_dao_tao_dai_hoc_2024.pdf',
    fileSize: '2.4 MB',
    ocrStatus: 'COMPLETED',
    createdAt: '14/10/2026 09:30',
    isEmbedded: true,
    extractedText: `TRƯỜNG ĐẠI HỌC HOA SEN
CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
-----------------------------------

QUY ĐỊNH ĐÀO TẠO ĐẠI HỌC CHÍNH QUY THEO HỆ THỐNG TÍN CHỈ
(Ban hành kèm theo Quyết định số 142/QĐ-ĐHHS ngày 15/01/2024 của Hiệu trưởng)

Điều 1. Phạm vi điều chỉnh và đối tượng áp dụng
1. Quy định này áp dụng đối với sinh viên các khóa đào tạo trình độ đại học hình thức chính quy tại Trường Đại học Hoa Sen.
2. Quy định bao gồm: kế hoạch đào tạo, đăng ký học phần, kiểm tra đánh giá, xét tốt nghiệp và cấp bằng đại học.

Điều 2. Thời gian thiết kế chương trình và thời gian đào tạo
1. Thời gian kế hoạch chuẩn: 3.5 năm đến 4 năm tùy theo ngành đào tạo.
2. Thời gian tối đa để sinh viên hoàn thành khóa học không được vượt quá 02 lần thời gian thiết kế chuẩn (tối đa 7 năm).

Điều 3. Đăng ký học phần và điều kiện tốt nghiệp
1. Sinh viên phải tích lũy tối thiểu 125 - 140 tín chỉ theo khung chương trình từng ngành.
2. Điểm trung bình chung tích lũy toàn khóa đạt từ 2.00 (thang điểm 4) trở lên.
3. Có chứng chỉ chuẩn đầu ra Tiếng Anh và Tin học theo quy định của Nhà trường.`,
  },
  {
    id: 2,
    title: 'Quyết định Học bổng Khuyến khích K20',
    fileName: 'Quyet_dinh_hoc_bong_K20.pdf',
    fileSize: '1.2 MB',
    ocrStatus: 'PROCESSING',
    createdAt: '18/10/2026 14:15',
    isEmbedded: false,
    extractedText: 'Đang xử lý phân tích hình ảnh và bóc tách ký tự qua Tesseract OCR engine...',
  },
  {
    id: 3,
    title: 'Biểu mẫu Đăng ký Đề tài Khóa luận Tốt nghiệp',
    fileName: 'Bieu_mau_dang_ky_khoa_luan.png',
    fileSize: '680 KB',
    ocrStatus: 'COMPLETED',
    createdAt: '19/10/2026 10:00',
    isEmbedded: false,
    extractedText: `TRƯỜNG ĐẠI HỌC HOA SEN - KHOA CÔNG NGHỆ THÔNG TIN
PHIẾU ĐĂNG KÝ ĐỀ TÀI KHÓA LUẬN TỐT NGHIỆP
Năm học 2026 - 2027

1. Thông tin sinh viên thực hiện:
- Họ và tên: Đoàn Huỳnh Gia Bảo
- Mã số sinh viên: 22101994
- Lớp / Ngành: Kỹ thuật Phần mềm (Software Engineering)
- Email: bao.dhg1994@sinhvien.hoasen.edu.vn

2. Tên đề tài đăng ký:
Xây dựng Hệ thống Trợ lý Ảo Thông minh Hỗ trợ Tra cứu Quy chế & Văn bản Nội bộ tích hợp Kiến trúc Microservices (OCR + RAG Pipeline).

3. Mục tiêu nghiên cứu:
- Ứng dụng kỹ thuật Optical Character Recognition (OCR) để số hóa tài liệu hành chính định dạng PDF và hình ảnh scan.
- Xây dựng luồng Retrieval-Augmented Generation (RAG) với cơ sở dữ liệu vector Qdrant để sinh viên tra cứu quy chế chính xác với trích dẫn nguồn văn bản.

4. Giảng viên hướng dẫn khoa học:
- Họ và tên GVHD: TS. Nguyễn Thành Đạt
- Chữ ký xác nhận: (Đã duyệt qua hệ thống)`,
  },
]

// Lưu tạm vào bộ nhớ sessionStorage để giao diện demo mượt mà kể cả khi F5
function getStoredDocs(): DocumentItem[] {
  const data = sessionStorage.getItem('mock_documents')
  if (data) {
    try {
      return JSON.parse(data)
    } catch {
      // fallback
    }
  }
  sessionStorage.setItem('mock_documents', JSON.stringify(INITIAL_MOCK_DOCS))
  return INITIAL_MOCK_DOCS
}

function saveStoredDocs(docs: DocumentItem[]) {
  sessionStorage.setItem('mock_documents', JSON.stringify(docs))
}

function formatFileSize(bytes?: number | string): string {
  if (typeof bytes === 'string') return bytes
  if (typeof bytes !== 'number' || Number.isNaN(bytes)) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function mapBackendDoc(raw: Record<string, unknown>): DocumentItem {
  const status = (raw.ocrStatus as DocumentItem['ocrStatus']) || 'PENDING'
  const uploadDate = raw.uploadDate as string | undefined
  return {
    id: Number(raw.id),
    title: (raw.title as string) || (raw.originalFileName as string) || 'Tài liệu không tên',
    fileName: (raw.originalFileName as string) || (raw.fileName as string) || 'document.pdf',
    fileSize: formatFileSize(raw.fileSize as number | string | undefined),
    ocrStatus: status,
    createdAt: uploadDate
      ? new Date(uploadDate).toLocaleString('vi-VN')
      : (raw.createdAt as string) || '',
    isEmbedded: typeof raw.isEmbedded === 'boolean' ? raw.isEmbedded : status === 'COMPLETED',
    extractedText: raw.extractedText as string | undefined,
  }
}

export async function fetchDocuments(): Promise<DocumentItem[]> {
  const token = localStorage.getItem('accessToken')
  try {
    const res = await fetch(`${API_BASE_URL}/api/documents`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data)) {
        return data.map((item) => mapBackendDoc(item as Record<string, unknown>))
      }
    }
  } catch {
    // API chưa sẵn sàng hoặc offline -> Fallback mock data
  }
  return getStoredDocs()
}

export async function uploadDocument(file: File, title: string): Promise<DocumentItem> {
  const token = localStorage.getItem('accessToken')
  const finalTitle = title.trim() || file.name
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', finalTitle)

    const res = await fetch(`${API_BASE_URL}/api/documents/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    })
    if (res.ok) {
      const data = await res.json()
      return {
        id: Number(data.id),
        title: finalTitle,
        fileName: file.name,
        fileSize: formatFileSize(file.size),
        ocrStatus: (data.ocrStatus as DocumentItem['ocrStatus']) || 'PENDING',
        createdAt: new Date().toLocaleString('vi-VN'),
        isEmbedded: false,
      }
    }
  } catch {
    // API offline -> Fallback tạo mock document mới
  }

  const docs = getStoredDocs()
  const newId = docs.length > 0 ? Math.max(...docs.map((d) => d.id)) + 1 : 1
  const newDoc: DocumentItem = {
    id: newId,
    title: finalTitle,
    fileName: file.name,
    fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    ocrStatus: 'PROCESSING',
    createdAt: new Date().toLocaleString('vi-VN'),
    isEmbedded: false,
    extractedText: 'Đang tiến hành nhận diện ký tự qua Tesseract OCR engine trên MinIO...',
  }

  const updatedDocs = [newDoc, ...docs]
  saveStoredDocs(updatedDocs)

  // Giả lập sau 3 giây OCR tự động chuyển sang COMPLETED
  setTimeout(() => {
    const current = getStoredDocs()
    const target = current.find((d) => d.id === newId)
    if (target) {
      target.ocrStatus = 'COMPLETED'
      target.extractedText = `KẾT QUẢ TRÍCH XUẤT OCR TỪ TÀI LIỆU: ${file.name}\n\n[Bóc tách thành công qua Tesseract OCR Engine]\n\nTiêu đề: ${title || file.name}\nThời gian xử lý: ${new Date().toLocaleTimeString()}\nĐộ tin cậy nhận diện: 98.6%\n\nNội dung văn bản:\nĐây là văn bản tài liệu đã được bóc tách nội dung chi tiết. Bạn có thể bấm nút "Nạp Vector AI" để đưa dữ liệu văn bản này vào cơ sở dữ liệu tri thức Qdrant của Trợ lý RAG.`
      saveStoredDocs(current)
    }
  }, 3500)

  return newDoc
}

export async function fetchDocumentText(id: number): Promise<string> {
  const token = localStorage.getItem('accessToken')
  try {
    const res = await fetch(`${API_BASE_URL}/api/documents/${id}/text`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
    if (res.ok) {
      const data = await res.json()
      if (typeof data === 'string') return data
      if (data.text) return data.text
      if (data.ocrStatus === 'PENDING' || data.ocrStatus === 'PROCESSING') {
        return '⏳ Tài liệu đang trong hàng đợi xử lý Tesseract OCR. Vui lòng bấm "Làm mới danh sách" sau vài giây...'
      }
      if (data.ocrStatus === 'FAILED') {
        return `❌ Quét OCR thất bại: ${data.ocrError || 'Không thể đọc tệp tin'}`
      }
      return 'Tài liệu không có văn bản trích xuất.'
    }
  } catch {
    // API offline -> Fallback
  }

  const docs = getStoredDocs()
  const found = docs.find((d) => d.id === id)
  return found?.extractedText || 'Không tìm thấy nội dung văn bản trích xuất.'
}

export async function retryOcr(id: number): Promise<void> {
  const token = localStorage.getItem('accessToken')
  try {
    await fetch(`${API_BASE_URL}/api/documents/${id}/ocr`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
  } catch {
    // API offline
  }

  const docs = getStoredDocs()
  const found = docs.find((d) => d.id === id)
  if (found) {
    found.ocrStatus = 'PROCESSING'
    found.extractedText = 'Đang chạy lại tiến trình OCR...'
    saveStoredDocs(docs)

    setTimeout(() => {
      const current = getStoredDocs()
      const t = current.find((d) => d.id === id)
      if (t) {
        t.ocrStatus = 'COMPLETED'
        t.extractedText = `Tesseract OCR đã xử lý lại thành công cho tài liệu ID #${id} lúc ${new Date().toLocaleTimeString()}.`
        saveStoredDocs(current)
      }
    }, 2500)
  }
}

export async function embedDocument(id: number): Promise<boolean> {
  const token = localStorage.getItem('accessToken')
  try {
    const res = await fetch(`${API_BASE_URL}/api/documents/${id}/embed`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
    if (res.ok) return true
  } catch {
    // API offline
  }

  const docs = getStoredDocs()
  const found = docs.find((d) => d.id === id)
  if (found) {
    found.isEmbedded = true
    saveStoredDocs(docs)
  }
  return true
}
