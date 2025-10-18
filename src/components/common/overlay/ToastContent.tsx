import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeInOut = keyframes`
  0% { 
   opacity: 0;
  }

  50% { 
    opacity: 1;
  }
 
  100% {
    opacity: 0;
  }
`;

const ToastBox = styled.div.attrs<{ visible: boolean }>(() => ({
  visible: undefined,
}))<{ visible: boolean }>`
  position: fixed;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 10000;
  text-align: center;

  max-width: 728px;
  width: fit-content;

  display: flex;
  padding: 8px 16px;
  align-items: center;
  border-radius: 999px;
  background: var(--c-blue);
  animation: ${({ visible }) => (visible ? fadeInOut : "none")} 2.5s ease-in-out;
`;

const ToastText = styled.p`
  color: var(--c-white);
  font-size: var(--s-title);
  white-space: nowrap;
`;

interface OverlayContentProps {
  message?: string;
}

export default function ToastContent({ message }: OverlayContentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastBox visible={visible}>
      <ToastText>{message}</ToastText>
    </ToastBox>
  );
}
