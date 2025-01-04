import { db } from '@/db/drizzle'
import { resumes } from '@/db/schema'
import { ResumeDto } from '@/db/types'
import { auth } from '@/lib/auth'
import { desc, eq } from 'drizzle-orm'
import { cache } from 'react'

export const getResumes = cache(async (): Promise<ResumeDto[]> => {
  const session = await auth()

  const userId = session?.user?.id
  if (!userId) return []

  const userResumes = await db.query.resumes.findMany({
    where: eq(resumes.userId, userId),
    orderBy: [desc(resumes.createdAt)],
  })

  return userResumes
})

export const getResumeById = cache(
  async (id: string): Promise<ResumeDto | undefined> => {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) return undefined

    const resume = await db.query.resumes.findFirst({
      where: eq(resumes.id, id),
    })
    return resume
  })
