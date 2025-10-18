import { ReactNode } from "react";
import { CommonProps } from "../typeing/styleInterface";
import styled, { css } from "styled-components";
import { Row } from "../assets/style/common/useCommonStyle";

const createTableHeaders = (props: Partial<CommonProps> = {}) => css`
  background-color: var(--c-input);

  width: ${props.$w ?? "auto"};
  min-width: ${props.$w};
  max-width: ${props.$w};

  white-space: nowrap;

  padding: ${props.$pad};
  height: 48px;

  font-size: var(--s-subText);
  font-family: var(--f-neoSB);
  line-height: var(--l-subText);
  vertical-align: middle;

  border-right: 1px solid rgba(170, 170, 170, 0.4);

  &:first-child {
    border-top-left-radius: 8px;
  }
  &:last-child {
    border-right: none;
    border-top-right-radius: 8px;
  }
`;

const TableHeaders = styled.th<Partial<CommonProps>>`
  ${createTableHeaders}
`;

const TableWrap = styled.table<Partial<CommonProps>>`
  width: ${(props) => props.$w ?? "100%"};
  border-spacing: 0;
  table-layout: fixed;

  text-align: center;
  border-collapse: collapse;

  white-space: nowrap;
  word-break: break-all;

  border-radius: 8px;

  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &.scroll-fix {
    box-shadow: none;
    border-radius: 0;
    border-right: 1px solid rgba(170, 170, 170, 0.4);
    & th {
      &:last-child {
        border-radius: 0;
      }
    }
  }

  &.scroll {
    min-width: max-content;
    border-radius: 0;
    box-shadow: none;

    th:first-child {
      border-radius: 0;
    }
    th:last-child {
      border-radius: 0px 8px 0 0;
    }
  }
`;

const ScrollBox = styled.div`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: -12px;
  border-radius: 0 8px 0 8px;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    height: 4px;
    margin-top: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 999px;
  }

  .scroll {
    width: fit-content;
    min-width: 100%;
  }
`;

interface TableHeaderProps {
  headers: { name: string | ReactNode; w?: string; key: number }[];
  scrollHeaders?: { name: string | ReactNode; w?: string; key: number }[];
}

interface TableProps extends TableHeaderProps {
  tableW?: string;
  children: ReactNode;
  className?: string;
}

interface ScrollTableProps extends Omit<TableProps, "children"> {
  scrollHeaders: TableHeaderProps["headers"];
  fixedRows: ReactNode;
  scrollRows: ReactNode;
}

const TableHeader = ({ headers }: TableHeaderProps) => {
  return (
    <thead>
      <tr>
        {headers.map(({ name, w, key }) => (
          <TableHeaders
            $w={w}
            key={key}
          >
            {name}
          </TableHeaders>
        ))}
      </tr>
    </thead>
  );
};

const BaseTable = ({ className, tableW, headers, children }: TableProps) => (
  <TableWrap
    $w={tableW}
    className={className}
  >
    <TableHeader headers={headers} />
    <tbody>{children}</tbody>
  </TableWrap>
);

export function Table(props: TableProps) {
  return <BaseTable {...props} />;
}

export function ScrollTable({
  tableW,
  headers,
  scrollHeaders,
  fixedRows,
  scrollRows,
}: ScrollTableProps) {
  const horiziontalWhell = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

  return (
    <Row
      $w="100%"
      $radius="8px"
      $position="relative"
      $shadow="0 2px 20px rgba(0, 0, 0, 0.1);"
    >
      {/* 고정되는 테이블 */}
      <Row $flex="1 1">
        <BaseTable
          className="scroll-fix"
          tableW={tableW}
          headers={headers}
        >
          {fixedRows}
        </BaseTable>
      </Row>

      {/* 스크롤되는 테이블 */}
      <ScrollBox onWheel={horiziontalWhell}>
        <BaseTable
          className="scroll"
          headers={scrollHeaders}
        >
          {scrollRows}
        </BaseTable>
      </ScrollBox>
    </Row>
  );
}
