import { Editor } from '@/components/ui/editor'
import { FieldWrapper } from '@/components/ui/field-wrapper'
import { Controller, useFormContext } from 'react-hook-form'

interface EditorFieldProps {
  label: string
  name: string
  className?: string
  required?: boolean
}

export const EditorField = ({
  label,
  name,
  required,
  className,
  ...props
}: EditorFieldProps) => {
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
          <Editor {...props} {...field} />
        </FieldWrapper>
      )}
    />
  )
}
