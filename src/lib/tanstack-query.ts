import { MutationCache, QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

const handleErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }

  if (!axios.isAxiosError(error)) {
    return 'An error occurred'
  }

  return error?.response?.data?.message || 'An error occurred'
}

export const useTanstackQuery = () => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
      mutationCache: new MutationCache({
        onError: (error, _variables, _context, mutation) => {
          if (mutation.options.onError) return

          const errorMessage = handleErrorMessage(error)
          toast.error(errorMessage)
          console.error(error)
        },
      }),
    }),
  )

  return queryClient
}
