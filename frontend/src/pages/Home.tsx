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
          <h1 className='text-3xl font-semibold'>My Issues</h1>
          <p className='text-muted-foreground'>View and manage your issues</p>
        </div>
        <Link to='/create-bug' className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))}>
          <Plus className='mr-2 h-4 w-4' />
          Report New
        </Link>
      </div>
      {bugs.length === 0 ? (
        <div className='flex min-h-80 flex-col items-center justify-center'>
          <Bug className='text-muted-foreground mb-4 h-12 w-12' />
          <h3 className='mb-2 text-lg font-semibold'>
            {bugs.length === 0 ? 'No bugs reported yet' : 'No bugs match your filters'}
          </h3>
          <p className='text-muted-foreground mb-4 text-center'>
            {bugs.length === 0
              ? 'Start by reporting your first bug to help improve the system.'
              : "Try adjusting your search terms or filters to find what you're looking for."}
          </p>
          {bugs.length === 0 && (
            <Link
              to='/create-bug'
              className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))}
            >
              <Plus className='mr-2 h-4 w-4' />
              Report Your First Bug
            </Link>
          )}
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
