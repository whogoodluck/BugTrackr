import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const router = useNavigate()
  const goHome = () => router('/')

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-6 text-center'>
      <h1 className='text-primary mb-4 text-4xl font-bold'>404 - Page Not Found 🚫</h1>
      <p className='text-muted-foreground mb-6 text-lg'>
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Button onClick={goHome}>Go Home</Button>
    </div>
  )
}

export default NotFound
