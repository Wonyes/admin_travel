import { Text } from "@/assets/style/common/useCommonStyle";

interface SubTitleProps {
  title?: string;
  pad?: string;
  color?: string;
}

export default function SubTitle({ title, pad, color }: SubTitleProps) {
  return (
    <Text
      as="h2"
      $class="title"
      $pad={pad ? pad : "0 0 22px"}
      $color={color ? color : "var(--c-black)"}
    >
      {title}
    </Text>
  );
}
