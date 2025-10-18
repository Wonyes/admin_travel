import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import {
  Column,
  Img,
  MorphismBox,
  RegisTitle,
  Row,
  Text,
} from "@/assets/style/common/useCommonStyle";

import Input from "@/hooks/Input";
import { BlueBtn } from "@/hooks/useButton";
import { useImg } from "@/assets/style/common/useImg";
import { useInputStore } from "@/hooks/store/useInputStore";

import { useOverlay } from "@/hooks/useOverlay";
import { useErrorStore } from "@/hooks/store/useErrorStore";
import { useAdminExist } from "@/hooks/api/reactQuery/query/useAdmin";
import { Post } from "@/hooks/api/reactQuery/mutate/useMutations";

export default function AdminRegis() {
  const { required } = useImg();
  const { openAlert } = useOverlay();
  const {
    user: { adminID },
  } = useInputStore();
  const navigate = useNavigate();

  const { validateForm } = useErrorStore();
  const { data: adminExist, refetch: checkAdminExist } = useAdminExist({ id: adminID });

  const existId = () => {
    const validationValues = {
      adminID: adminID,
    };

    const isValid = validateForm(validationValues);
    if (!isValid) {
      return openAlert({
        title: "운영자등록에 실패하였습니다.",
        message: "필수항목을 확인해주세요.",
        mainBtn: "확인",
      });
    }

    // 중복 확인 요청 실행
    checkAdminExist()
      .then((res) => {
        if (res.data === false) {
          openAlert({
            title: "사용 가능한 아이디입니다.",
            mainBtn: "확인",
          });
        } else {
          openAlert({
            title: "중복된 아이디입니다.",
            message: "다른 아이디를 입력해주세요.",
            mainBtn: "확인",
          });
        }
      })
      .catch(() => {
        openAlert({
          title: "중복 확인에 실패하였습니다.",
          message: "다시 시도해주세요.",
          mainBtn: "확인",
        });
      });
  };

  const { mutate: registerAdmin } = useMutation({
    mutationFn: () => {
      return Post({
        url: "/admin/register",
        body: {
          id: adminID,
        },
      });
    },
    onSuccess: () => {
      openAlert({
        title: "관리자 등록이 완료되었습니다.",
        message: "관리자목록으로 이동합니다.",
        mainBtn: "확인",
        onFunc: () => navigate("/a.inquiry"),
      });
    },
    onError: () => {
      openAlert({
        title: "운영자등록에 실패하였습니다.",
        message: "다시 시도해주세요.",
        mainBtn: "확인",
      });
    },
  });

  const regisID = () => {
    registerAdmin();
  };

  return (
    <Column
      $h="100%"
      $jus="space-between"
    >
      <MorphismBox $h="fit-content">
        <Row $align="flex-start">
          <RegisTitle>
            <Text>아이디</Text>
            <Img
              $w="16px"
              $h="16px"
              src={required}
              alt="required"
            />
          </RegisTitle>
          <Column
            $gap="6px"
            $w="100%"
          >
            <Row $gap="12px">
              <Input
                $maxW="320px"
                name="adminID"
                value={adminID}
                place="아이디를 입력해주세요"
              />
              <BlueBtn
                msg={"중복확인"}
                $w="fit-content"
                onClick={existId}
              />
            </Row>
            <Text $class="caption">1~14자 이내로 입력해주세요.</Text>
            <Text $class="caption">영어,숫자만 사용 가능합니다.</Text>
            <Text $class="caption">초기 비밀번호는 1111 입니다.</Text>
          </Column>
        </Row>
      </MorphismBox>
      <MorphismBox $h="auto">
        <BlueBtn
          msg="등록"
          onClick={regisID}
          disabled={adminExist === undefined || adminExist === true}
        />
      </MorphismBox>
    </Column>
  );
}
