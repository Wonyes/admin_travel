import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Column, Row, Text } from "@/assets/style/common/useCommonStyle";

import Input from "@/hooks/Input";
import { useImg } from "@/assets/style/common/useImg";
import { BlueBtn } from "@/hooks/useButton";

import { useInputStore } from "@/hooks/store/useInputStore";
import { useGlobalStore } from "@/hooks/store/useGlobalStore";

import { useOverlay } from "@/hooks/useOverlay";
import { Post } from "@/hooks/api/reactQuery/mutate/useMutations";
import { useMutation } from "@tanstack/react-query";

const LoginWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  padding: 0 40px;

  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 480px;
  text-align: center;
  border-radius: 16px;
  align-content: center;
  background-color: var(--c-white);
`;

const Logo = styled.img`
  width: 100%;
  height: 32px;
`;

export function Login() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { logo } = useImg();

  const { openAlert } = useOverlay();
  const { setIsLogin } = useGlobalStore();
  const {
    user: { id, password },
  } = useInputStore();

  const { mutate: isLogin } = useMutation({
    mutationFn: () => {
      return Post({
        url: "admin/login",
        body: {
          id: id,
          password: password,
        },
      });
    },
    onSuccess: (res) => {
      const accessToken = res.headers["authorization"];
      const refreshToken = res.headers["refresh"];

      if (accessToken && refreshToken) {
        setIsLogin(true);
        localStorage.setItem("access-token", accessToken);
        localStorage.setItem("refresh-token", refreshToken);

        navigate("/");
        if (pathname !== "login") window.location.reload();
      } else {
        openAlert({
          title: "로그인에 실패하였습니다",
          message: "아이디 또는 비밀번호를 확인해 주세요.",
          mainBtn: "확인",
        });
        return false;
      }
    },
    onError: (err) => {
      if (err)
        openAlert({
          title: "로그인에 실패하였습니다",
          message: "아이디 또는 비밀번호를 확인해 주세요.",
          mainBtn: "확인",
        });
    },
  });

  const login = () => {
    const ID_MIN_LENGTH = 1;
    const ID_MAX_LENGTH = 14;

    const PASS_MIN_LENGTH = 4;
    const PASS_MAX_LENGTH = 16;

    if (id.length < ID_MIN_LENGTH || id.length > ID_MAX_LENGTH) {
      openAlert({
        title: "로그인에 실패하였습니다",
        message: "아이디를 확인해 주세요",
        mainBtn: "확인",
      });
      return;
    }
    if (password.length < PASS_MIN_LENGTH || password.length > PASS_MAX_LENGTH) {
      openAlert({
        title: "로그인에 실패하였습니다",
        message: "비밀번호를 확인해 주세요",
        mainBtn: "확인",
      });
      return;
    }

    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");

    isLogin();
  };

  return (
    <LoginWrap>
      <LoginBox>
        <Logo
          src={logo}
          alt="logo"
        />

        <Column
          $gap="16px"
          $pad="32px 0 0"
        >
          <Column
            as="form"
            $gap="8px"
          >
            <Input
              name="id"
              type="text"
              $maxW="100%"
              place="아이디"
              value={id}
              onEnter={() => login()}
            />
            <Input
              $maxW="100%"
              type="password"
              place="비밀번호"
              name="password"
              value={password}
              onEnter={() => login()}
            />
          </Column>
          <BlueBtn
            msg="로그인"
            onClick={() => login()}
          />
        </Column>
        <Text>게스트 로그인</Text>
        <Row
          $gap="8px"
          $jus="center"
          $align="center"
        >
          <Text $class="blue">아이디 : guest</Text>
          <Text $class="blue">비밀번호 : 1111</Text>
        </Row>
      </LoginBox>
    </LoginWrap>
  );
}
