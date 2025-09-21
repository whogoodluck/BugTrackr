import { Dot } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { cn, formatTimeAgo } from '../lib/utils'
import { Severity, Status } from '../schemas/bug.schema'
import type { Bug } from '../types/bug.type'
import { Badge } from './ui/badge'

export default function BugCard({ bug }: { bug: Bug }) {
  return (
    <Card>
      <CardHeader className='flex items-center justify-between'>
        <Link to={`/bugs/${bug.id}`}>
          <CardTitle className='line-clamp-2'>{bug.title}</CardTitle>
        </Link>
        {/* <ManageTask task={task} /> */}
      </CardHeader>
      <CardContent>
        <Link to={`/bugs/${bug.id}`}>
          <article className='text-muted-foreground line-clamp-3 text-sm'>
            {bug.description}
          </article>{' '}
        </Link>
      </CardContent>
      <CardFooter className='flex items-center gap-2'>
        <Badge
          variant='secondary'
          className={cn('text-[#0a4ad3]', {
            'text-[#28a745]': bug.status === Status.IN_PROGRESS,
            'text-[#6c757d]': bug.status === Status.CLOSED,
          })}
        >
          {bug.status}
        </Badge>
        <Badge
          variant='secondary'
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
      </CardFooter>
    </Card>
  )
}
