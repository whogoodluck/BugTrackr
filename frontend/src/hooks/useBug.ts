import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import type { UpdateBugSchema } from '../schemas/bug.schema'
import { createBug, deleteBug, getAllBugs, getBug, getMyBugs, updateBug } from '../services/bug'

export function useCreateBug() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: createBug,
    onSuccess: () => {
      queryClient.invalidateQueries()

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

export function useGetMyBugs() {
  return useQuery({
    queryKey: ['my-bugs'],
    queryFn: getMyBugs,
    staleTime: 5 * 60 * 1000,
  })
}

export function useGetBug(id: string) {
  return useQuery({
    queryKey: ['bug', id],
    queryFn: () => getBug(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export function useUpdateBug() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, bugData }: { id: string; bugData: UpdateBugSchema }) =>
      updateBug(id, bugData),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['bug', variables.id], data)

      queryClient.invalidateQueries({ queryKey: ['bugs'] })

      toast.success('Bug updated successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || error.message)
    },
  })
}

export function useDeleteBug() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteBug(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: ['bug', id] })

      queryClient.invalidateQueries()

      toast.success('Bug deleted successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || error.message)
    },
  })
}

export function usePrefetchBug() {
  const queryClient = useQueryClient()

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['bug', id],
      queryFn: () => getBug(id),
      staleTime: 5 * 60 * 1000,
    })
  }
}
