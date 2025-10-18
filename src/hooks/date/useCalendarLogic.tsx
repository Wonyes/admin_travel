import { useEffect } from "react";
import styled from "styled-components";
import { format, parseISO } from "date-fns";
import { useCalendarStore } from "../store/useCalendarStore";
import { MonthConstant } from "@/constant/useMonth";
import useQueryString from "../useQueryString";

interface CalendarTDProps {
  $disabled?: boolean;
}

const CalendarTD = styled.td<CalendarTDProps>`
  font-size: var(--s-subText);

  color: var(--c-black);
  width: 40px;
  height: 40px;

  vertical-align: middle;
  border: none;
  text-align: center;
  cursor: initial;

  &:not(.weekly):hover {
    cursor: pointer;
  }

  &.sunday {
    color: var(--c-red);
  }
  &.saturday {
    color: var(--c-main);
  }

  &.impossible_select:hover {
    background-color: transparent;
  }

  &.impossible_select div {
    color: var(--c-line);
    cursor: none;
  }

  &.in-range {
    background: var(--c-input);
  }
  &.in-range.start-date {
    border-radius: 8px 0 0 8px;
  }
  &.in-range.end-date {
    border-radius: 0 8px 8px 0;
  }

  ${({ $disabled }) =>
    $disabled &&
    `
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  `}
`;

const Table = styled.table`
  border-spacing: 0;
  table-layout: fixed;
`;

const Day = styled.div`
  font-family: var(--f-text);
  font-size: var(--s-text);
  line-height: var(--l-text);
  width: 40px;
  height: 40px;
  min-width: 40px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  &.start-date,
  &.end-date {
    background-color: var(--c-blue);
    color: var(--c-white);
    border-radius: 8px !important;
  }
`;

export const useCalendarLogic = () => {
  const { setParams, getParams } = useQueryString();
  const { today, currentDate, setStartDate, startDate, endDate, setEndDate, dateClick } =
    useCalendarStore();
  const params = getParams();

  useEffect(() => {
    if (params.startDate) {
      setStartDate(parseISO(params.startDate));
    }
    if (params.endDate) {
      setEndDate(parseISO(params.endDate));
    }
  }, [setStartDate, setEndDate]);

  useEffect(() => {
    if (startDate) {
      setParams({
        startDate: startDate ? format(startDate, "yyyy-MM-dd") : "",
      });
    }
    if (startDate && endDate) {
      setParams({
        startDate: startDate ? format(startDate, "yyyy-MM-dd") : "",
        endDate: endDate ? format(endDate, "yyyy-MM-dd") : "",
      });
    }
  }, [startDate, endDate]);

  // 날짜 정보 계산
  const getDateInfo = () => {
    const firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return {
      daysInMonth: lastDate.getDate(),
      firstDayOfWeek: firstDate.getDay(),
    };
  };

  //  날짜 상태 체크
  const getDateStatus = (date: Date) => {
    const formatted = format(date, "yyyy-MM-dd");
    return {
      isFuture: currentDate < date,
      isEndDate: endDate && format(endDate, "yyyy-MM-dd") === formatted,
      isStartDate: startDate && format(startDate, "yyyy-MM-dd") === formatted,
      isInRange:
        startDate &&
        endDate &&
        ((date >= startDate && date <= endDate) || (date >= endDate && date <= startDate)),
    };
  };

  const getDateClasses = (dateStatus: {
    isFuture: boolean;
    isStartDate: boolean | null;
    isEndDate: boolean | null;
    isInRange: boolean | null;
  }) => {
    const classNames = [];
    const rangeClassed = [];

    if (dateStatus.isFuture) classNames.push("impossible_select");
    if (dateStatus.isStartDate) classNames.push("start-date");
    if (dateStatus.isEndDate) classNames.push("end-date");
    if (dateStatus.isInRange) rangeClassed.push("in-range");

    return `${rangeClassed.join(" ")} ${classNames.join(" ")}`;
  };

  const createWeekRow = (week: number, startDate: number, firstDayOfWeek: number) => {
    const row = [];
    let datesAdded = 0;

    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      if (week === 0 && dayOfWeek < firstDayOfWeek) {
        row.push(<td key={`empty-${week}-${dayOfWeek}`} />);
        continue;
      }

      const currentDate = startDate + datesAdded;
      const date = new Date(today.getFullYear(), today.getMonth(), currentDate);

      if (currentDate > getDateInfo().daysInMonth) {
        row.push(<td key={`empty-${week}-${dayOfWeek}`} />);
        continue;
      }

      const dateStatus = getDateStatus(date);
      const classes = getDateClasses(dateStatus);

      row.push(
        <CalendarTD
          key={`day-${currentDate}`}
          className={classes}
          onClick={() => dateClick(currentDate)}
          $disabled={dateStatus.isFuture}
        >
          <Day className={`day_select ${classes}`}>{currentDate}</Day>
        </CalendarTD>
      );

      datesAdded++;
    }

    return {
      element: <tr key={`week-${week}`}>{row}</tr>,
      datesAdded,
    };
  };

  //  달력 생성 로직
  const createCalendar = () => {
    let calendarDate = 1;
    const calendarRows = [];
    const { daysInMonth, firstDayOfWeek } = getDateInfo();

    for (let week = 0; calendarDate <= daysInMonth; week++) {
      const row = createWeekRow(week, calendarDate, firstDayOfWeek);
      calendarDate += row.datesAdded;
      calendarRows.push(row.element);
    }

    return (
      <Table>
        <thead>
          <tr>
            <CalendarTD className="sunday weekly">일</CalendarTD>
            <CalendarTD className="weekly">월</CalendarTD>
            <CalendarTD className="weekly">화</CalendarTD>
            <CalendarTD className="weekly">수</CalendarTD>
            <CalendarTD className="weekly">목</CalendarTD>
            <CalendarTD className="weekly">금</CalendarTD>
            <CalendarTD className="saturday weekly">토</CalendarTD>
          </tr>
        </thead>
        <tbody>{calendarRows}</tbody>
      </Table>
    );
  };

  // date range 표시
  const getFormattedDateRange = () => {
    if (startDate && endDate) {
      return startDate < endDate
        ? `${format(startDate, "yyyy-MM-dd")} ~ ${format(endDate, "yyyy-MM-dd")}`
        : `${format(endDate, "yyyy-MM-dd")} ~ ${format(startDate, "yyyy-MM-dd")}`;
    }

    return startDate
      ? format(startDate, "yyyy-MM-dd")
      : endDate
      ? format(endDate, "yyyy-MM-dd")
      : "";
  };

  // 달 이동
  const getMonthCalculation = () => {
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

    return { nextMonth, prevMonth };
  };

  // 현재 달 표시
  const getCurrentMonth = () => {
    const months = MonthConstant.map((month, index) => ({
      [`month${index + 1}`]: month,
    }));

    const currentMonthArr = months[today.getMonth()];
    return currentMonthArr[`month${today.getMonth() + 1}`];
  };

  return {
    getFormattedDateRange,
    createCalendar,
    getDateStatus,
    getDateInfo,
    ...getMonthCalculation(),
    currentMonth: getCurrentMonth(),
  };
};
