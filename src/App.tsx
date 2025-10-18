import { Suspense, useEffect } from "react";
import Global from "./assets/style/Global";
import Router from "./pages/route/Router";
import Loading from "./hooks/Loading";
import { useGlobalStore } from "./hooks/store/useGlobalStore";
import { QueryClientProvider } from "@tanstack/react-query";
import GlobalError from "./hooks/GlobalError";
import { queryClient } from "./hooks/api/reactQuery/queryClient";

function App() {
  const { decoded } = useGlobalStore();
  useEffect(() => {
    if (decoded && decoded.role === "ROLE_USER") {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      window.location.reload();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Global />
      <GlobalError />
      <Suspense fallback={<Loading />}>
        <Router />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
