import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BOARDS_URL } from '../../constants';
import { Board, Card } from '../../types';

const BASE_URL = process.env.REACT_APP_API_URL;

console.log('BASE_URL:', BASE_URL);

axios.defaults.baseURL = `${BASE_URL}`;

export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BOARDS_URL}`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchBoardById = createAsyncThunk(
  'boards/fetchBoardById',
  async (boardId: string) => {
    const response = await axios.get(`${BOARDS_URL}/${boardId}`);
    return response.data;
  }
);

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (boardData: Board, thunkAPI) => {
    try {
      const response = await axios.post(BOARDS_URL, boardData);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ id, name }: { id: string; name: string }, thunkAPI) => {
    try {
      const response = await axios.put(`${BOARDS_URL}/${id}`, { name });
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (boardId: string) => {
    const response = await axios.delete(`${BOARDS_URL}/${boardId}`);
    return response.data;
  }
);

export const addCardToColumn = createAsyncThunk(
  'boards/addCardToColumn',
  async (
    {
      boardId,
      columnId,
      cardData,
    }: { boardId: string; columnId: string; cardData: Card },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${BOARDS_URL}/${boardId}/columns/${columnId}/cards`,
        cardData
      );
      return { boardId, columnId, card: response.data };
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateCardInColumn = createAsyncThunk(
  'boards/updateCardInColumn',
  async (
    {
      boardId,
      columnId,
      cardId,
      cardData,
    }: {
      boardId: string;
      columnId: string;
      cardId: string;
      cardData: Partial<Card>;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(
        `${BOARDS_URL}/${boardId}/columns/${columnId}/cards/${cardId}`,
        cardData
      );
      return { boardId, columnId, cardId, card: response.data };
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteCardFromColumn = createAsyncThunk(
  'boards/deleteCardFromColumn',
  async (
    {
      boardId,
      columnId,
      cardId,
    }: { boardId: string; columnId: string; cardId: string },
    thunkAPI
  ) => {
    try {
      await axios.delete(
        `${BOARDS_URL}/${boardId}/columns/${columnId}/cards/${cardId}`
      );
      return { boardId, columnId, cardId };
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
