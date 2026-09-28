import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type LeftSidebarState = 'collapsed' | 'expanded'
export type RightSidebarState = 'hidden' | 'sources' | 'detail'

export interface SidebarSliceState {
  leftSidebar: LeftSidebarState
  rightSidebar: RightSidebarState
}

const initialState: SidebarSliceState = {
  leftSidebar: 'collapsed',
  rightSidebar: 'hidden',
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleLeftSidebar: (state) => {
      state.leftSidebar = state.leftSidebar === 'collapsed' ? 'expanded' : 'collapsed'
    },
    setLeftSidebar: (state, action: PayloadAction<LeftSidebarState>) => {
      state.leftSidebar = action.payload
    },
    toggleRightSidebar: (state) => {
      state.rightSidebar = state.rightSidebar === 'hidden' ? 'sources' : 'hidden'
    },
    setRightSidebar: (state, action: PayloadAction<RightSidebarState>) => {
      state.rightSidebar = action.payload
    },
  },
})

export const {
  toggleLeftSidebar,
  setLeftSidebar,
  toggleRightSidebar,
  setRightSidebar,
} = sidebarSlice.actions

export default sidebarSlice.reducer
