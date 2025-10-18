import Input from "@/hooks/Input";

import { useInputStore } from "@/hooks/store/useInputStore";
import { Column, Text } from "@/assets/style/common/useCommonStyle";

export default function PasswordChange() {
  const {
    user: { newPassword, newPasswordConfirm },
  } = useInputStore();

  return (
    <Column
      $gap="8px"
      $align="flex-start"
    >
      <Text>새 비밀번호</Text>
      <Input
        $maxW="100%"
        type="password"
        name="newPassword"
        layoutType="password"
        value={newPassword}
        place="비밀번호를 입력해주세요."
      />
      <Text>비밀번호 확인</Text>
      <Input
        $maxW="100%"
        type="password"
        layoutType="password"
        name="newPasswordConfirm"
        value={newPasswordConfirm}
        place="비밀번호를 입력해주세요."
      />
      <Column $align="flex-start">
        <Text $class="captionB">4~12자 이내로 입력해 주세요.</Text>
        <Text $class="captionB">영어, 숫자를 입력해 주세요.</Text>
        <Text $class="captionB">한글, 특수문자 입력시 입력이 되지 않습니다.</Text>
      </Column>
    </Column>
  );
}
