'use client'

import { InfosSidebar } from '@/components/pages/resume/infos-sidebar'
import { ResumeContent } from '@/components/pages/resume/resume-content'
import { StructureSidebar } from '@/components/pages/resume/structure-sidebar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { updatedResumeData } from '@/db/actions'
import { useDebounce } from '@/hooks/use-debounce'
import { mergician } from 'mergician'
import { User } from 'next-auth'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface ResumePageProps {
  initialData: ResumeData
  title: string
  user?: User
}

export const ResumePage = ({ initialData, title, user }: ResumePageProps) => {
  const params = useParams()
  const resumeId = params.id as string

  const defaultValues: ResumeData = {
    content: {
      summary: '<p></p>',
      image: {
        url: user?.image ?? '',
        visible: true,
      },
      infos: {
        email: user?.email ?? '',
        fullName: user?.name ?? '',
        headline: '',
        location: '',
        phone: '',
        website: '',
      },
      certifications: [],
      educations: [],
      experiences: [],
      languages: [],
      projects: [],
      skills: [],
      socialMedias: [],
    },
    structure: {
      template: 'ditto',
      colorTheme: 'slate',
      language: 'portuguese',
      layout: {
        mainSections: [
          { key: 'summary' },
          { key: 'experiences' },
          { key: 'educations' },
          { key: 'skills' },
          { key: 'languages' },
          { key: 'certifications' },
          { key: 'projects' },
        ],
        sidebarSections: [{ key: 'languages' }, { key: 'skills' }],
      },
    },
  }

  const methods = useForm<ResumeData>({
    defaultValues: mergician(defaultValues, initialData),
  })

  const data = methods.watch()
  const debouncedData = useDebounce(JSON.stringify(data))
  const shouldSave = useRef(false)

  const handleSaveUpdates = useCallback(() => {
    try {
      if (!shouldSave.current) {
        shouldSave.current = true
        return
      }

      const updatedData = methods.getValues()
      updatedResumeData(resumeId, updatedData)
    } catch (error) {
      console.log(error)
    }
  }, [methods, resumeId])

  useEffect(() => {
    handleSaveUpdates()
  }, [debouncedData, handleSaveUpdates])

  return (
    <FormProvider {...methods}>
      <main className="w-full h-screen overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          <ResizablePanel minSize={20} maxSize={40} defaultSize={30}>
            <InfosSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel>
            <ResumeContent title={title} />
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel minSize={20} maxSize={35} defaultSize={25}>
            <StructureSidebar />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </FormProvider>
  )
}
