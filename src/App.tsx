import { Provider } from 'react-redux'
import { store } from '@/store'
import { ChatPage } from '@/pages/ChatPage'

export default function App() {
  return (
    <Provider store={store}>
      <ChatPage />
    </Provider>
  )
}
