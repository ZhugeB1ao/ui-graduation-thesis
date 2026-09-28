import { AppLayout } from '@/components/layout/AppLayout'
import { GreetingView } from '@/components/chat/GreetingView'
import { ChatArea } from '@/components/chat/ChatArea'
import { ChatInput } from '@/components/chat/ChatInput'
import { useAppDispatch, useAppSelector } from '@/store'
import { sendMessage } from '@/store/slices/chatSlice'

export function ChatPage() {
  const dispatch = useAppDispatch()
  const { chatState, messages, isLoading } = useAppSelector((state) => state.chat)

  const handleSend = (text: string) => {
    dispatch(sendMessage(text))
  }

  return (
    <AppLayout>
      {chatState === 'idle' ? (
        <GreetingView onSend={handleSend} disabled={isLoading} />
      ) : (
        <>
          <ChatArea messages={messages} isLoading={isLoading} />
          <footer className="w-full pb-3 pt-1 px-4 flex flex-col items-center flex-shrink-0">
            <ChatInput onSend={handleSend} position="bottom" disabled={isLoading} />
          </footer>
        </>
      )}
    </AppLayout>
  )
}
