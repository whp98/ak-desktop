import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AppAkURL {
  ip: string;
  port: string;
}

const initialState: AppAkURL = {
  "ip": '127.0.0.1',
  "port": '38080',
};

export const appAkURLSlice = createSlice({
  "name": 'appAkURL',
  initialState,
  "reducers": {
    "setIp": (state, action: PayloadAction<string>) => {
      state.ip = action.payload;
    },
    "setPort": (state, action: PayloadAction<string>) => {
      state.port = action.payload;
    },
  },
});

export const { setIp, setPort } = appAkURLSlice.actions;

export default appAkURLSlice.reducer;
