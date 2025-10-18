import { create } from "zustand";

type OverlayType = "alert" | "confirm" | "modal" | "toast";

export interface OverlayProps {
  title?: string;
  message?: string;
  message2?: string;
  mainBtn?: string;
  subBtn?: string;
  onFunc?: () => void;
  content?: React.ReactNode;
}

interface OverlayState {
  alert: {
    isShow: boolean;

    title: string;
    mainBtn: string;
    message?: string;
    message2?: string;
    onFunc?: () => void;
  };
  confirm: {
    isShow: boolean;

    title: string;
    subBtn: string;
    mainBtn: string;
    message?: string;
    message2?: string;
    onFunc?: () => void;
  };
  modal: {
    isShow: boolean;

    title: string;
    subBtn: string;
    mainBtn: string;
    onFunc?: () => void;
    content: React.ReactNode;
  };
  toast: {
    isShow: boolean;

    message: string;
    onFunc?: () => void;
  };
}

interface OverlayStore extends OverlayState {
  openOverlay: (type: OverlayType, props?: OverlayProps) => void;
  closeOverlay: (type: OverlayType, withState?: boolean) => void;
}

const initialState: OverlayState = {
  alert: {
    isShow: false,
    title: "",
    message: "",
    message2: "",
    mainBtn: "확인",
  },
  confirm: {
    isShow: false,
    title: "",
    message: "",
    message2: "",
    subBtn: "취소",
    mainBtn: "확인",
  },
  modal: {
    isShow: false,
    title: "",
    subBtn: "취소",
    mainBtn: "확인",

    content: null,
  },
  toast: {
    isShow: false,
    message: "",
  },
};

export const useOverlayStore = create<OverlayStore>((set) => ({
  ...initialState,
  openOverlay: (type, props) =>
    set((state) => ({
      [type]: {
        ...state[type],
        isShow: true,
        ...props,
      },
    })),
  closeOverlay: (type, withState) =>
    set((state) => {
      if (withState) state[type].onFunc?.();
      return {
        [type]: {
          ...state[type],
          isShow: false,
        },
      };
    }),
}));
