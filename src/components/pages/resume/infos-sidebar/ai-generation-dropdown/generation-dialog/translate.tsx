import { languagesOptions } from '@/components/pages/resume/structure-sidebar/sections/language'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { queryKeys } from '@/constants/query-keys'
import { ApiService } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mergician } from 'mergician'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

interface FormData {
  language: ResumeLanguages
}

interface GenerateTranslationProps {
  onClose: () => void
}

export const GenerateTranslation = ({ onClose }: GenerateTranslationProps) => {
  const { control, handleSubmit, getValues: getFormValue } = useForm<FormData>()
  const { getValues, setValue } = useFormContext<ResumeData>()
  const queryClient = useQueryClient()

  const { mutate: handleGenerate, isPending } = useMutation({
    mutationFn: ApiService.translate,
    onSuccess: (data) => {
      const content = getValues('content')

      const generation = JSON.parse(data.data)
      const mergedContent = mergician(content, generation) as ResumeContentData
      const language = getFormValue('language')

      setValue('content', mergedContent)
      setValue('structure.language', language)
      toast.success('Conteúdo gerado com sucesso!')

      queryClient.invalidateQueries({ queryKey: queryKeys.credits })

      onClose()
    },
  })

  const onSubmit = async (formData: FormData) => {
    const content = getValues('content')
    const selectedLanguage = languagesOptions.find(
      (item) => item.value === formData.language,
    )

    handleGenerate({
      content,
      language: selectedLanguage?.label!,
    })
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

      <Button className="w-max ml-auto" type="submit" disabled={isPending}>
        Gerar conteúdo
      </Button>
    </form>
  )
}
