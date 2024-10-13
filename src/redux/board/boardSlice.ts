import { createSlice } from '@reduxjs/toolkit';
import { Board } from '../../types';
import {
  addCardToColumn,
  createBoard,
  deleteBoard,
  deleteCardFromColumn,
  fetchBoardById,
  fetchBoards,
  updateBoard,
  updateCardInColumn,
  updateColumns,
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
    builder.addCase(addCardToColumn.fulfilled, (state, action) => {
      const { boardId, columnId, card } = action.payload;
      const selectedBoard = state.boards.find((board) => board._id === boardId);
      const selectedColumn = selectedBoard?.columns.find(
        (column) => column._id === columnId
      );
      if (selectedColumn) {
        selectedColumn.cards.push(card);
      }
    });
    builder.addCase(updateCardInColumn.fulfilled, (state, action) => {
      const { boardId, columnId, cardId, card } = action.payload;
      const selectedBoard = state.boards.find((board) => board._id === boardId);
      const selectedColumn = selectedBoard?.columns.find(
        (column) => column._id === columnId
      );
      if (selectedColumn) {
        const cardIndex = selectedColumn.cards.findIndex(
          (taskCard) => taskCard._id === cardId
        );
        if (cardIndex !== -1) {
          selectedColumn.cards[cardIndex] = card;
        }
      }
    });
    builder.addCase(deleteCardFromColumn.fulfilled, (state, action) => {
      const { boardId, columnId, cardId } = action.payload;

      const selectedBoard = state.boards.find((board) => board._id === boardId);
      const selectedColumn = selectedBoard?.columns.find(
        (column) => column._id === columnId
      );
      if (selectedColumn) {
        selectedColumn.cards = selectedColumn.cards.filter(
          (card) => card._id !== cardId
        );
      }
    });
    builder.addCase(updateColumns.fulfilled, (state, action) => {
      const updatedBoard = action.payload;
      const index = state.boards.findIndex(
        (board) => board._id === updatedBoard._id
      );
      if (index !== -1) {
        state.boards[index] = updatedBoard;
      }
    });
  },
});

export const boardReducer = boardSlice.reducer;
