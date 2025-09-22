import { Bug, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import BugCard from '../components/BugCard'
import Loading from '../components/Loading'
import { buttonVariants } from '../components/ui/button'
import { useGetMyBugs } from '../hooks/useBug'
import { cn } from '../lib/utils'
import type { Bug as BugType } from '../types/bug.type'

const Home = () => {
  const { data, isLoading } = useGetMyBugs()

  const bugs: BugType[] = data?.data || []

  if (isLoading) return <Loading />

  return (
    <div className='bg-background mt-24 px-4 py-6 md:px-16'>
      <div className='mb-4 flex items-start justify-between gap-2'>
        <div className=''>
          <h1 className='text-3xl font-semibold'>My Bugs</h1>
          <p className='text-muted-foreground'>{bugs.length} reported</p>
        </div>
        <Link to='/create-bug' className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))}>
          <Plus className='h-4 w-4' />
          Report New
        </Link>
      </div>
      {bugs.length === 0 ? (
        <div className='flex flex-col items-center justify-center gap-4 py-16'>
          <div className='border-foreground rounded-full border-2 p-4 text-4xl'>
            <Bug size={40} strokeWidth={1.5} />
          </div>
          <div className='text-foreground text-2xl font-medium'>No bugs reported yet</div>

          <Link
            to='/create-bug'
            className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))}
          >
            <Plus className='h-4 w-4' />
            Report Your First Bug
          </Link>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {bugs.map(bug => (
            <BugCard key={bug.id} bug={bug} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
