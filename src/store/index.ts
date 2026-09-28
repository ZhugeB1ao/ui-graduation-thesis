import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import chatReducer from './slices/chatSlice'
import sidebarReducer from './slices/sidebarSlice'
import conversationReducer from './slices/conversationSlice'

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    sidebar: sidebarReducer,
    conversation: conversationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
