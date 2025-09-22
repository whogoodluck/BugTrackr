import { Bug, Filter, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import BugCard from '../components/BugCard'
import Loading from '../components/Loading'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { useGetAllBugs } from '../hooks/useBug'
import { Severity, Status } from '../schemas/bug.schema'
import type { Bug as BugType } from '../types/bug.type'

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<Status | undefined>()
  const [severityFilter, setSeverityFilter] = useState<Severity | undefined>()

  const { data, isPending, refetch } = useGetAllBugs({
    severity: severityFilter ?? '',
    status: statusFilter ?? '',
  })

  useEffect(() => {
    refetch()
  }, [severityFilter, statusFilter, refetch])

  const handleGetAllBugs = () => {
    setStatusFilter(undefined)
    setSeverityFilter(undefined)
    setSearchTerm('')
    refetch()
  }

  const handleSelectStatus = async (value: Status) => {
    setStatusFilter(value)
    setSearchTerm('')
  }

  const handleSelectSeverity = async (value: Severity) => {
    setSeverityFilter(value)
    setSearchTerm('')
  }

  const filteredBugs = useMemo(() => {
    const bugs: BugType[] = data?.data || []

    return bugs.filter(bug => {
      const matchesSearch =
        bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bug.description.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesSearch
    })
  }, [data, searchTerm])

  if (isPending) return <Loading />

  return (
    <div className='mt-24'>
      <div className='bg- space-y-4 px-4 py-6 md:px-16'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Bug Dashboard</h1>
            <p className='text-muted-foreground'>Manage and track all reported bugs</p>
          </div>
          <div className='flex items-center gap-2'>
            <Bug className='text-primary h-5 w-5' />
            <span className='text-muted-foreground text-sm'>Admin Panel</span>
          </div>
        </div>

        <Card className='bg-background shadow-none'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Filter className='h-5 w-5' />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-4 md:flex-row md:items-center'>
              <div className='flex-1'>
                <div className='relative'>
                  <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
                  <Input
                    placeholder='Search bugs by title or description'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='pl-9'
                  />
                </div>
              </div>
              <div className='flex gap-2'>
                <Select value={statusFilter} onValueChange={handleSelectStatus}>
                  <SelectTrigger className='w-40 cursor-pointer'>
                    <SelectValue placeholder='Status' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Status).map(status => (
                      <SelectItem key={status} value={status} className='cursor-pointer'>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={severityFilter} onValueChange={handleSelectSeverity}>
                  <SelectTrigger className='w-40 cursor-pointer'>
                    <SelectValue placeholder='Severity' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Severity).map(severity => (
                      <SelectItem key={severity} value={severity} className='cursor-pointer'>
                        {severity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant='outline'
                  className='text-muted-foreground'
                  onClick={handleGetAllBugs}
                >
                  All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {filteredBugs.length > 0 ? (
        <div className='space-y-4 px-4 py-6 md:px-16'>
          {filteredBugs?.map(bug => (
            <BugCard key={bug.id} bug={bug} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center p-10'>
          <p className='text-muted-foreground text-sm'>No bugs found.</p>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
