import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza } from "./types";
import axios from "axios";

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
