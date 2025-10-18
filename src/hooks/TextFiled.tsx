import { Column } from "../assets/style/common/useCommonStyle";
import styled from "styled-components";
import ErrorMessage from "./ErrorMessage";
import { useErrorStore } from "./store/useErrorStore";
import { useTextStore } from "./store/useTextStore";

interface TextFiledProps {
  id?: string;
  name: string;
  value?: string;
  title?: string;
  place?: string;
  h?: string;
}

const TextFiledBox = styled.div<{ $h?: string }>`
  padding: 12px 20px;

  height: ${({ $h }) => $h ?? "200px"};

  max-height: 200px;
  border-radius: 4px;

  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border-radius: 8px;

  border: none;
  resize: none;
  background-color: transparent;

  color: var(--c-black);
  font-size: var(--s-subText);
  line-height: var(--l-subText);
  font-family: var(--f-subText);

  &::placeholder {
    color: var(--c-subText1);
    font-size: var(--s-subText);
    line-height: var(--l-subText);
    font-family: var(--f-subText);
  }
`;

export default function TextFiled({ name, place, value, h }: TextFiledProps) {
  const { validateField } = useErrorStore();
  const { textChange } = useTextStore();
  return (
    <Column
      $gap="8px"
      $w="100%"
    >
      <TextFiledBox $h={h}>
        <TextArea
          id={name}
          name={name}
          value={value}
          placeholder={place}
          onChange={textChange}
          onBlur={(e) => validateField(name, e.target.value)}
        />
      </TextFiledBox>
      <ErrorMessage name={name} />
    </Column>
  );
}
