'use server'

import { db } from '@/db/drizzle'
import { auth } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { resumes } from './schema'

const getUserIdOrThrow = async () => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) throw new Error('User not found')

  return userId
}

export const createResume = async (title: string) => {
  const userId = await getUserIdOrThrow()

  const newResume = await db
    .insert(resumes)
    .values({ title, userId })
    .returning()

  revalidatePath('/dashbaord/resumes')

  return newResume[0]
}

export const updatedResumeData = async (id: string, data: ResumeData) => {
  await getUserIdOrThrow()

  const updatedResume = await db
    .update(resumes)
    .set({ data, updatedAt: new Date() })
    .where(eq(resumes.id, id))
    .returning()

  revalidatePath('/dashboard/resumes')
  return updatedResume[0]
}

export const deleteResume = async (id: string) => {
  const userId = await getUserIdOrThrow()

  const resume = await db.query.resumes.findFirst({
    where: eq(resumes.id, id),
  })

  if (!resume) throw new Error('Resume not found')
  if (resume.userId !== userId) throw new Error('Unauthorized')

  await db.delete(resumes).where(eq(resumes.id, id)).execute()
  revalidatePath('/dashboard/resumes')
}

export const duplicateResume = async (id: string, title: string) => {
  const userId = await getUserIdOrThrow()

  const resume = await db.query.resumes.findFirst({
    where: eq(resumes.id, id),
  })

  if (!resume) throw new Error('Resume not found')

  const newResume = await db
    .insert(resumes)
    .values({ title, userId, data: resume.data })
    .returning()

  revalidatePath('/dashboard/resumes')

  return newResume[0]
}
