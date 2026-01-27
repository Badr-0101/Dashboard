import { createSlice } from '@reduxjs/toolkit';

interface IActiveMenuState {
  isMenuActive: boolean;
}
const initialState: IActiveMenuState = {
  isMenuActive: true,
};

const activeMenuSlice = createSlice({
  name: 'activeMenu',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuActive = !state.isMenuActive;
    },
  },
});

export const { toggleMenu } = activeMenuSlice.actions;
export default activeMenuSlice.reducer;
