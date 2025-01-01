import { FieldWrapper } from '@/components/ui/field-wrapper'
import { Input } from '@/components/ui/input'
import { ComponentProps } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface InputFieldProps extends ComponentProps<typeof Input> {
  label: string
  name: string
  className?: string
  extraContent?: (value: string) => React.ReactNode
}

export const InputField = ({
  label,
  name,
  required,
  className,
  extraContent,
  ...props
}: InputFieldProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required && 'Campo obrigatório',
      }}
      render={({ field, fieldState }) => (
        <FieldWrapper
          label={label}
          className={className}
          error={fieldState?.error}
        >
          <Input {...props} {...field} />
          {extraContent && extraContent(field.value)}
        </FieldWrapper>
      )}
    />
  )
}
