import { ResumeDto } from '@/db/types'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface ResumeCardButtonProps {
  title: string
  description: string
  icon?: React.ReactNode
}

export const ResumeCardButton = ({
  title,
  description,
  icon,
}: ResumeCardButtonProps) => {
  return (
    <button className="w-full h-[300px] bg-muted/50 rounded border-muted-foreground/20 flex items-center justify-center relative outline-none overflow-hidden hover:brightness-105 dark:hover:brightness-125 transition-all">
      {icon}
      <div className="absolute w-full left-0 bottom-0 p-3 text-left bg-gradient-to-t from-background/80">
        <p className="text-sm font-semibold font-title">{title}</p>
        <span className="block text-xs text-muted-foreground">
          {description}
        </span>
      </div>
    </button>
  )
}

interface ResumeCardProps {
  resume: ResumeDto
}

export const ResumeCard = ({ resume }: ResumeCardProps) => {
  const formattedLastUpdate = resume.updatedAt
    ? formatDistanceToNow(new Date(resume.updatedAt), { addSuffix: true })
    : 'Data não disponível'

  return (
    <Link href={`/dashboard/resumes/${resume.id}`} className="block w-full">
      <ResumeCardButton
        title={resume.title}
        description={`Última atualização ${formattedLastUpdate}`}
      />
    </Link>
  )
}
