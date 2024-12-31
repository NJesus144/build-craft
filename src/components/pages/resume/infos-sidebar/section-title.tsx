import { LucideIcon } from 'lucide-react'

interface SectionTitleProps {
  icon: LucideIcon
  title: string
}

export const SectionTitle = ({ icon: Icon, title }: SectionTitleProps) => {
  return (
    <div className="flex items-center gap-2">
      <Icon size={18} className="text-muted-foreground" />
      <h2 className="text-2xl font-title font-bold">{title}</h2>
    </div>
  )
}
