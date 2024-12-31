import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface FieldWrapperProps {
  label: string
  children: ReactNode
  className?: string
}

export const FieldWrapper = ({
  label,
  children,
  className,
}: FieldWrapperProps) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label>{label}</Label>
      {children}
    </div>
  )
}
