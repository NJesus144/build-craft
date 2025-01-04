import { db } from '@/db/drizzle'
import { resumes } from '@/db/schema'
import { ResumeDto } from '@/db/types'
import { auth } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import { asc, desc } from 'drizzle-orm'

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
