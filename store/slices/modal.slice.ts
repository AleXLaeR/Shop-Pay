import { createSelector, createSlice, PayloadAction, RootState } from '@reduxjs/toolkit';

type ModalPayload = [keyof ModalList, boolean?];

type ModalState = { isOpen: boolean };
const defaultModalState: ModalState = { isOpen: true };

interface ModalList {
  review: ModalState;
}

const initialState: ModalList = {
  review: defaultModalState,
};

const { actions, reducer } = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModal: (state, { payload: [modalName, isOpened] }: PayloadAction<ModalPayload>) => {
      state[modalName].isOpen = isOpened ?? !state[modalName].isOpen;
    },
  },
});
export const { setModal } = actions;

export const selectModalState = createSelector(
  ({ modal }: RootState, modalName: keyof ModalList = 'review') => modal[modalName],
  (modalState) => modalState,
);

export default reducer;
