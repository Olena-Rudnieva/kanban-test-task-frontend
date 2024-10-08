import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, BOARDS_URL } from '../../constants';
import { Board } from '../../types';

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

    console.log('response', response);

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
