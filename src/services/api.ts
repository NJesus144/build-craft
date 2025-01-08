import { api } from '@/lib/axios'
import Stripe from 'stripe'

interface ResumeDownloadPayload {}

const getResumeUrl = async (payload: ResumeDownloadPayload) => {
  const { data } = await api.post('/resume/download', payload, {
    responseType: 'blob',
  })

  return window.URL.createObjectURL(data)
}

interface AIGenerationPayload {
  jobTitle: string
  jobDescription: string
}

const generateContentForJob = async (payload: AIGenerationPayload) => {
  const { data } = await api.post('/generate/job-title', payload)
  return data
}

const fixContent = async (content: ResumeContentData) => {
  const { data } = await api.post('/generate/fix-content', { content })
  return data
}

interface AiTranslatePayload {
  content: ResumeContentData
  language: string
}

const translate = async (payload: AiTranslatePayload) => {
  const { data } = await api.post('/generate/translate', payload)
  return data
}

const getCredits = async () => {
  const { data } = await api.get<{ credits: number }>('/credits')
  return data?.credits ?? 0
}

const getPackages = async () => {
  const { data } = await api.get<Stripe.Price[]>('/credits/packages')
  return data
}

const getCheckoutUrl = async (priceId: string, currentPathname: string) => {
  const { data } = await api.post<{ url: string }>(
    '/credits/packages/checkout',
    { priceId, currentPathname },
  )
  return data.url
}

export const ApiService = {
  getResumeUrl,
  fixContent,
  translate,
  getCredits,
  getPackages,
  getCheckoutUrl,
  generateContentForJob,
}
