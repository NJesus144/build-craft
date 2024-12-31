import { Label } from '@/components/ui/label'
import { ReactNode } from 'react'

interface FieldWrapperProps {
  label: string
  children: ReactNode
}

export const FieldWrapper = ({ label, children }: FieldWrapperProps) => {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  )
}
