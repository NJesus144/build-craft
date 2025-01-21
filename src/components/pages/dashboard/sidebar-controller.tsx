'use client'

import { MenuToggle } from '@/components/shared/menu-toggle'
import { useSidebar } from '@/hooks/use-sidebar'

export function SidebarController() {
  useSidebar()
  return <MenuToggle />
}