import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Sort = {
  name: string;
  sortProperty: "rating" | "title" | "price" | "-rating" | "-title" | "-price";
};

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности ⬇",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  //   начальное состояние
  initialState,
  // команды (actions)
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;
export default filterSlice.reducer;
