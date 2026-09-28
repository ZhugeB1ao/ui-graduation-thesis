import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  children: ReactNode
}

export function IconButton({ label, children, className = '', ...props }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className={`hover:text-white transition-colors ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}
