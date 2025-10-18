import React from "react";
import styled, { keyframes } from "styled-components";
import { Column, Row, Text } from "@/assets/style/common/useCommonStyle";

const dimFadeIn = keyframes`
  0% {
    opacity: 0;
    display: none;
  }

  100% {
    opacity: .6;
    display: flex;
  }
`;

const dimFadeOut = keyframes`
 0% {
  opacity: .6;
  display: flex
;
}
100% {
  opacity: 0;
  display: none;
}
`;

const overlayFadeIn = keyframes`
  0% {
    opacity: 0;
    display: none;
  }

  100% {
    opacity: 1;
    display: flex;
  }
`;

const overlayFadeOut = keyframes`
 0% {
  opacity: 1;
  display: flex
;
}
100% {
  opacity: 0;
  display: none;
}
`;

const Dimmed = styled.div`
  background-color: var(--c-black);
  z-index: 9990;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  animation: 0.5s forwards ${dimFadeOut};
  display: none;

  &.active {
    justify-content: center;
    align-items: center;
    display: flex;

    animation: 0.5s forwards ${dimFadeIn};
  }
`;

const DimmedBox = styled.div`
  display: none;
  padding: 16px;
  height: fit-content;

  z-index: 9999;
  border-radius: 8px;
  background: var(--c-white);
  box-shadow: 0 4px 30px rgba(255, 255, 255, 0.15);
  animation: 0.5s forwards ${overlayFadeOut};

  top: 50%;
  left: 50%;
  position: fixed;
  transform: translate(-50%, 1000%);

  min-width: 320px;
  max-width: 420px;

  gap: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.active {
    transform: translate(-50%, -50%);
    animation: 0.3s forwards ${overlayFadeIn};
  }
`;
interface OverlayContentProps {
  show: boolean;
  title: string;
  message?: string;
  message2?: string;
  buttons: React.ReactNode;
}

export default function OverlayContent({
  show,
  title,
  message,
  message2,
  buttons,
}: OverlayContentProps) {
  return (
    <>
      <Dimmed className={show ? "active" : ""} />
      <DimmedBox className={show ? "active" : ""}>
        <Row
          $gap="8px"
          $align="flex-start"
        >
          <Column
            $gap="8px"
            $w="100%"
          >
            <Text $class="title">{title}</Text>
            <Column>
              {message && <Text>{message}</Text>}
              {message2 && <Text>{message2}</Text>}
            </Column>
            <Row
              $w="100%"
              $jus="flex-end"
              $pad="12px 0 0"
              $gap="8px"
            >
              {buttons}
            </Row>
          </Column>
        </Row>
      </DimmedBox>
    </>
  );
}
