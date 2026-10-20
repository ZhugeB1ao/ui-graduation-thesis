const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090'

export interface LoginResponse {
  accessToken: string
  refreshToken?: string
  username: string
}

export async function loginApi(username: string, password: string): Promise<LoginResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (res.ok) {
      const data = await res.json()
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken)
      }
      return {
        accessToken: data.accessToken || data.token,
        refreshToken: data.refreshToken,
        username: data.username || username,
      }
    }
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || err.detail || `Đăng nhập không thành công (${res.status})`)
  } catch (err: unknown) {
    // Nếu backend chưa chạy (Network error hoặc fetch failed) -> Fallback chế độ Demo
    if (err instanceof TypeError && err.message.includes('fetch')) {
      return {
        accessToken: `demo-jwt-token-${Date.now()}`,
        username,
      }
    }
    throw err
  }
}

export async function registerApi(
  username: string,
  email: string,
  password: string,
  departmentId = 1,
  role = 'EMPLOYEE'
): Promise<LoginResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, departmentId, role }),
    })
    if (res.ok) {
      const data = await res.json()
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken)
      }
      return {
        accessToken: data.accessToken || data.token,
        refreshToken: data.refreshToken,
        username: data.username || username,
      }
    }
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || err.detail || `Đăng ký không thành công (${res.status})`)
  } catch (err: unknown) {
    if (err instanceof TypeError && err.message.includes('fetch')) {
      return {
        accessToken: `demo-jwt-token-${Date.now()}`,
        username,
      }
    }
    throw err
  }
}
