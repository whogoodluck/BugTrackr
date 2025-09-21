import { Clock, EditIcon, Ellipsis, Loader2, Loader2Icon, Trash2 } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { cn } from '../lib/utils'

import { useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { useDeleteBug, useUpdateBug } from '../hooks/useBug'
import { Status } from '../schemas/bug.schema'
import { Role } from '../schemas/user.schema'
import type { Bug } from '../types/bug.type'
import BugForm from './BugForm'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button, buttonVariants } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

function ManageBug({ bug }: { bug: Bug }) {
  const { user } = useAuthContext()
  const [selectedStatus, setSelectedStatus] = useState<Status>(bug.status)

  const { mutate: deleteBug, isPending: isDeleting } = useDeleteBug()
  const handleDeleteTask = () => {
    deleteBug(bug.id)
  }

  const { mutate: updateStatus, isPending: isUpdating } = useUpdateBug()

  const handleUpdateStatus = () => {
    updateStatus({ id: bug.id, bugData: { status: selectedStatus } })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='text-primary cursor-pointer outline-none'>
          <Ellipsis strokeWidth={3} className='' />
          <span className='sr-only'>Toggle task menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2'>
        <AlertDialog>
          <AlertDialogTrigger className='flex cursor-pointer items-center gap-2'>
            {isDeleting ? (
              <>
                <Loader2Icon size={16} className='text-destructive h-4 w-4 animate-spin' />{' '}
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} className='text-destructive' /> Delete
              </>
            )}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this issue.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteTask}
                className={cn(buttonVariants({ variant: 'destructive' }))}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {user?.id === bug.reporterId && (
          <Dialog>
            <DialogTrigger className='flex cursor-pointer items-center gap-2'>
              <EditIcon size={16} /> Edit
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className='text-center'>Update Issue</DialogTitle>
              <BugForm formType='update' bug={bug} />
            </DialogContent>
          </Dialog>
        )}

        {user?.role === Role.ADMIN && (
          <Dialog>
            <DialogTrigger className='flex cursor-pointer items-center gap-2'>
              <Clock size={16} /> Change Status
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className='text-center'>Update Status</DialogTitle>
              <Select
                onValueChange={(status: Status) => setSelectedStatus(status)}
                defaultValue={selectedStatus}
              >
                <SelectTrigger className='w-full cursor-pointer'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Status).map(status => (
                    <SelectItem className='cursor-pointer' key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={handleUpdateStatus}>
                {isUpdating ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Updating...
                  </>
                ) : (
                  'Update'
                )}
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ManageBug
