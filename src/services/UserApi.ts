import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { IUser } from '../models/IUser'
// import { IUserData } from '../models/IUserData'

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['Users', 'User'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
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
    // addUser: build.mutation({
    //   query: (body: IUser) => ({
    //     url: 'auth/registration',
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['Users'],
    // }),
    // deleteUser: build.mutation({
    //   query: (id) => ({
    //     url: `api/users/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Users'],
    // }),
    getUser: build.query<any, string>({
      query: (id) => `api/users/${id}`,
      providesTags: ['Users'],
    }),
    // updateUser: build.mutation({
    //   query: ({ id, ...body }) => ({
    //     url: `api/users/${id}`,
    //     method: 'PUT',
    //     body,
    //   }),
    //   invalidatesTags: ['User'],
    // }),
  }),
})

export const { useGetUserQuery, useGetUsersQuery } = userApi
