import { Loader2, LogOutIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { useLogout } from '../hooks/useAuth'
import { cn } from '../lib/utils'
import { Button } from './ui/button'

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
    <div className='border-foreground/30 bg-background fixed top-0 z-50 flex h-24 w-full items-center justify-between px-6 md:px-16'>
      <Link to='/' className='text-primary text-3xl font-semibold'>
        BugTrackr
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
        <Button size='lg' variant='secondary' className='text-destructive' onClick={handleLogout}>
          {isPending ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <LogOutIcon className='h-4 w-4' />
          )}
        </Button>
      </div>
    </div>
  )
}

export default Header
