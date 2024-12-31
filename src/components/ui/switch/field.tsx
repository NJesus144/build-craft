import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { Controller, useFormContext } from 'react-hook-form'

interface SwitchFieldProps {
  name: string
  className?: string
}

export const SwitchField = ({
  name,
  className,
  ...props
}: SwitchFieldProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Switch {...props} checked={field.value} onChange={field.onChange} className={cn(className)}/>
      )}
    />
  )
}
