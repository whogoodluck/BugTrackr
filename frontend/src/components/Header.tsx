import { Loader2, LogOutIcon, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { useLogout } from '../hooks/useAuth'
import { cn } from '../lib/utils'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from './ui/menubar'

function Header() {
  const { mutate, isPending } = useLogout()

  const handleLogout = () => mutate()

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Admin', href: '/admin' },
  ]

  const { pathname } = useLocation()

  const { user } = useAuthContext()

  return (
    <div className='border-foreground/30 bg-background fixed top-0 z-50 flex h-24 w-full items-center justify-between border-b px-6 md:px-16'>
      <Link to='/' className='text-primary text-2xl font-semibold'>
        Bug<span className='text-secondary'>Trackr</span>
      </Link>
      <div className='flex items-center gap-4 md:gap-8'>
        <div className='flex items-center gap-2 md:gap-6'>
          {navItems.map(item => (
            <Link
              key={item.href}
              to={item.href}
              className={cn('text-foreground/80 hover:text-primary', {
                'text-primary font-medium': pathname === item.href,
                hidden: user?.role !== 'ADMIN' && item.href === '/admin',
              })}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Menubar className='border-none shadow-none'>
          <MenubarMenu>
            <MenubarTrigger className='rounded-full p-2'>
              <User
                size={20}
                className='text-primary cursor-pointer'
                strokeWidth={3}
                fill='currentColor'
              />
            </MenubarTrigger>
            <MenubarContent className='mr-1'>
              <div className='mb-2 flex flex-col gap-1 rounded-lg p-2'>
                <h3 className='text-xl font-semibold'>{user?.name}</h3>
                <p className='text-muted-foreground text-sm font-medium'>{user?.email}</p>
              </div>
              <div className='flex items-center justify-between gap-2 px-2'>
                <ModeToggle />
                <Button
                  size='lg'
                  variant='outline'
                  className='text-destructive flex-1'
                  onClick={handleLogout}
                >
                  {isPending ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                  ) : (
                    <>
                      <LogOutIcon className='h-4 w-4' /> Logout
                    </>
                  )}
                </Button>
              </div>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  )
}

export default Header
