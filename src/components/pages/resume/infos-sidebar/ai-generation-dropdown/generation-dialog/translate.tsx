import { languagesOptions } from '@/components/pages/resume/structure-sidebar/sections/language'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ApiService } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'sonner'
import { mergician } from 'mergician'

interface FormData {
  language: ResumeLanguages
}

interface GenerateTranslationProps {
  onClose: () => void
}

export const GenerateTranslation = ({ onClose }: GenerateTranslationProps) => {
  const { control, formState, handleSubmit } = useForm<FormData>()
  const { getValues, setValue } = useFormContext<ResumeData>()

  const { mutateAsync: handleGenerate } = useMutation({
    mutationFn: ApiService.translate,
  })

  const onSubmit = async (formData: FormData) => {
    const content = getValues('content')
    const selectedLanguage = languagesOptions.find(
      (item) => item.value === formData.language,
    )
    const data = await handleGenerate({
      content,
      language: selectedLanguage?.label!,
    })

    const generation = JSON.parse(data.data)
    const mergedContent = mergician(content, generation) as ResumeContentData

    setValue('content', mergedContent)
    setValue('structure.language', formData.language)
    toast.success('Conteúdo gerado com sucesso!')

    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p>
        Esta funcionalidade traduz o conteúdo para a linguagem selecionada
        abaixo.
      </p>
      <p>Isso pode levar alguns segundos, aguarde o resultado.</p>
      <Controller
        control={control}
        name="language"
        rules={{ required: 'Selecione um idioma' }}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-ffull">
              <SelectValue placeholder="Selecionar linguagem" />
            </SelectTrigger>
            <SelectContent>
              {languagesOptions.map((language) => (
                <SelectItem key={language.value} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      <Button
        className="w-max ml-auto"
        type="submit"
        disabled={formState.isSubmitting}
      >
        Gerar conteúdo
      </Button>
    </form>
  )
}
