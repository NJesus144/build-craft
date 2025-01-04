import { resumes } from '@/db/schema'

export type ResumeDto = typeof resumes.$inferInsert
