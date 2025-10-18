import { Column, Text } from "@/assets/style/common/useCommonStyle";
import { useTextStore } from "@/hooks/store/useTextStore";
import TextFiled from "@/hooks/TextFiled";

export default function RejectFiled() {
  const { orderReject } = useTextStore();
  return (
    <Column
      $gap="8px"
      $align="flex-start"
    >
      <Text>반품 철회 사유</Text>
      <TextFiled
        h="150px"
        name="orderReject"
        value={orderReject}
        place="반품 철회 사유를 입력해주세요. (필수)"
      />
      <Text $class={["captionB", "red"]}>
        ※ 입력하신 내용은 처리 후 수정이 불가합니다. 정확하게 입력해주세요.
      </Text>
    </Column>
  );
}
