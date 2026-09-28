import { AppLayout } from '@/components/layout/AppLayout'
import { GreetingView } from '@/components/chat/GreetingView'
import { ChatArea } from '@/components/chat/ChatArea'
import { ChatInput } from '@/components/chat/ChatInput'
import { useSidebar } from '@/hooks/useSidebar'
import { useChat } from '@/hooks/useChat'
import { useConversations } from '@/hooks/useConversations'
import { getUser, getSources, getConversationById } from '@/services/conversationService'

export function ChatPage() {
  const user = getUser()
  const sources = getSources()
  const { conversations, activeId, setActiveId } = useConversations()
  const { leftSidebar, rightSidebar, toggleLeft, toggleRight, setRightTab } = useSidebar()
  const { chatState, messages, sendMessage, startNewChat, loadConversation } = useChat()

  const handleSelectConversation = (id: string) => {
    setActiveId(id)
    const conv = getConversationById(id)
    if (conv) {
      loadConversation(conv)
    }
  }

  const handleNewChat = () => {
    setActiveId(null)
    startNewChat()
  }

  return (
    <AppLayout
      leftSidebar={leftSidebar}
      rightSidebar={rightSidebar}
      user={user}
      conversations={conversations}
      activeConversationId={activeId}
      sources={sources}
      onToggleLeft={toggleLeft}
      onToggleRight={toggleRight}
      onSetRightTab={setRightTab}
      onSelectConversation={handleSelectConversation}
      onNewChat={handleNewChat}
    >
      {chatState === 'idle' ? (
        <GreetingView onSend={sendMessage} />
      ) : (
        <>
          <ChatArea messages={messages} />
          <footer className="w-full pb-3 pt-1 px-4 flex flex-col items-center flex-shrink-0">
            <ChatInput onSend={sendMessage} position="bottom" />
          </footer>
        </>
      )}
    </AppLayout>
  )
}
