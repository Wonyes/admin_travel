import { create } from "zustand";

const INITIAL_PAGE_SIZE = 10;

interface PaginationData {
  size: number;
  number: number;
  pageNumber: number;
  totalPages: number;

  first: boolean;
  last: boolean;
}

interface PaginationState {
  size: number;

  state: string;
  currentPage: number;
  selectMeaning: { [key: string]: string };
  pageData: PaginationData | null;
}

interface PaginationActions {
  resetPageParams: () => void;
  setState: (state: string) => void;
  setCurrentPage: (currentPage: number) => void;
  setSelectMeaning: (selectMeaning: { [key: string]: string }) => void;
  setPageData: (pageData: PaginationData | null) => void;
}

const initialState: PaginationState = {
  state: "",
  selectMeaning: {},
  currentPage: 0,
  pageData: null,
  size: INITIAL_PAGE_SIZE,
};

export const usePageStore = create<PaginationState & PaginationActions>((set) => ({
  ...initialState,
  setState: (state) => set({ state }),
  resetPageParams: () => set(initialState),
  setPageData: (pageData) => set({ pageData }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setSelectMeaning: (selectMeaning) =>
    set((state) => ({ selectMeaning: { ...state.selectMeaning, ...selectMeaning } })),
}));
