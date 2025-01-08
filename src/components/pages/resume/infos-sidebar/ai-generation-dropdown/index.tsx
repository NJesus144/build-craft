import { GenerationDialog } from '@/components/pages/resume/infos-sidebar/ai-generation-dropdown/generation-dialog'
import { BuyCreditsDialog } from '@/components/pages/resume/infos-sidebar/ai-generation-dropdown/buy-credits-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { queryKeys } from '@/constants/query-keys'
import { ApiService } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import {
  BadgeCent,
  Bot,
  BriefcaseBusiness,
  CirclePercent,
  Languages,
  PencilLine,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const AIGenerationDropdown = () => {
  const [showCreditsDialog, setShowCreditsDialog] = useState(false)
  const [generationMode, setGenerationMode] = useState<AIGenerationMode | null>(
    null,
  )

  const onAction = (mode: AIGenerationMode) => {
    if(!credits) {
      toast.error('Você não possui créditos suficientes para realizar essa ação.', {
        action: {
          label: "Comprar créditos",
          onClick: () => setShowCreditsDialog(true),
        }
      })
      return
    }

    setGenerationMode(mode)
  }

  const actions = [
    {
      label: 'Comprar créditos',
      icon: CirclePercent,
      onClick: () => setShowCreditsDialog(true),
    },
    {
      label: 'Gerar conteúdo para vaga de emprego',
      icon: BriefcaseBusiness,
      onClick: () => onAction('JOB_TITLE'),
    },
    {
      label: 'Melhorar e corrigir o conteúdo existente',
      icon: PencilLine,
      onClick: () => onAction('FIX_CONTENT'),
    },
    {
      label: 'Traduzir conteúdo existene',
      icon: Languages,
      onClick: () => onAction('TRANSLATE_CONTENT'),
    },
  ]

  const { data: credits, isLoading } = useQuery({
    queryKey: queryKeys.credits,
    queryFn: ApiService.getCredits,
  })

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
              {isLoading ? <Skeleton className="w-5 h-5" /> : credits}{' '}
              {credits === 1 ? 'crédito' : 'créditos'}
            </strong>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {actions.map((action) => (
            <DropdownMenuItem
              key={action.label}
              className="gap-2"
              onClick={action.onClick}
              disabled={isLoading}
            >
              <action.icon size={20} className="text-muted-foreground" />
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <BuyCreditsDialog
        open={showCreditsDialog}
        setOpen={setShowCreditsDialog}
      />

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
