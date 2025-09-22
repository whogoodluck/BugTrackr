import { Dot } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { cn, formatTimeAgo } from '../lib/utils'
import { Severity, Status } from '../schemas/bug.schema'
import type { Bug } from '../types/bug.type'
import ManageBug from './ManageBug'
import { Badge } from './ui/badge'

export default function BugCard({ bug }: { bug: Bug }) {
  return (
    <Card>
      <CardHeader className='flex items-center justify-between gap-4'>
        <CardTitle className='line-clamp-2 text-lg'>{bug.title}</CardTitle>
        <ManageBug bug={bug} />
      </CardHeader>
      <CardContent>
        <div>
          <p className='text-foreground/90'>{bug.description}</p>{' '}
        </div>
      </CardContent>
      <CardFooter className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <Badge
            variant='outline'
            className={cn('text-[#0a4ad3]', {
              'text-[#28a745]': bug.status === Status.IN_PROGRESS,
              'text-[#6c757d]': bug.status === Status.CLOSED,
            })}
          >
            {bug.status}
          </Badge>
          <Badge
            variant='outline'
            className={cn('text-[#0f766e]', {
              'text-[#f5a511]': bug.severity === Severity.MEDIUM,
              'text-[#dc2626]': bug.severity === Severity.HIGH,
            })}
          >
            {bug.severity}
          </Badge>
          <div className='flex items-center text-sm'>
            <Dot size={24} className='text-foreground' />
            {formatTimeAgo(new Date(bug.createdAt))}
          </div>
        </div>

        <div className=''>
          <Badge variant='secondary' className='px-2 py-1'>
            {bug.reporter.name}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  )
}
