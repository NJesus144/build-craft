import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { FieldError } from 'react-hook-form'

interface FieldWrapperProps {
  label: string
  children: ReactNode
  className?: string
  error?: FieldError
}

export const FieldWrapper = ({
  label,
  children,
  className,
  error,
}: FieldWrapperProps) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-red-500 mt-2">{error.message}</p>}
    </div>
  )
}
