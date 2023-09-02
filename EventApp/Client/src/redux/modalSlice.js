import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  loginModal: false,
  registerModal: false,
  addEventModal: false,
  updateEventModal: false,
  updateCategoryModal: false,
  addCategoryModal: false,
  addCityModal: false,
  updateCityModal: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    loginModalFunc: (state) => {
        state.loginModal = !state.loginModal
    },
    registerModalFunc: (state) => {
      state.registerModal = !state.registerModal
    },
    addEventModalFunc: (state) => {
      state.addEventModal = !state.addEventModal
    },
    updateEventModalFunc: (state) => {
      state.updateEventModal = !state.updateEventModal
    },
    updateCategoryModalFunc: (state) => {
      state.updateCategoryModal = !state.updateCategoryModal
    },
    addCategoryModalFunc: (state) => {
      state.addCategoryModal = !state.addCategoryModal
    },
    addCityModalFunc: (state) => {
      state.addCityModal = !state.addCityModal
    },
    updateCityModalFunc: (state) => {
      state.updateCityModal = !state.updateCityModal
    },

  },
})

export const { loginModalFunc, registerModalFunc, addEventModalFunc, updateEventModalFunc, updateCategoryModalFunc, addCategoryModalFunc, addCityModalFunc, updateCityModalFunc } = modalSlice.actions

export default modalSlice.reducer