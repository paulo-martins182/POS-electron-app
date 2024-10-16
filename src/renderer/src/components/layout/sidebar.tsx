import { useNavigate } from 'react-router-dom'
import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

const menuItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  {
    path: '#',
    icon: ShoppingCart,
    label: 'Orders',
    special: 'bg-accent text-accent-foreground',
  },
  { path: '/products', icon: Package, label: 'Products' },
  { path: '#', icon: Users2, label: 'Customers' },
  { path: '#', icon: LineChart, label: 'Analytics' },
]

const bottomMenuItems = [
  { path: '/settings', icon: Settings, label: 'Settings' },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SidebarItem = ({ path, icon: Icon, label, special }: any) => {
  const navigate = useNavigate()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => navigate(path)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${special || ''}`}
        >
          <Icon className="h-5 w-5" />
          <span className="sr-only">{label}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  )
}

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <button className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </button>
        {menuItems.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        {bottomMenuItems.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </nav>
    </aside>
  )
}
