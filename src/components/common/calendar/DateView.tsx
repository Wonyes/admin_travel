import { Img, Row, Text } from "@/assets/style/common/useCommonStyle";
import { useImg } from "@/assets/style/common/useImg";
import { useCalendarLogic } from "@/hooks/date/useCalendarLogic";
import { useCalendarStore } from "@/hooks/store/useCalendarStore";

export default function DateView() {
  const { getFormattedDateRange } = useCalendarLogic();
  const { toggleCalendar } = useCalendarStore();
  const { calendar } = useImg();
  return (
    <Row
      $gap="8px"
      $align="center"
      $cursor="pointer"
      onClick={toggleCalendar}
    >
      <Img
        $w="20px"
        $h="20px"
        src={calendar}
        alt="calendar"
      />
      <Text $color="var(--c-line)">-</Text>
      <Text $class="subText">{getFormattedDateRange()}</Text>
    </Row>
  );
}
