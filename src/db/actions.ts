'use server'

import { db } from '@/db/drizzle'
import { auth } from '@/lib/auth'
import { resumes } from './schema'
import { revalidatePath } from 'next/cache'

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
