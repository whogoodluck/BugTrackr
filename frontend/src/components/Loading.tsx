import { Loader2 } from 'lucide-react'

const Loading = () => (
  <div className='bg-background flex min-h-screen items-center justify-center'>
    <Loader2 size={40} strokeWidth={3} className='text-primary h-8 w-8 animate-spin' />
  </div>
)

export default Loading
