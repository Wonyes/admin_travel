import React from "react";
import styled from "styled-components";

const CheckInput = styled.input.attrs({ type: "checkbox" }).withConfig({
  shouldForwardProp: (prop) => prop !== "isDefault",
})<{
  isDefault?: boolean;
}>`
  padding: 1px 0 !important;
  width: 24px !important;
  height: 24px !important;
  margin: 0 !important;
  cursor: pointer;

background: url(${(props) => (props.isDefault ? "/check.svg" : "/notcheck.svg")}) no-repeat center;

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[disabled] + label {
    opacity: 0.5;
  }

  &:checked {
    background: url("/check.svg") no-repeat center;
  }
`;

interface BasicCheckProps {
  meaning?: string;
  isDefault?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BasicCheck({ meaning, isDefault, checked, disabled, onChange }: BasicCheckProps) {
  return (
    <>
      <CheckInput
        id={meaning}
        name={meaning}
        checked={checked}
        onChange={onChange}
        disabled={isDefault || disabled}
        isDefault={isDefault}
      />
    </>
  );
}
