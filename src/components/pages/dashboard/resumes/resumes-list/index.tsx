import { AddResumeButton } from '@/components/pages/dashboard/resumes/add-resume-button'
import { NewResumeDialog } from '@/components/pages/dashboard/resumes/new-resume-dialog'
import { ResumeCard } from '@/components/pages/dashboard/resumes/resume-card'
import { getResumes } from '@/db/queries'

export const ResumesList = async () => {
  const resumes = await getResumes()

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-max gap-4 lg:gap-5 flex-1">
      <NewResumeDialog>
        <AddResumeButton />
      </NewResumeDialog>
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </section>
  )
}
