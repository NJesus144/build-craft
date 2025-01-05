import { GenerateFromJobTitle } from '@/components/pages/resume/infos-sidebar/ai-generation-dropdown/generation-dialog/job-title'
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
    FIX_CONTENT: <div>Melhorar e corrigir o conteúdo existente</div>,
    TRANSLATE_CONTENT: <div>Traduzir conteúdo existente</div>,
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
