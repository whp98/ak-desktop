import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import akrq from '@/renderer/api/Akrq';

export interface AppAkURL {
  ip: string;
  port: string;
}

const initialState: AppAkURL = {
  "ip": '127.0.0.1',
  "port": '38080',
};
akrq.changeBaseUrl(initialState.ip, initialState.port);
export const appAkURLSlice = createSlice({
  "name": 'appAkURL',
  initialState,
  "reducers": {
    "setIp": (state, action: PayloadAction<string>) => {
      state.ip = action.payload;
      akrq.changeBaseUrl(state.ip, state.port);
    },
    "setPort": (state, action: PayloadAction<string>) => {
      state.port = action.payload;
      akrq.changeBaseUrl(state.ip, state.port);
    },
  },
});

export const { setIp, setPort } = appAkURLSlice.actions;

export default appAkURLSlice.reducer;
