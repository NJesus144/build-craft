"use client"

import { Button } from '@/components/ui/button'
import { BaseDialogProps, Dialog } from '@/components/ui/dialog'
import { deleteResume } from '@/db/actions'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export const DeleteResumeDialog = (props: BaseDialogProps) => {
  const [open, setOpen] = useState(false)

  const params = useParams()
  const router = useRouter()
  const resumeId = params.id as string

  const onDelete = async () => {
    try{
      deleteResume(resumeId)
      toast.success("Currículo deletado com sucesso")
      router.push('/dashboard/resumes')
    }catch(error){
      console.log(error)
      toast.error('Erro ao deletar currículo')
    }
  }

  return (
    <Dialog
      {...props}
      open={open}
      setOpen={setOpen}
      title="Deletar Currículo"
      description="Tem certeza que deseja deletar este currículo?"
      content={
        <div className="flex gap-2 ml-auto">
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={onDelete} variant="destructive">
            Deletar
          </Button>
        </div>
      }
    />
  )
}
