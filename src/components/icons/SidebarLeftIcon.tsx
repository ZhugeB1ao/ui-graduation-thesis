interface IconProps { className?: string }
export function SidebarLeftIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect width="18" height="18" x="3" y="3" rx="3" />
      <line x1="9" x2="9" y1="3" y2="21" />
    </svg>
  )
}
