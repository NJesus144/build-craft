import { GenerationDialog } from '@/components/pages/resume/infos-sidebar/ai-generation-dropdown/generation-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  BadgeCent,
  Bot,
  BriefcaseBusiness,
  CirclePercent,
  Languages,
  PencilLine,
} from 'lucide-react'
import { useState } from 'react'

export const AIGenerationDropdown = () => {
  const [generationMode, setGenerationMode] = useState<AIGenerationMode | null>(
    null,
  )
  const actions = [
    {
      label: 'Comprar créditos',
      icon: CirclePercent,
      onClick: () => console.log('Comprar créditos'),
    },
    {
      label: 'Gerar conteúdo para vaga de emprego',
      icon: BriefcaseBusiness,
      onClick: () => setGenerationMode('JOB_TITLE'),
    },
    {
      label: 'Melhorar e corrigir o conteúdo existente',
      icon: PencilLine,
      onClick: () => setGenerationMode('FIX_CONTENT'),
    },
    {
      label: 'Traduzir conteúdo existene',
      icon: Languages,
      onClick: () => setGenerationMode('TRANSLATE_CONTENT'),
    },
  ]

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gap-2 text-xs px-2.5 py-1 h-9">
            <Bot size={20} />
            Inteligência Artificial
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10} className="start">
          <DropdownMenuLabel className="text-muted-foreground text-xs flex items-center gap-1">
            Você possui
            <strong className="text-foreground inline-flex gap-0.5 items-center">
              <BadgeCent size={14} />
              20 créditos
            </strong>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {actions.map((action) => (
            <DropdownMenuItem
              key={action.label}
              className="gap-2"
              onClick={action.onClick}
            >
              <action.icon size={20} className="text-muted-foreground" />
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {!!generationMode && (
        <GenerationDialog
          mode={generationMode}
          open={!!generationMode}
          setOpen={(value) => {
            if (!value) setGenerationMode(null)
          }}
        />
      )}
    </>
  )
}
