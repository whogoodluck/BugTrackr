import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { createBug, getAllBugs } from '../services/bug'

export function useCreateBug() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: createBug,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bugs'] })

      toast.success('Bug created successfully!')

      navigate('/')
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || error.message)
    },
  })
}

export function useGetAllBugs(filters: { severity?: string; status?: string }) {
  return useQuery({
    queryKey: ['bugs'],
    queryFn: () => getAllBugs({ severity: filters.severity, status: filters.status }),
    staleTime: 5 * 60 * 1000,
  })
}

// // Get current user's bugs
// export function useGetMyBugs() {
//   return useQuery({
//     queryKey: ['my-bugs'],
//     queryFn: getMyBugs,
//     staleTime: 5 * 60 * 1000,
//   })
// }

// export function useGetBug(id: string) {
//   return useQuery({
//     queryKey: ['bug', id],
//     queryFn: () => getBug(id),
//     enabled: !!id,
//     staleTime: 5 * 60 * 1000,
//   })
// }

// export function useUpdateBug() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: ({ id, bugData }: { id: string; bugData: UpdateBugSchema }) =>
//       updateBug(id, bugData),
//     onSuccess: (data, variables) => {
//       // Update the specific bug in cache
//       queryClient.setQueryData(bugKeys.detail(variables.id), data)

//       // Invalidate related queries
//       queryClient.invalidateQueries({ queryKey: bugKeys.all })

//       toast.success('Bug updated successfully!')
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data.message || error.message)
//     },
//   })
// }

// // Delete a bug
// export function useDeleteBug() {
//   const queryClient = useQueryClient()
//   const navigate = useNavigate()

//   return useMutation({
//     mutationFn: (id: string) => deleteBug(id),
//     onSuccess: (_data, id) => {
//       // Remove the specific bug from cache
//       queryClient.removeQueries({ queryKey: bugKeys.detail(id) })

//       // Invalidate bug lists
//       queryClient.invalidateQueries({ queryKey: bugKeys.all })

//       toast.success('Bug deleted successfully!')

//       // Navigate back to bugs list
//       navigate('/bugs')
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data.message || error.message)
//     },
//   })
// }

// // Optimistic update for bug status (useful for quick status changes)
// export function useUpdateBugStatus() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: ({ id, status }: { id: string; status: string }) =>
//       updateBug(id, { status: status as any }),
//     onMutate: async ({ id, status }) => {
//       // Cancel outgoing refetches
//       await queryClient.cancelQueries({ queryKey: bugKeys.detail(id) })

//       // Snapshot previous value
//       const previousBug = queryClient.getQueryData(bugKeys.detail(id))

//       // Optimistically update
//       queryClient.setQueryData(bugKeys.detail(id), (old: any) => {
//         if (old) {
//           return {
//             ...old,
//             data: {
//               ...old.data,
//               status,
//               updatedAt: new Date().toISOString(),
//             },
//           }
//         }
//         return old
//       })

//       return { previousBug }
//     },
//     onError: (_error, _variables, context) => {
//       // Rollback on error
//       if (context?.previousBug) {
//         queryClient.setQueryData(bugKeys.detail(_variables.id), context.previousBug)
//       }
//       toast.error('Failed to update bug status')
//     },
//     onSuccess: () => {
//       // Invalidate related queries
//       queryClient.invalidateQueries({ queryKey: bugKeys.all })
//       toast.success('Bug status updated successfully!')
//     },
//   })
// }

// export function usePrefetchBug() {
//   const queryClient = useQueryClient()

//   return (id: string) => {
//     queryClient.prefetchQuery({
//       queryKey: ['bug', id],
//       queryFn: () => getBug(id),
//       staleTime: 5 * 60 * 1000,
//     })
//   }
// }
