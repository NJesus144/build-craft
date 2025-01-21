import Logo from '@/assets/logo.svg'
import { NavaItems } from '@/components/pages/dashboard/nav-items'
import { SidebarController } from '@/components/pages/dashboard/sidebar-controller'
import { UserDropdown } from '@/components/pages/dashboard/user-dropdown'
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { auth } from '@/lib/auth'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await auth()
  
  return (
    <div className="w-full h-screen overflow-hidden lg:grid lg:grid-cols-[300px,1fr]">
      <SidebarController />
      
      <aside className="w-full h-full flex flex-col items-center border-r border-muted fixed top-0 left-0 bg-background lg:relative
        max-h-screen lg:max-h-none
        max-w-[300px] lg:w-full
        -translate-x-full data-[state=open]:translate-x-0 lg:translate-x-0
        transition-transform duration-300 ease-in-out
        z-40
        peer
      ">
        <div className="w-full p-6 border-b border-muted">
          <div>
            <Logo className="max-w-[100px] mx-auto" />
          </div>
        </div>
        
        <div className="flex-1 w-full overflow-y-auto">
          <NavaItems />
        </div>

        <div className="w-full mt-auto border-t border-muted px-3 py-4 flex items-center justify-between gap-2">
          <UserDropdown user={session?.user}/>
          <ThemeToggle />
        </div>
      </aside>

      <div className="fixed inset-0 bg-black/50 opacity-0 peer-data-[state=open]:opacity-100 lg:hidden transition-opacity pointer-events-none peer-data-[state=open]:pointer-events-auto z-30" />

      <main className="w-full h-full overflow-auto lg:w-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}