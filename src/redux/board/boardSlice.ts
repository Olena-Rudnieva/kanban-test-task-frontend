import { createSlice } from '@reduxjs/toolkit';
import { Board } from '../../types';
import {
  createBoard,
  deleteBoard,
  fetchBoardById,
  fetchBoards,
  updateBoard,
} from './boardOperations';

interface BoardState {
  boards: Board[];
  currentBoard: Board | null;
}

const initialState: BoardState = {
  boards: [],
  currentBoard: null,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
    builder.addCase(fetchBoardById.fulfilled, (state, action) => {
      state.currentBoard = action.payload;
    });
    builder.addCase(createBoard.fulfilled, (state, action) => {
      const newBoard: Board = action.payload;
      state.boards.push(newBoard);
    });
    builder.addCase(updateBoard.fulfilled, (state, action) => {
      const updatedBoard = action.payload;
      const index = state.boards.findIndex(
        (board) => board._id === updatedBoard._id
      );
      if (index !== -1) {
        state.boards[index] = updatedBoard;
      }
    });
    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      const boardId = action.meta.arg;
      state.boards = state.boards.filter((board) => board._id !== boardId);
    });
  },
});

export const boardReducer = boardSlice.reducer;
