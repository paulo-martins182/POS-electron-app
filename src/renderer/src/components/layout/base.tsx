import { Outlet } from 'react-router-dom'
import { TooltipProvider } from '../ui/tooltip'
import { Header } from './header'
import { Sidebar } from './sidebar'

export function Base() {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />

        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />

          <Outlet />
        </div>
      </div>
    </TooltipProvider>
  )
}
