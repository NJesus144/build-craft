import { GenerateToFixContent } from '@/components/pages/resume/infos-sidebar/ai-generation-dropdown/generation-dialog/fix-content'
import { GenerateFromJobTitle } from '@/components/pages/resume/infos-sidebar/ai-generation-dropdown/generation-dialog/job-title'
import { GenerateTranslation } from '@/components/pages/resume/infos-sidebar/ai-generation-dropdown/generation-dialog/translate'
import { BaseDialogProps, Dialog } from '@/components/ui/dialog'

interface GenerationDialogProps extends BaseDialogProps {
  mode: AIGenerationMode
  setOpen: (open: boolean) => void
}

export const GenerationDialog = ({ mode, ...props }: GenerationDialogProps) => {
  const onClose = () => {
    props.setOpen(false)
  }

  const configPerMode: Record<AIGenerationMode, JSX.Element> = {
    JOB_TITLE: <GenerateFromJobTitle onClose={onClose} />,
    FIX_CONTENT: <GenerateToFixContent onClose={onClose} />,
    TRANSLATE_CONTENT: <GenerateTranslation onClose={onClose}/>,
  }

  const content = configPerMode[mode]

  return (
    <Dialog
      {...props}
      title="Inteligência Artificial"
      description="O conteúdo gerado sobrescreverá o conteúdo atual. Cada geração custa 1 crédito."
      content={content}
    />
  )
}
