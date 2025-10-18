import { Row, Text } from "@/assets/style/common/useCommonStyle";

export default function NoItem({ text }: { text?: string }) {
  return (
    <Row
      $w="100%"
      $pad="60px 0"
      $jus="center"
      $align="center"
    >
      <Text $class={["title", "subText3"]}>{text ?? "검색 결과가 없습니다."}</Text>
    </Row>
  );
}
