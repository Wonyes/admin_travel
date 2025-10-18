import styled from "styled-components";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { useRoute } from "./useRoute";
import { useOverlay } from "@/hooks/useOverlay";
import { useGlobalStore } from "@/hooks/store/useGlobalStore";

import { useReset } from "@/util/useReset";
import { Login } from "@/components/login/Login";
import { Column } from "@/assets/style/common/useCommonStyle";

const WrapBox = styled.div`
  max-height: 100vh;
  min-height: 100vh;

  display: flex;
  gap: 22px;
  padding: 22px;
  position: relative;
`;

const ScrollArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
    height: 2px;
    margin-left: -10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 999px;
  }
`;

const AsideCompo = React.lazy(() => import("@/components/common/AsideCompo"));
const TitleHeader = React.lazy(() => import("@/components/header/TitleHeader"));

const RouteContent = () => {
  const navigate = useNavigate();

  const { routes } = useRoute();
  const { pathname } = useLocation();
  const { isLogin, decoded } = useGlobalStore();

  const { alertComponent, confirmComponent, modalComponent, toastComponent } = useOverlay();
  const { isResetFunc } = useReset({ pathname });

  useEffect(() => {
    if (!isLogin && pathname !== "/login") navigate("/login");
    if (pathname === "/a.regis" && decoded?.role === "ROLE_GUEST") {
      navigate("/");
    }
  }, [isLogin, pathname, navigate]);

  useEffect(() => {
    isResetFunc();
  }, [pathname]);

  return (
    <>
      {pathname === "/login" ? (
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      ) : (
        <WrapBox>
          <AsideCompo />
          <Column
            $w="100%"
            $gap="16px"
            $over="hidden"
          >
            <TitleHeader />
            <ScrollArea>
              <Routes>
                {routes.map(({ path, component: Component }) => (
                  <Route
                    key={path}
                    path={path}
                    element={<Component />}
                  />
                ))}
              </Routes>
            </ScrollArea>
          </Column>
          {toastComponent}
        </WrapBox>
      )}
      {modalComponent}
      {alertComponent}
      {confirmComponent}
    </>
  );
};

function Router() {
  return (
    <BrowserRouter>
      <RouteContent />
    </BrowserRouter>
  );
}

export default Router;
