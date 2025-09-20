import { Loader2 } from 'lucide-react'

const Loading = () => (
  <div className='bg-background flex min-h-screen items-center justify-center'>
    <div className='flex flex-col items-center space-y-4'>
      <Loader2 className='text-primary h-8 w-8 animate-spin' />
      <p className='text-muted-foreground text-sm'>Loading...</p>
    </div>
  </div>
)

export default Loading
