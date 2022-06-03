import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IViolation } from '../models/IViolation'

export const violationApi = createApi({
  reducerPath: 'violationApi',
  tagTypes: ['Violations', 'Violation'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    getViolations: build.query<IViolation[], number>({
      query: (limit = 500) => ({ url: 'violations' }),
      providesTags: ['Violations', 'Violation'],
    }),
    //     addNotice: build.mutation({
    //       query: (body: INotice) => ({
    //         url: 'notices',
    //         method: 'POST',
    //         body,
    //       }),
    //       invalidatesTags: ['Notices'],
    //     }),
    deleteViolation: build.mutation({
      query: (id) => ({
        url: `violations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Violations'],
    }),
    //     getContact: build.query<INotice, string>({
    //       query: (id) => `notices/${id}`,
    //       providesTags: ['Notice'],
    //     }),
    //     editNotice: build.mutation({
    //       query: ({ id, ...body }) => ({
    //         url: `notices/${id}`,
    //         method: 'PUT',
    //         body,
    //       }),
    //       invalidatesTags: ['Notice'],
    //     }),
  }),
})

// export const {
// } = violationApi

export const { useGetViolationsQuery, useDeleteViolationMutation } = violationApi
