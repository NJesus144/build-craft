'use server'

import { db } from '@/db/drizzle'
import { auth } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { resumes } from './schema'

export const createResume = async (title: string) => {
  const session = await auth()

  const userId = session?.user?.id
  if (!userId) throw new Error('User not found')

  const newResume = await db
    .insert(resumes)
    .values({ title, userId })
    .returning()

  revalidatePath('/dashbaord/resumes')

  return newResume[0]
}

export const updatedResumeData = async (id: string, data: ResumeData) => {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) throw new Error('User not found')

  const updatedResume = await db
    .update(resumes)
    .set({ data, updatedAt: new Date() })
    .where(eq(resumes.id, id))
    .returning()

  revalidatePath('/dashboard/resumes')
  return updatedResume[0]
}
