import { RootState } from '../store';

export const selectBoards = (state: RootState) => state.board.boards;
export const selectCurrentBoard = (state: RootState) =>
  state.board.currentBoard;
