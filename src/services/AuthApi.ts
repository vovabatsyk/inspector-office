import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../constants/url'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL.DEFAULT}api/auth`,
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
