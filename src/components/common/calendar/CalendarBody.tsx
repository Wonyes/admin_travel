import { Between, Column, Row, Text } from "@/assets/style/common/useCommonStyle";
import { BlueBtn, WhiteBtn } from "@/hooks/useButton";
import { useCalendarStore } from "@/hooks/store/useCalendarStore";
import styled from "styled-components";
import { useCalendarLogic } from "@/hooks/date/useCalendarLogic";
import { useImg } from "@/assets/style/common/useImg";

const CalendarBox = styled.div`
  padding: 20px;
  border-radius: 8px;
  background: var(--c-white);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  z-index: 999;
`;

const CalendarMonthMove = styled.div<{ sidearrow: string }>`
  background: url(${(props) => props.sidearrow}) no-repeat center;
  width: 24px;
  height: 24px;

  &:hover {
    background-color: var(--c-input);
    border-radius: 4px;
  }

  &.prev-month {
    rotate: 180deg;
  }
  &.not-found-day:hover {
    background-color: transparent;
  }
  &.not-found-day {
    cursor: initial;
    opacity: 0.5;
  }
`;

export default function CalendarBody() {
  const { sidearrow } = useImg();
  const { nextMonth, prevMonth, currentMonth, createCalendar } = useCalendarLogic();
  const { today, toggleCalendar, moveMonth, defaultDate, currentDate } = useCalendarStore();

  return (
    <CalendarBox>
      <Column $gap="16px">
        <Between>
          <Text
            className="month"
            key={currentMonth.id}
            $class="title"
          >
            {`${today.getFullYear()}년 ${currentMonth.name}`}
          </Text>
          <Row
            $gap="8px"
            $align="center"
          >
            <CalendarMonthMove
              className={`prev-month ${prevMonth >= defaultDate ? "" : "not-found-day"}`}
              onClick={() => moveMonth("prev")}
              sidearrow={sidearrow}
            />
            <CalendarMonthMove
              className={`next-month ${nextMonth <= currentDate ? "" : "not-found-day"}`}
              sidearrow={sidearrow}
              onClick={() => moveMonth("next")}
            />
          </Row>
        </Between>
        <Row $gap="8px">
          {createCalendar()}
          <WhiteBtn
            msg="닫기"
            $h="auto"
            onClick={toggleCalendar}
          />
          <BlueBtn
            $w="65px"
            $h="auto"
            msg="적용"
            onClick={toggleCalendar}
          />
        </Row>
      </Column>
    </CalendarBox>
  );
}
