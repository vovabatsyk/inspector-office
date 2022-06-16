import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../constants/url'
// import { IUser } from '../models/IUser'
// import { IUserData } from '../models/IUserData'

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['Users', 'User'],
  baseQuery: fetchBaseQuery({
    baseUrl: URL.DEFAULT,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    getUsers: build.query<[], number>({
      query: (limit = 150) => ({ url: 'api/users' }),
      providesTags: ['Users', 'User'],
    }),
    getUser: build.query<any, string>({
      query: (id) => `api/users/${id}`,
      providesTags: ['Users'],
    }),
  }),
})

export const { useGetUserQuery, useGetUsersQuery } = userApi
