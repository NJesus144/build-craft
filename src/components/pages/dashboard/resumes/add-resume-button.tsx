import { ResumeCardButton } from '@/components/pages/dashboard/resumes/resume-card'
import { Plus } from 'lucide-react'

export const AddResumeButton = () => {
  return (
    <ResumeCardButton
      title="Criar novo currículo"
      description="Crie um novo currículo para se candidatar a vagas"
      icon={<Plus size={50} />}
    />
  )
}
