import { Ditto } from '@/components/pages/resume/resume-content/templates/ditto'
import { Eevee } from '@/components/pages/resume/resume-content/templates/eevee'
import { Jynx } from '@/components/pages/resume/resume-content/templates/jynx'
import { Onix } from '@/components/pages/resume/resume-content/templates/onix'
import { useMemo } from 'react'

export interface BaseResumeProps {
  data: ResumeData
}

interface ResumeTemplateProps {
  data: ResumeData
}

const templatesMap: Record<ResumeTemplates, React.FC<BaseResumeProps>> = {
  ditto: Ditto,
  eevee: Eevee,
  jynx: Jynx,
  onix: Onix
}

export const ResumeTemplate = ({ data }: ResumeTemplateProps) => {
  const template = data.structure.template

  const Resume = useMemo(() => {
    return templatesMap[template]
  }, [template])

  return (
    <div
      id="resume-content"
      className="w-[210mm] min-h-[297mm] bg-white text-black font-arial [&_hr]:border-black"
    >
      <Resume data={data} />
    </div>
  )
}
