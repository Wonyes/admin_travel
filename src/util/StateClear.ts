import { useCalendarStore } from "@/hooks/store/useCalendarStore";
import { useInputStore } from "@/hooks/store/useInputStore";
import { usePageStore } from "@/hooks/store/usePageStore";
import useQueryString from "@/hooks/useQueryString";

export default function StateClear() {
  const { resetInputValues } = useInputStore();
  const { resetPageParams } = usePageStore();
  const { paramsClear } = useQueryString();
  const { resetToggleCalendar } = useCalendarStore();

  const clear = (data: () => void, page?: any) => {
    resetInputValues();
    resetPageParams();
    paramsClear(page);
    resetToggleCalendar();

    data();

    window.location.reload();
  };
  return { clear };
}
