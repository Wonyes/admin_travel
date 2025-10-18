import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { MorphismBox, Row, Text, InfoLineBox } from "@/assets/style/common/useCommonStyle";

import { WhiteBtn } from "@/hooks/useButton";

import Input from "@/hooks/Input";
import { useOverlay } from "@/hooks/useOverlay";
import { Patch } from "@/hooks/api/reactQuery/mutate/useMutations";

export default function AdminModify() {
  const navigate = useNavigate();
  const { id, no } = useParams();
  const { openConfirm, openAlert } = useOverlay();

  const { mutate: patchPassword } = useMutation({
    mutationFn: () => {
      return Patch({
        url: `admin/reset-password/${no}`,
      });
    },
    onSuccess: () => {
      openAlert({
        title: "비밀번호가 초기화되었습니다.",
        message: "초기 비밀번호는 1111입니다.",
        mainBtn: "확인",
        onFunc: () => navigate("/a.inquiry"),
      });
    },
  });

  const passwordConfirm = () => {
    openConfirm({
      title: "비밀번호를 초기화하시겠습니까?",
      message: "비밀번호가 1111로 변경됩니다.",
      subBtn: "취소",
      mainBtn: "초기화 하기",
      onFunc: () => patchPassword(),
    });
  };

  return (
    <MorphismBox $h="auto">
      <Row
        $align="flex-start"
        $pad="0 0 28px"
      >
        <Text $minW="200px">아이디</Text>
        <Input
          $maxW="320px"
          place={id}
          disabled
        />
      </Row>
      <InfoLineBox>
        <Row $align="flex-start">
          <Text $minW="200px">비밀번호</Text>
          <WhiteBtn
            onClick={passwordConfirm}
            $pad="4px 12px"
            msg="비밀번호 초기화"
          />
        </Row>
      </InfoLineBox>
    </MorphismBox>
  );
}
