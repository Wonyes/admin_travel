import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { CommonProps } from "../typeing/styleInterface";
import { Column, Img } from "../assets/style/common/useCommonStyle";
import { useErrorStore } from "./store/useErrorStore";
import ErrorMessage from "./ErrorMessage";
import { useInputStore } from "./store/useInputStore";
import { useImg } from "../assets/style/common/useImg";
import useQueryString from "./useQueryString";

const createInput = (props: Partial<CommonProps> = {}) => css`
  width: 100%;
  text-align: ${props.$tAlign};
  height: fit-content;
  background-color: transparent;
  padding: 0;
  font-family: ${props.$font};
  font-size: ${props.$size ?? "var(--s-sub)"};
  color: var(--c-black);

  &::placeholder {
    color: ${props.$placeColor || "var(--c-subText1)"};
  }

  max-width: ${props.$maxW};

  outline: none;
  border: none !important;
`;

const Inputs = styled.input`
  ${createInput}
`;

const createInputBox = (props: Pick<CommonProps, "$gap" | "$maxW" | "$jus"> = {}) => css`
  gap: ${props.$gap};
  max-width: ${props.$maxW ?? "240px"};
  min-width: 240px;

  padding: 12px 20px;
  border-radius: 8px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: ${props.$jus};

  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const InputBox = styled.div<Pick<CommonProps, "$gap" | "$maxW" | "$jus">>`
  ${createInputBox}
`;

interface InputProps {
  $gap?: string;
  $maxW?: string;
  name?: string;
  type?: string;
  value?: string | number;
  place?: string;
  disabled?: boolean;
  layoutType?: string;
  onEnter?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  $gap,
  $maxW,
  name,
  type,
  value,
  place,
  disabled,
  onEnter,
  layoutType,
  ...styleProps
}: InputProps) {
  const { pass_close } = useImg();
  const { getParams } = useQueryString();
  const { inputChange } = useInputStore();
  const { validateField } = useErrorStore();
  const [typeChange, setTypeChange] = useState(false);

  const params = getParams();

  const onTypeChange = () => {
    setTypeChange(!typeChange);
  };

  const onEnterKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && onEnter) {
      onEnter();
    }
  };

  useEffect(() => {
    const paramValue = params.search;
    if (paramValue !== undefined && (value === undefined || value === "")) {
      inputChange({
        target: {
          name: name ?? "",
          value: paramValue,
        } as EventTarget & HTMLInputElement,
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [params[name]]);

  return (
    <Column
      $w={"100%"}
      $maxW={$maxW}
      $align="flex-start"
      $gap="8px"
    >
      <InputBox
        $gap={$gap}
        $maxW={$maxW}
        $jus={layoutType === "password" && "space-between"}
      >
        <Inputs
          type={typeChange ? "text" : type ?? "text"}
          name={name ?? ""}
          value={value !== undefined && value !== "" ? value : params[name] ?? ""}
          disabled={disabled}
          onBlur={(e) => validateField(name, e.target.value)}
          onKeyDown={onEnterKeydown}
          onChange={(e) => {
            inputChange(e);
          }}
          placeholder={place}
          {...styleProps}
        />
        {layoutType === "password" && (
          <Img
            alt="close"
            $cursor="pointer"
            src={pass_close}
            onClick={onTypeChange}
          />
        )}
      </InputBox>
      {name && <ErrorMessage name={name} />}
    </Column>
  );
}
