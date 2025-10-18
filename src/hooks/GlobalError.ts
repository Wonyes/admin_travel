import { useEffect } from "react";
import { queryClient } from "./api/reactQuery/queryClient";
import { useOverlay } from "./useOverlay";

export default function GlobalError() {
  const { openAlert } = useOverlay();

  useEffect(() => {
    queryClient.setDefaultOptions({
      mutations: {
        onError: (error: any) => {
          openAlert({
            title: "요청이 실패하였습니다.",
            message: error?.data?.message || error?.message,
            mainBtn: "확인",
          });
        },
      },
    });
  }, []);

  return null;
}
