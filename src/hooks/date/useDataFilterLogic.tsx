import { format } from "date-fns";
import { useCalendarStore } from "../store/useCalendarStore";

export type DateFilterType = "오늘" | "일주일" | "1개월" | "3개월";

export default function useDataFilterLogic() {
  const { startDate, setStartDate, endDate, setEndDate } = useCalendarStore();
  const MAX_DATE = new Date(2025, 0, 1);

  const calculateDateRange = (filter: DateFilterType) => {
    const today = new Date();
    let start = new Date(today);
    const end = new Date(today);

    switch (filter) {
      case "오늘":
        break;
      case "일주일":
        start.setDate(today.getDate() - 6);
        break;
      case "1개월":
        start.setMonth(today.getMonth() - 1);
        break;
      case "3개월":
        start.setMonth(today.getMonth() - 3);
        break;
    }

    if (start < MAX_DATE) {
      start = new Date(MAX_DATE);
    }

    return { startDate: start, endDate: end };
  };

  const isDateActive = (filter: DateFilterType): boolean => {
    if (!startDate || !endDate) return false;

    const { startDate: calculatedStart, endDate: calculatedEnd } = calculateDateRange(filter);

    const formatStartDate = format(startDate, "yyyy-MM-dd");
    const formatEndDate = format(endDate, "yyyy-MM-dd");
    const formatCalculatedStart = format(calculatedStart, "yyyy-MM-dd");
    const formatCalculatedEnd = format(calculatedEnd, "yyyy-MM-dd");

    return formatStartDate === formatCalculatedStart && formatEndDate === formatCalculatedEnd;
  };

  const handleDateFilter = (filter: DateFilterType): void => {
    const { startDate: newStartDate, endDate: newEndDate } = calculateDateRange(filter);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return {
    calculateDateRange,
    isDateActive,
    handleDateFilter,
  };
}
