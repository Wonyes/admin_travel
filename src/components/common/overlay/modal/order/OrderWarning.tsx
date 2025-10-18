import { Img, MorphismBox, Row, Text } from "@/assets/style/common/useCommonStyle";
import { useImg } from "@/assets/style/common/useImg";

interface wariningProps {
  message: string;
  key: number;
}
interface OrderWarningProps {
  warningMessage?: wariningProps[];
}

export default function OrderWarning({ warningMessage = [] }: OrderWarningProps) {
  const { textpoint } = useImg();

  return (
    <MorphismBox
      $pad="12px"
      $radius="4px"
    >
      {warningMessage &&
        warningMessage.map(({ message, key }) => (
          <Row
            key={key}
            $gap="8px"
            $align="flex-start"
          >
            <Img
              $h="18px"
              $w="18px"
              src={textpoint}
              alt="text-point"
            />
            <Text $tAlign="left">{message}</Text>
          </Row>
        ))}
    </MorphismBox>
  );
}
