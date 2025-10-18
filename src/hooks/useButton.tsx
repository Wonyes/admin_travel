import { CommonProps } from "@/typeing/styleInterface";
import styled, { css } from "styled-components";

interface ButtonProps<T = unknown> extends Partial<CommonProps> {
  msg?: string;
  state?: T;
  onClick?: (state: T) => void;
  disabled?: boolean;
  className?: string;
}

const createButton = (props: Partial<CommonProps>) => css`
  background-color: ${props.$backColor};

  color: ${props.$color};
  padding: ${props.$pad ? props.$pad : "12px 20px"};

  white-space: nowrap;
  width: ${props.$w ? props.$w : "100%"};
  height: ${props.$h ? props.$h : "fit-content"};

  text-align: ${props.$tAlign ?? "center"};
  font-size: ${props.$size ?? "var(--s-subTitle)"};
  line-height: ${props.$line ?? "var(--l-subTitle)"};
  font-family: ${props.$font ?? "var(--f-subTitle)"};

  border-radius: 6px;
  border: ${props.$bor ?? "none"};
  cursor: ${props.$cursor};

  &:disabled {
    opacity: 0.5;
  }
`;

const ColorButton = styled.button<Partial<CommonProps>>`
  ${createButton}
`;

export function BlueBtn({ msg, onClick, disabled, className, ...styleProps }: ButtonProps) {
  return (
    <ColorButton
      className={className ? className : "morphism"}
      $backColor="var(--c-blue)"
      $color="var(--c-white)"
      onClick={onClick}
      disabled={disabled}
      {...styleProps}
    >
      {msg}
    </ColorButton>
  );
}

export function WhiteBtn({ msg, onClick, disabled, className, ...styleProps }: ButtonProps) {
  return (
    <ColorButton
      className={className ? className : "morphism"}
      $backColor="var(--c-white)"
      $color="var(--c-black)"
      onClick={onClick}
      disabled={disabled}
      {...styleProps}
    >
      {msg}
    </ColorButton>
  );
}

export function RedBtn({ msg, onClick, disabled, className, ...styleProps }: ButtonProps) {
  return (
    <ColorButton
      className={className ? className : "morphism"}
      $backColor="var(--c-red)"
      $color="var(--c-white)"
      onClick={onClick}
      disabled={disabled}
      {...styleProps}
    >
      {msg}
    </ColorButton>
  );
}

export function LineBtn({ msg, onClick, disabled, className, ...styleProps }: ButtonProps) {
  {
    return (
      <ColorButton
        className={className ? className : "morphism"}
        $color="var(--c-blue)"
        $backColor="var(--c-white)"
        $bor="1px solid var(--c-blue)"
        $shadow="none"
        onClick={onClick}
        disabled={disabled}
        {...styleProps}
      >
        {msg}
      </ColorButton>
    );
  }
}
