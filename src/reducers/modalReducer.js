import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    transactionId: null,
    isOpen: false,
    data: {},
  },
  reducers: {
    setTransactionId: (state, action) => {
      state.transactionId = action.payload;
    },
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { setTransactionId, openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
