'use client'

import { TransformControls } from '@/components/pages/resume/resume-content/controls'
import { NavigationHeader } from '@/components/pages/resume/resume-content/header'
import { ResumeTemplate } from '@/components/pages/resume/resume-content/templates'
import { useFormContext } from 'react-hook-form'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

interface ResumeContentProps {
  title: string
}

export const ResumeContent = ({ title }: ResumeContentProps) => {
  const { watch } = useFormContext<ResumeData>()
  const data = watch()

  return (
    <section className="overflow-hidden w-full h-full flex items-center justify-center relative bg-muted dark:bg-background">
      <TransformWrapper
        initialScale={0.5}
        minScale={0.4}
        centerOnInit
        centerZoomedOut
        limitToBounds={false}
      >
        <>
          <NavigationHeader title={title} />
          <TransformControls title={title} />
          <TransformComponent>
            <ResumeTemplate data={data} />
          </TransformComponent>
        </>
      </TransformWrapper>
    </section>
  )
}
