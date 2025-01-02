import { LayoutSection } from '@/components/pages/resume/structure-sidebar/sections/layout'
import { TemplatesListSection } from '@/components/pages/resume/structure-sidebar/sections/template-list'
import { ThemeSection } from '@/components/pages/resume/structure-sidebar/sections/theme'
import { Separator } from '@/components/ui/separator'

export const StructureSidebar = () => {
  return (
    <aside className="w-full h-full overflow-auto">
      <TemplatesListSection />
      <Separator className="my-5" />
      <LayoutSection />
      <Separator className="my-5" />
      <ThemeSection />
    </aside>
  )
}
