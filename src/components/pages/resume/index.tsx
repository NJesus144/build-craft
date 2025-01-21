"use client"

import { mergician } from 'mergician'
import { User } from 'next-auth'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useMediaQuery } from 'react-responsive'

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

interface ResumePageProps {
  initialData: ResumeData
  title: string
  user?: User
}

export const ResumePage = ({ initialData, title, user }: ResumePageProps) => {
  const isMobile = useMediaQuery({ maxWidth: 768 })
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
      <main className={`w-full ${isMobile ? 'h-[300vh]' : 'h-screen'} overflow-x-hidden`}>
        <ResizablePanelGroup
          direction={isMobile ? 'vertical' : 'horizontal'}
          className="w-full h-full"
        >
          <ResizablePanel
            minSize={isMobile ? 33.33 : 20}
            maxSize={isMobile ? 33.33 : 40}
            defaultSize={isMobile ? 33.33 : 30}
            className={isMobile ? 'h-screen' : ''}
          >
            <div className="h-full overflow-y-auto">
              <InfosSidebar />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel
            minSize={isMobile ? 33.33 : 20}
            maxSize={isMobile ? 33.33 : 60}
            defaultSize={isMobile ? 33.33 : 45}
            className={isMobile ? 'h-screen' : ''}
          >
            <div className="h-full overflow-y-auto">
              <ResumeContent title={title} />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel
            minSize={isMobile ? 33.33 : 20}
            maxSize={isMobile ? 33.33 : 35}
            defaultSize={isMobile ? 33.33 : 25}
            className={isMobile ? 'h-screen' : ''}
          >
            <div className="h-full overflow-y-auto">
              <StructureSidebar />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </FormProvider>
  )
}

export default ResumePage