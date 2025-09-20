import { Loader2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useLogout } from '../hooks/useAuth'

function Home() {
  const { mutate, isPending } = useLogout()

  const handleLogout = () => mutate()

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='text-3xl font-semibold'>Home</h1>
      <Button onClick={handleLogout}>
        {isPending ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'Logout'}
      </Button>
    </div>
  )
}

export default Home
