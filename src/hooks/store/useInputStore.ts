import { create } from "zustand";

interface ProductState {
  productName: string;
  productPrice: number;
  discountRate: number;
  discountPrice: number;
  stockNo: number;
  recommend: number | string;
}

interface UserState {
  id: string;
  adminID: string;
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}
interface conditionState {
  qaSearchValue: string;
  orderSearchValue: string;
  issueSearchValue: string;
  ticketSearchValue: string;
  requestSearchValue: string;
  counselSearchValue: string;
}

interface InputState {
  product: ProductState;
  user: UserState;
  condition: conditionState;
}

interface InputActions {
  resetInputValues: () => void;
  setInitialInput: (data: Partial<InputState>) => void;
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MAX_DISCOUNT = 99;
const MAX_PRODUCTNAME = 100;
const NUMERIC_FIELDS = ["productPrice", "discountRate", "stockNo", "recommend"] as const;
const NUMBER_ENG = ["adminID", "password", "newPassword", "newPasswordConfirm"] as const;

const initialState: InputState = {
  product: {
    productPrice: 0,
    discountRate: 0,
    discountPrice: 0,
    stockNo: 0,
    productName: "",
    recommend: 0,
  },
  user: {
    id: "",
    adminID: "",
    password: "",

    newPassword: "",
    newPasswordConfirm: "",
  },
  condition: {
    qaSearchValue: "",
    orderSearchValue: "",
    issueSearchValue: "",
    ticketSearchValue: "",
    requestSearchValue: "",
    counselSearchValue: "",
  },
};

const calculateDiscount = (price: number, rate: number) => price * (1 - rate / 100);

export const useInputStore = create<InputState & InputActions>((set) => ({
  ...initialState,

  setInitialInput: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  inputChange: (e) => {
    const { name, value: rawValue } = e.target;
    const value = rawValue.replace(/,/g, "").trim();

    if (name === "productName" && value.length > MAX_PRODUCTNAME) return;

    set((state) => {
      if (name in state.product) {
        if (NUMERIC_FIELDS.includes(name as (typeof NUMERIC_FIELDS)[number])) {
          if (isNaN(Number(value))) return state;
          const numValue = Number(value);

          if (name === "discountRate" && (numValue < 0 || numValue > MAX_DISCOUNT)) return state;

          const updates = {
            ...state.product,
            [name]: numValue,
            ...(name === "productPrice" || name === "discountRate"
              ? {
                  discountPrice: calculateDiscount(
                    name === "productPrice" ? numValue : state.product.productPrice,
                    name === "discountRate" ? numValue : state.product.discountRate
                  ),
                }
              : {}),
          };

          return { ...state, product: updates };
        }

        return { ...state, product: { ...state.product, [name]: value } };
      }

      if (name in state.user) {
        if (NUMBER_ENG.includes(name as (typeof NUMBER_ENG)[number])) {
          const numEng = /^[A-Za-z0-9]*$/;
          if (!numEng.test(value)) return state;
        }
        return { ...state, user: { ...state.user, [name]: value } };
      }

      if (name in state.condition) {
        return { ...state, condition: { ...state.condition, [name]: value } };
      }

      return state;
    });
  },

  resetInputValues: () => set(initialState),
}));
