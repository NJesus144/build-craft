import { api } from '@/lib/axios'

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
  const { data } = await api.post("/generate/translate", payload)
  return data
}

export const ApiService = {
  getResumeUrl,
  fixContent,
  translate,
  generateContentForJob,
}
