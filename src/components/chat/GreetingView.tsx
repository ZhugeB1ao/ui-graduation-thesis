import { ChatInput } from './ChatInput'

interface GreetingViewProps {
  onSend: (message: string) => void
}

export function GreetingView({ onSend }: GreetingViewProps) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-16">
      <div className="w-full max-w-[760px] flex flex-col items-center">
        <h1 className="text-white text-[28px] font-medium tracking-tight mb-8">
          Hôm nay bạn muốn làm gì?
        </h1>
        <ChatInput onSend={onSend} position="center" />
      </div>
    </main>
  )
}
