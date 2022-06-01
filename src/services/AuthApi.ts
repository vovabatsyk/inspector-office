import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/auth',
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: '/login',
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const { useLoginMutation } = authApi
