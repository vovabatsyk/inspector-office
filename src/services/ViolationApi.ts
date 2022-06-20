import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../constants/url'
import { IViolation } from '../models/IViolation'
import { IViolationStory } from '../models/IViolationStory'
import { IViolationAdmin } from '../models/IViolationAdmin'

export const violationApi = createApi({
  reducerPath: 'violationApi',
  tagTypes: ['Violations', 'Violation'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL.DEFAULT}api/`,
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
    addViolation: build.mutation({
      query: (body: IViolation) => ({
        url: 'violations',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Violations'],
    }),
    deleteViolation: build.mutation({
      query: (id) => ({
        url: `violations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Violations'],
    }),
    getViolation: build.query<IViolation, string>({
      query: (id) => `violations/${id}`,
      providesTags: ['Violation'],
    }),
    getViolationStories: build.query<IViolationStory[], number>({
      query: (limit = 500) => ({ url: 'violation-story' }),
      providesTags: ['Violations', 'Violation'],
    }),
    getViolationAdmin: build.query<IViolationAdmin[], number>({
      query: (limit = 500) => ({ url: 'violation-admin' }),
      providesTags: ['Violations', 'Violation'],
    }),
    getViolationAdminById: build.query<IViolationAdmin, string>({
      query: (id) => `violation-admin/${id}`,
      providesTags: ['Violations'],
    }),
  }),
})

export const {
  useGetViolationsQuery,
  useDeleteViolationMutation,
  useGetViolationQuery,
  useAddViolationMutation,
  useGetViolationStoriesQuery,
  useGetViolationAdminQuery,
  useGetViolationAdminByIdQuery,
} = violationApi
