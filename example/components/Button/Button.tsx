import type { ReactNode, RefAttributes } from 'react'

export type ButtonOwnProps = {
  children: ReactNode
  variant: 'link' | 'contained' | 'ghost'
}

export type ButtonProps = ButtonOwnProps &
  RefAttributes<HTMLButtonElement> &
  React.HTMLAttributes<HTMLButtonElement>

export function Button({ children, variant, ...restProps }: ButtonProps) {
  return <button {...restProps}>{children}</button>
}
