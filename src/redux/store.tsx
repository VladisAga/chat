import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import users from './users'
import posts from './posts'
import chats from './chats'

export const store = configureStore({
  reducer: {
    users,
    posts,
    chats
  },
  devTools: true,
});

export const useStoreDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState> 