import { InfoLineBox, MorphismBox, Row, Text } from "@/assets/style/common/useCommonStyle";

import PasswordChange from "../common/overlay/modal/PasswordChange";

import { WhiteBtn } from "@/hooks/useButton";
import { useOverlay } from "@/hooks/useOverlay";
import { useGlobalStore } from "@/hooks/store/useGlobalStore";
import { useInputStore } from "@/hooks/store/useInputStore";
import { useMutation } from "@tanstack/react-query";
import { Patch } from "@/hooks/api/reactQuery/mutate/useMutations";

export default function Mypage() {
  const { decoded } = useGlobalStore();
  const { openModal, openAlert } = useOverlay();

  const {
    resetInputValues,
    user: { newPassword, newPasswordConfirm },
  } = useInputStore();

  const roleSwicth = (role?: string) => {
    switch (role) {
      case "ROLE_ROOT":
        return "상위 관리자";
      case "ROLE_MANAGE":
        return "하위 관리자";
      default:
        return "관리자";
    }
  };

  const { mutate: passwordChanged } = useMutation({
    mutationFn: () => {
      return Patch({
        url: `admin/password`,
        body: { password: newPassword },
      });
    },
    onSuccess: () => {
      openAlert({
        title: "비밀번호가 변경되었습니다.",
        message: "다시 로그인 해주세요.",
        mainBtn: "확인",
        onFunc: () => {
          localStorage.removeItem("access-token");
          localStorage.removeItem("refresh-token");
          window.location.href = "/login";
        },
      });
    },
  });

  const passwordChange = () => {
    resetInputValues();

    openModal({
      subBtn: "닫기",
      mainBtn: "변경 완료",
      title: "비밀번호 변경",
      content: <PasswordChange />,
      onFunc: () => {
        if (newPassword !== newPasswordConfirm) {
          openAlert({
            title: "비밀번호가 일치하지 않습니다.",
            message: "비밀번호를 확인해주세요.",
            mainBtn: "확인",
          });
          return false;
        }

        passwordChanged();
      },
    });
  };

  return (
    <MorphismBox $h="fit-content">
      <Row
        $gap="14px"
        $pad="0 0 20px"
      >
        <Text $minW="100px">아이디</Text>
        <Text>{decoded?.id}</Text>
      </Row>
      <InfoLineBox>
        <Text $minW="100px">비밀번호</Text>
        <WhiteBtn
          msg="비밀번호 변경"
          $pad="4px 12px"
          $w="fit-content"
          onClick={passwordChange}
        />
      </InfoLineBox>
      <InfoLineBox>
        <Text $minW="100px">권한</Text>
        <Text>{roleSwicth(decoded?.role)}</Text>
      </InfoLineBox>
    </MorphismBox>
  );
}
