import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { CartItem } from "./cartSlice";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: Record<string, string>) => {
    const { order, sortBy, category, search, currentPage } = params;
    // await говорит дождись выполнения этой функции и только потом выполни остальной код
    const { data } = await axios.get<Pizza[]>(
      `https://67b9793c51192bd378dd8544.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data as Pizza[];
  }
);

type Pizza = {
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  id: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  //   начальное состояние
  initialState,
  // команды (actions)
  reducers: {
    setItem(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItem } = pizzaSlice.actions;
export const selectPizzaData = (state: RootState) => state.pizza;
export default pizzaSlice.reducer;
