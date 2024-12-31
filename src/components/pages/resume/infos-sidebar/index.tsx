import Logo from '@/assets/logo.svg'
import { AIGenerationDropdown } from '@/components/pages/resume/infos-sidebar/ai-generation-dropdown'
import { BasicInfoSection } from '@/components/pages/resume/infos-sidebar/sections/basic-info'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export const InfosSidebar = () => {
  return (
    <aside className="w-full h-full p-6 overflow-y-auto">
      <div className="w-full flex items-center justify-between">
        <Link href="/dashboard/resumes">
          <Logo className="w-full max-w-[80px]" />
        </Link>

        <AIGenerationDropdown />
      </div>
      <Separator className="my-5" />

      <BasicInfoSection />
    </aside>
  )
}
