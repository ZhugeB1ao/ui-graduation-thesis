interface IconProps { className?: string }
export function SidebarRightIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  )
}
