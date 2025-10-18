import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface DecodedData {
  exp: number;
  iat: number;
  id: string;
  role: string;
  sub: string;
}

interface GlobalState {
  isLogin: boolean;
  loading: boolean;

  accessToken: string | null;
  userId: string | undefined;

  decoded: DecodedData | null;
}

interface CommonActions {
  setIsLogin: (login: boolean) => void;
  setLoading: (loading: boolean) => void;
}

const loginCheck = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  const accessToken = localStorage.getItem("access-token");
  const refreshToken = localStorage.getItem("refresh-token");
  return !!(accessToken && refreshToken);
};

const getAccessToken = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("access-token");
};

const getDecodedData = (token: string | null): DecodedData | null => {
  return token ? jwtDecode<DecodedData>(token) : null;
};

const initialState: GlobalState = {
  isLogin: loginCheck(),
  loading: false,

  accessToken: getAccessToken(),
  userId: getDecodedData(getAccessToken())?.id,
  decoded: getDecodedData(getAccessToken()),
};

export const useGlobalStore = create<GlobalState & CommonActions>((set) => ({
  ...initialState,

  setIsLogin: (isLogin) => set({ isLogin }),
  setLoading: (loading) => set({ loading }),
}));
