import { SectionTitle } from '@/components/pages/resume/infos-sidebar/section-title'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Languages } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

interface LanguageOption {
  label: string
  value: ResumeLanguages
}

export const languagesOptions: LanguageOption[] = [
  {
    label: 'Inglês',
    value: 'english',
  },
  {
    label: 'Espanhol',
    value: 'spanish',
  },
  {
    label: 'Francês',
    value: 'french',
  },
  {
    label: 'Alemão',
    value: 'german',
  },
  {
    label: 'Italiano',
    value: 'italian',
  },
  {
    label: 'Português',
    value: 'portuguese',
  },
]

export const LanguageSection = () => {
  const { control } = useFormContext<ResumeData>()

  return (
    <div>
      <SectionTitle title="Linguagem" icon={Languages} />
      <Controller
        control={control}
        name="structure.language"
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="mt-4">
              <SelectValue placeholder="Selecione uma linguagem" />
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
    </div>
  )
}
