import type { ReactNode } from 'react'

export type TextOwnProps = {
  children: ReactNode
  variant: 'heading1' | 'heading2' | 'heading3' | 'body1' | 'body2'
}

export type TextProps = TextOwnProps

export function Text({ children, variant, ...restProps }: TextOwnProps) {
  return <span {...restProps}>{children}</span>
}
