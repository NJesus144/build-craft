import { FieldWrapper } from '@/components/ui/field-wrapper'
import { Input } from '@/components/ui/input'
import { ComponentProps } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface InputFieldProps extends ComponentProps<typeof Input> {
  label: string
  name: string
}

export const InputField = ({
  label,
  name,
  required,
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
        <FieldWrapper label={label}>
          <Input {...props} {...field} />
          {fieldState.error && (
            <p className="text-sm text-red-500 mt-2">
              {fieldState.error.message}
            </p>
          )}
        </FieldWrapper>
      )}
    />
  )
}
