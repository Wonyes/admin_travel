import styled from "styled-components";

import { Img, MorphismBox, Row } from "@/assets/style/common/useCommonStyle";
import { useImg } from "@/assets/style/common/useImg";

const PagiNum = styled.button`
  border-radius: 4px;

  font-size: var(--s-title);
  font-family: var(--f-title);
  line-height: var(--l-title);

  padding: 4px 12px;

  text-align: center;

  &:first-child,
  &:last-child {
    display: none;
  }
  &.active {
    color: var(--c-white);
    background-color: var(--c-bg);
  }
`;

const PagiButton = styled.button`
  width: 28px;
  height: 28px;

  &:disabled {
    opacity: 0.5;
  }

  &.next {
    transform: rotate(180deg);
  }
`;

interface PagingBodyProps {
  pageNumbers: number[];
  currentPage: number;
  pageData: any;
  onClick: (page: number) => void;
}

export default function PagingBody({
  pageNumbers,
  onClick,
  pageData,
  currentPage,
}: PagingBodyProps) {
  const { pagiicon } = useImg();

  return (
    <MorphismBox
      $h="fit-content"
      $pad="12px"
    >
      <Row
        $gap="8px"
        $jus="center"
        $align="center"
      >
        <PagiButton
          onClick={() => onClick(currentPage - 1)}
          disabled={pageData?.first}
        >
          <Img
            $w="28px"
            $h="28px"
            src={pagiicon}
            alt="pagiicon"
          />
        </PagiButton>
        {pageNumbers.map((data) => (
          <PagiNum
            key={data}
            onClick={currentPage === data - 1 ? () => {} : () => onClick(data - 1)}
            className={data - 1 === pageData?.number && "active"}
          >
            {data}
          </PagiNum>
        ))}

        <PagiButton
          className="next"
          onClick={() => onClick(currentPage + 1)}
          disabled={pageData?.last}
        >
          <Img
            $w="28px"
            $h="28px"
            src={pagiicon}
            alt="pagiicon"
          />
        </PagiButton>
      </Row>
    </MorphismBox>
  );
}
