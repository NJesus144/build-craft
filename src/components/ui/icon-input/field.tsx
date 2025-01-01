import { FieldWrapper } from '@/components/ui/field-wrapper'
import { IconInput } from '@/components/ui/icon-input'
import { Controller, useFormContext } from 'react-hook-form'

interface IconFieldProps {
  label: string
  name: string
  className?: string
  required?: boolean
}

export const IconField = ({
  label,
  name,
  required,
  className,
  ...props
}: IconFieldProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required && 'Campo obrigatório',
      }}
      render={({ field, fieldState }) => (
        <FieldWrapper label={label} className={className} error={fieldState?.error}>
          <IconInput {...props} {...field} />
        </FieldWrapper>
      )}
    />
  )
}
