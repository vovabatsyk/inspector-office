import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authApi } from '../services/AuthApi'
import { userApi } from '../services/UserApi'
import { violationApi } from '../services/ViolationApi'
import { violationImageApi } from '../services/ViolationImagesApi'

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [violationApi.reducerPath]: violationApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [violationImageApi.reducerPath]: violationImageApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(violationApi.middleware)
        .concat(userApi.middleware)
        .concat(violationImageApi.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
