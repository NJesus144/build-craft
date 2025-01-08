'use client'

import { BuyCreditsDialog } from '@/components/pages/resume/infos-sidebar/ai-generation-dropdown/buy-credits-dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { queryKeys } from '@/constants/query-keys'
import { ApiService } from '@/services/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { BadgeCent, SquareUser } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function DashboardAccountPage() {
  const [showCreditsModal, setShowCreditsModal] = useState(false)
  const pathName = usePathname()

  const { mutate: handleOpenTransactions, isPending } = useMutation({
    mutationFn: () => ApiService.getPortalUrl(pathName),
    onSuccess: (url) => {
      location.href = url
    },
  })

  const { data: credits, isLoading } = useQuery({
    queryKey: queryKeys.credits,
    queryFn: ApiService.getCredits,
  })

  return (
    <>
      <h1 className="font-title font-bold text-3xl flex items-center gap-2">
        <SquareUser size={25} className="text-muted-foreground" />
        Configuração de Conta
      </h1>

      <Separator className="my-6" />

      <section>
        <div className="flex items-center gap-1">
          Você possui{' '}
          <span className="font-bold text-foreground inline-flex gap-0.5 items-center">
            <BadgeCent size={14} />
            {isLoading ? <Skeleton className="h-5 w-5" /> : credits}{' '}
            {credits === 1 ? 'crédito' : 'créditos'}
          </span>
        </div>

        <p className="text-muted-foreground mt-2">
          Créditos são utilizados para gerar conteúdo para seus currículos com
          inteligência artificial.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <Button
            variant="secondary"
            disabled={isLoading}
            onClick={() => setShowCreditsModal(true)}
          >
            Adicionar Créditos
          </Button>
          <Button
            variant="outline"
            disabled={isLoading || isPending}
            onClick={() => handleOpenTransactions()}
          >
            Minhas transações
          </Button>
        </div>
      </section>
      <BuyCreditsDialog open={showCreditsModal} setOpen={setShowCreditsModal} />
    </>
  )
}
