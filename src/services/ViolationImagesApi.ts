import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../constants/url'
import { IViolation } from '../models/IViolation'
import { IViolationImage } from '../models/IViolationImage'

export const violationImageApi = createApi({
  reducerPath: 'violationImageApi',
  tagTypes: ['ViolationImage', 'ViolationImages'],
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
    getViolationImages: build.query<IViolationImage[], string>({
      query: (id) => `violation-images/${id}`,
      providesTags: ['ViolationImage'],
    }),
    addViolationImages: build.mutation({
      query: (body: any) => ({
        url: 'violation-images',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ViolationImage', 'ViolationImages'],
    }),
  }),
})

export const { useGetViolationImagesQuery, useAddViolationImagesMutation } = violationImageApi
