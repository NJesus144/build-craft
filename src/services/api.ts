import { api } from '@/lib/axios'

interface ResumeDownloadPayload {}

const getResumeUrl = async (payload: ResumeDownloadPayload) => {
  const { data } = await api.post('/resume/download', payload, {
    responseType: 'blob',
  })

  return window.URL.createObjectURL(data)
}

export const ApiService = {
  getResumeUrl
}