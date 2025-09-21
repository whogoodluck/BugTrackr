import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Loader2 } from 'lucide-react'
import { useCreateBug, useUpdateBug } from '../hooks/useBug'
import { createBugSchema, Severity, type CreateBugSchema } from '../schemas/bug.schema'
import type { Bug } from '../types/bug.type'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'

interface BugFormProps {
  formType?: 'create' | 'update'
  bug?: Bug
}

function BugForm({ formType = 'create', bug }: BugFormProps) {
  const form = useForm<CreateBugSchema>({
    resolver: zodResolver(createBugSchema),
    defaultValues: {
      title: bug?.title || '',
      description: bug?.description || '',
      severity: bug?.severity || undefined,
    },
  })

  const { mutate: createBug, isPending: isCreating } = useCreateBug()
  const { mutate: updateBug, isPending: isUpdating } = useUpdateBug()

  const onSubmit = async (data: CreateBugSchema) => {
    if (formType === 'create') {
      createBug(data)
    } else if (bug) {
      updateBug({ id: bug.id, bugData: data })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='my-8 space-y-6'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Enter Bug title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Describe the bug...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='severity'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Severity</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full cursor-pointer'>
                    <SelectValue placeholder='Select priority' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Severity).map(priority => (
                    <SelectItem className='cursor-pointer' key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='mt-4 w-full' size='lg'>
          {isCreating || isUpdating ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />{' '}
              {formType === 'update' ? 'Updating...' : 'Creating...'}
            </>
          ) : formType === 'update' ? (
            'Update'
          ) : (
            'Create'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default BugForm
