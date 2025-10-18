import { create } from "zustand";

export interface TextState {
  productDescription: string;
  orderReject: string;
  inquiryAnswer: string;
  report: string;
}
interface TextActions {
  resetTextValues: () => void;
  setInitialText: (data: Partial<TextState>) => void;
  textChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const initialState: TextState = {
  productDescription: "",
  orderReject: "",
  inquiryAnswer: "",
  report: "",
};

export const useTextStore = create<TextState & TextActions>((set) => ({
  ...initialState,

  textChange: (e) => {
    const { name, value } = e.target;
    if (name === "productDescription" && value.length > 3000) return;
    if (name === "inquiryAnswer" && value.length > 300) return;
    set((state) => ({
      ...state,
      [name]: value,
    }));
  },

  setInitialText: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  resetTextValues: () => set(initialState),
}));
