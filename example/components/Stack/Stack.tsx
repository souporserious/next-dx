import type { ReactNode, RefAttributes } from 'react'

export type StackOwnProps = {
  children: ReactNode
  direction: 'column' | 'row'
  gap: string
}

export type StackProps = StackOwnProps &
  RefAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>

export function Stack({ direction, gap, children, ...restProps }: StackProps) {
  return (
    <div
      style={{ display: 'flex', flexDirection: direction, gap }}
      {...restProps}
    >
      {children}
    </div>
  )
}
