import useQueryString from "@/hooks/useQueryString";
import { useErrorStore } from "../hooks/store/useErrorStore";
import { useInputStore } from "../hooks/store/useInputStore";
import { usePageStore } from "../hooks/store/usePageStore";
import { useTextStore } from "../hooks/store/useTextStore";

const PATHS = {
  PRODUCT: "/p.regis",
} as const;

interface ResetProps {
  pathname: string;
}

export function useReset({ pathname }: ResetProps) {
  const { resetPageParams } = usePageStore();
  const { paramsClear } = useQueryString();
  const { resetTextValues } = useTextStore();
  const { resetInputValues } = useInputStore();
  const { resetError } = useErrorStore();

  const resetProduct = () => {
    resetError();
    resetTextValues();
    resetInputValues();
  };

  const isResetFunc = () => {
    if (pathname !== PATHS.PRODUCT) {
      resetProduct();
    } else {
      resetPageParams();
      paramsClear();
    }
  };

  return { isResetFunc };
}
