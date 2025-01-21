import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function MenuToggle() {
  return (
    <Button
      variant="ghost"
      size="icon"
      data-toggle="sidebar"
      className="fixed top-4 left-4 z-50 lg:hidden"
    >
      <Menu className="h-6 w-6" />
    </Button>
  )
}