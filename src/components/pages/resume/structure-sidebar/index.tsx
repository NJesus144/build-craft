import { LayoutSection } from "@/components/pages/resume/structure-sidebar/sections/layout"
import { TemplatesListSection } from "@/components/pages/resume/structure-sidebar/sections/template-list"
import { Separator } from "@/components/ui/separator"

export const StructureSidebar = () => {
  return (
    <aside className="w-full h-full overflow-auto">
      <TemplatesListSection />
      <Separator className="my-5"/>
      <LayoutSection />
    </aside>
  )
}