import styled, { css } from "styled-components";

import { Row } from "@/assets/style/common/useCommonStyle";

import { CheckButtonProps } from "@/typeing/productInterface";
import { CommonProps } from "@/typeing/styleInterface";

const createCheckBtn = (props: Partial<CommonProps>) => css`
  color: var(--c-subText1);
  font-size: var(--s-subTitle);
  line-height: var(--l-subTitle);

  border-radius: ${props.$radius};
  padding: ${props.$pad ? props.$pad : "12px 26px"};
  width: ${props.$w ? props.$w : "fit-content"};

  white-space: nowrap;

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  &.active {
    background-color: var(--c-blue);
    color: var(--c-white);
  }

  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const CheckBtn = styled.button<Partial<CommonProps>>`
  ${createCheckBtn}
`;

export default function CheckButton({ state, titles, name, setState }: CheckButtonProps) {
  const isSelect = (key: string, state: number) => {
    setState((prevState) => ({ ...prevState, [key]: state }));
  };

  return (
    <Row>
      {titles.slice(0, 3).map((title, index) => (
        <CheckBtn
          name={name}
          key={index}
          className={state === index + 1 ? "active" : ""}
          onClick={() => isSelect(name, index + 1)}
        >
          {title}
        </CheckBtn>
      ))}
    </Row>
  );
}
