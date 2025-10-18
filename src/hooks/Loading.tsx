import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useGlobalStore } from "./store/useGlobalStore";

const bblFadInOut = keyframes`
  0%, 80%, 100% { 
    box-shadow: 0 2.5em 0 -1.3em; 
  }
  40% { 
    box-shadow: 0 2.5em 0 0; 
  }
`;

const LoaderCon = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  top: 0;
  left: 0;
  background-color: var(--c-dim);
`;

const Loader = styled.span`
  color: var(--c-blue);
  font-size: 7px;
  position: absolute;
  top: 50%;
  left: 50%;
  text-indent: -9999em;
  transform: translateZ(0);
  animation: ${bblFadInOut} 1.8s infinite ease-in-out;
  animation-delay: -0.16s;
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  animation-fill-mode: both;
  z-index: 9999;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: ${bblFadInOut} 1.8s infinite ease-in-out;
  }

  &::before {
    left: -3.5em;
    animation-delay: -0.32s;
  }

  &::after {
    left: 3.5em;
  }
`;

export default function Loading() {
  const { loading } = useGlobalStore();

  useEffect(() => {
    if (loading) {
      document.body.classList.add("scroll-lock");
    } else if (!loading) {
      document.body.classList.remove("scroll-lock");
    }
  });

  return loading ? (
    <LoaderCon>
      <Loader />
    </LoaderCon>
  ) : null;
}
