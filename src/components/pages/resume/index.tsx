'use client'

import { InfosSidebar } from '@/components/pages/resume/infos-sidebar'
import { ResumeContent } from '@/components/pages/resume/resume-content'
import { StructureSidebar } from '@/components/pages/resume/structure-sidebar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { FormProvider, useForm } from 'react-hook-form'

export const ResumePage = () => {
  const defaultValues: ResumeData = {
    content: {
      image: {
        url: '',
        visible: true,
      },
      infos: {
        email: '',
        fullName: '',
        headline: '',
        location: '',
        phone: '',
        website: '',
      },
      summary: '',
      certifications: [],
      educations: [],
      experiences: [],
      languages: [],
      projects: [],
      skills: [],
      socialMedias: [],
    },
  }

  const methods = useForm<ResumeData>({ defaultValues })

  return (
    <FormProvider {...methods}>
      <main className="w-full h-screen overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          <ResizablePanel minSize={20} maxSize={40} defaultSize={30}>
            <InfosSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel>
            <ResumeContent />
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
