import styled from "styled-components";

import useDataFilterLogic, { DateFilterType } from "@/hooks/date/useDataFilterLogic";

const FilterWrap = styled.ul`
  display: flex;
  align-items: center;

  background: var(--c-white);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 240px;
  min-width: 240px;
  width: 100%;
`;

const FilterList = styled.li`
  border: 1px solid var(--c-input);
  border-right: 0;
  background-color: var(--c-white);

  padding: 10px 12px;
  width: 100%;
  white-space: nowrap;

  font-size: var(--s-subText);
  font-family: var(--f-subText);
  line-height: var(--l-subText);

  cursor: pointer;
  text-align: center;

  &.active + li {
    border-left: 0;
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-right: 1px solid var(--c-input);
  }

  &.active {
    color: var(--c-blue);
    border: 1px solid var(--c-blue);
  }
`;

const FILTER_LIST: DateFilterType[] = ["오늘", "일주일", "1개월", "3개월"];

export default function DateFilter() {
  const { isDateActive, handleDateFilter } = useDataFilterLogic();

  return (
    <FilterWrap>
      {FILTER_LIST.map((filter) => (
        <FilterList
          key={filter}
          className={isDateActive(filter) ? "active" : ""}
          onClick={() => handleDateFilter(filter)}
        >
          {filter}
        </FilterList>
      ))}
    </FilterWrap>
  );
}
