'use client'

import { TransformControls } from '@/components/pages/resume/resume-content/controls'
import { NavigationHeader } from '@/components/pages/resume/resume-content/header'
import { ResumeTemplate } from '@/components/pages/resume/resume-content/templates'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

export const ResumeContent = () => {
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
        <NavigationHeader />
          <TransformControls />
          <TransformComponent>
            <ResumeTemplate />
          </TransformComponent>
        </>
      </TransformWrapper>
    </section>
  )
}
