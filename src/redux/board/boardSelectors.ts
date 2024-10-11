import { RootState } from '../store';

export const selectBoards = (state: RootState) => state.board.boards;

export const selectCurrentBoard = (state: RootState) =>
  state.board.currentBoard;

export const selectColumnsByBoardId = (boardId: string) => (state: RootState) =>
  state.board.boards.find((board) => board._id === boardId)?.columns || [];

export const selectCardsByColumnId =
  (boardId: string, columnId: string) => (state: RootState) => {
    const selectedBoard = state.board.boards.find(
      (board) => board._id === boardId
    );
    const selectedColumn = selectedBoard?.columns.find(
      (column) => column._id === columnId
    );
    return selectedColumn?.cards || [];
  };
