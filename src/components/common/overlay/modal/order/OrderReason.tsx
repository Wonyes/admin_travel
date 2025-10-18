import DropDown from "@/hooks/DropDown";
import { Column, Text } from "@/assets/style/common/useCommonStyle";

export default function OrderReason({ title, reason }: any) {
  return (
    <Column
      $gap="8px"
      $align="flex-start"
    >
      <Text $class={["subTitle"]}>{title}</Text>
      <DropDown
        name="reason"
        data={reason}
        notSave={true}
      />
      <Text $class={["caption", "red"]}>
        ※ 입력하신 내용은 처리 후 수정이 불가합니다. 정확하게 입력해주세요.
      </Text>
    </Column>
  );
}
