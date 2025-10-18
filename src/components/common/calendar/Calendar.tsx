import { useCalendarStore } from "@/hooks/store/useCalendarStore";
import { SelectBox } from "@/assets/style/common/useCommonStyle";
import CalendarBody from "./CalendarBody";
import DateView from "./DateView";

export default function Calendar() {
  const { isCalendarOpen } = useCalendarStore();

  return (
    <SelectBox>
      <DateView />
      {isCalendarOpen && <CalendarBody />}
    </SelectBox>
  );
}
