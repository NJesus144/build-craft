import { ResumePage } from '@/components/pages/resume'
import { getResumeById } from '@/db/queries'
import { auth } from '@/lib/auth'
import { notFound } from 'next/navigation'

interface DashboardResumepageprops {
  params: { id: string }
}

export default async function DashboardResumePage({
  params,
}: DashboardResumepageprops) {
  const resumeId = params.id
  const resume = await getResumeById(resumeId)
  if (!resume) return notFound()

  const initialData = resume.data as ResumeData
  const session = await auth()

  return (
    <ResumePage
      initialData={initialData}
      title={resume.title}
      user={session?.user}
    />
  )
}
