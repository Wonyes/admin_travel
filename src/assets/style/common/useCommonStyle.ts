import { CommonProps } from "@/typeing/styleInterface";
import { textStyles } from "@/constant/useClass";
import styled, { css } from "styled-components";

const createTextBox = (props: Partial<CommonProps> = {}) => {
  const classes = Array.isArray(props.$class) ? props.$class : [props.$class];

  const combinedStyles = classes
    .map((cls) => textStyles[cls as keyof typeof textStyles] || "")
    .join(" ");

  return css`
    color: ${props.$color};

    font-size: ${props.$size};
    line-height: ${props.$line};
    font-family: ${props.$font};
    font-weight: ${props.$weight};

    width: ${props.$w};
    min-width: ${props.$minW};
    max-height: ${props.$maxH};

    text-align: ${props.$tAlign};
    white-space: ${props.$wSpace};
    opacity: ${props.$op};
    overflow: ${props.$over};
    overflow-y: ${props.$overY};
    text-decoration: ${props.$textDeco};

    margin: ${props.$mar};
    padding: ${props.$pad};
    border-radius: ${props.$radius};
    background-color: ${props.$backColor};
    border: ${props.$bor};
    cursor: ${props.$cursor};

    flex: ${props.$flex};
    word-break: break-all;
    display: ${props.$dis || "inline-block"};
    text-transform: ${props.$tTrans};
    text-shadow: ${props.$textShadow};

    ${combinedStyles}
  `;
};

const createFlexBox = (props: Partial<CommonProps> = {}) => css`
  gap: ${props.$gap};
  flex: ${props.$flex};
  align-items: ${props.$align};
  flex-wrap: ${props.$flexWrap};
  justify-content: ${props.$jus};
  flex-direction: ${props.$direct};

  width: ${props.$w};
  min-width: ${props.$minW};
  max-width: ${props.$maxW};

  height: ${props.$h};
  min-height: ${props.$minH};
  max-height: ${props.$maxH};

  margin: ${props.$mar};
  padding: ${props.$pad};

  border-top: ${props.$borT};
  border-left: ${props.$borL};
  border-bottom: ${props.$borB};
  border-radius: ${props.$radius};
  box-shadow: ${props.$shadow};

  text-align: ${props.$tAlign};
  background-color: ${props.$backColor};
  position: ${props.$position};

  overflow: ${props.$over};
  overflow-x: ${props.$overX};
  overflow-y: ${props.$overY};

  cursor: ${props.$cursor};
  white-space: ${props.$wSpace};

  display: flex;
`;

const createPadBox = (props: Pick<CommonProps, "$pad" | "$w">) => css`
  padding: ${props.$pad};
  width: ${props.$w};
`;

const createPositionBox = (props: Partial<CommonProps> = {}) => css`
  position: ${props.$position};
  top: ${props.$top};
  bottom: ${props.$bottom};
  left: ${props.$left};
  right: ${props.$right};
  transform: ${props.$trans};
  z-index: ${props.$zIndex};
  width: ${props.$w};
  padding: ${props.$pad};
  height: ${props.$h};
  display: ${props.$dis};
  align-items: ${props.$align};
  justify-content: ${props.$jus};
  background-color: ${props.$backColor};
  overflow: ${props.$over};
  cursor: ${props.$cursor};

  &.movie-hover {
    display: none;
  }

  &:hover .movie-hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: var(--c-black-dim);
  }
`;

const FlexBox = styled.div<Partial<CommonProps>>`
  ${createFlexBox}
`;

const PadBox = styled.div<CommonProps>`
  ${createPadBox}
`;

const PositionBox = styled.div<Partial<CommonProps>>`
  ${createPositionBox}
`;

const Text = styled.span<Partial<CommonProps>>`
  ${createTextBox}
`;

const SectionBox = styled.section.attrs({ className: "section" })`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OverScroll = styled.div`
  overflow-y: auto;
  height: 100%;
  max-height: 245px;
  background: tomato;
`;

interface ImgProps
  extends Pick<
    CommonProps,
    "$w" | "$h" | "$cursor" | "$radius" | "$minW" | "$mar" | "$maxH" | "$objectFit"
  > {
  src: string;
  alt?: string;
}

const Img = styled.img.attrs<ImgProps>((props) => ({
  src: props.src || "",
  alt: props.alt || "",
}))<ImgProps>`
  width: ${(props) => props.$w || "auto"};
  height: ${(props) => props.$h || "auto"};
  border-radius: ${(props) => props.$radius || "0"};
  min-width: ${(props) => props.$minW};
  margin: ${(props) => props.$mar};
  cursor: ${(props) => props.$cursor};
  max-height: ${(props) => props.$maxH};
  object-fit: ${(props) => props.$objectFit};

  &.img-clear {
    object-fit: cover;
    image-rendering: -moz-crisp-edges;
    image-rendering: -o-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor;
    -ms-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -moz-backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
`;

const createLineSection = (props: Partial<CommonProps> = {}) => css`
  padding: ${props.$pad};
  border-top: ${props.$borT};
  border-left: ${props.$borL};
  border-right: ${props.$borR};
  border-bottom: ${props.$borB};
  border-radius: ${props.$radius};
  height: ${props.$h};
  width: ${props.$w};
`;

const LineSection = styled.div<Partial<CommonProps>>`
  ${createLineSection}
`;

const Row = styled(FlexBox)<Partial<CommonProps>>`
  align-items: ${(props) => props.$align};
`;

const Column = styled(FlexBox)<Partial<CommonProps>>`
  flex-direction: column;
`;

const Between = styled(FlexBox)<Partial<CommonProps>>`
  align-items: ${(props) => (props.$align ? props.$align : "center")};
  justify-content: space-between;
`;

const ErrorMsg = styled.span`
  color: var(--c-red);
  font-size: var(--s-caption);
  line-height: var(--l-caption);
  font-family: var(--f-caption);
  white-space: nowrap;
`;

const createTableCell = (props: Partial<CommonProps> = {}) => css`
  color: ${props.$color};

  padding: ${props.$pad};
  width: ${props.$w ?? "auto"};
  min-width: ${props.$w};
  max-width: ${props.$w};
  height: ${props.$h ? props.$h : "48px"};
  min-height: ${props.$minH ? props.$minH : "48px"};

  font-size: var(--s-subTitle);
  font-family: var(--f-subTitle);
  line-height: var(--l-subTitle);
  text-decoration: ${props.$textDeco};
  vertical-align: middle;
  padding-left: 8px;
  padding-right: 8px;

  cursor: ${props.$cursor};

  border-right: 1px solid rgba(170, 170, 170, 0.4);
  border-bottom: 1px solid rgba(170, 170, 170, 0.4);

  tr:only-child &,
  tr:last-child & {
    border-bottom: none;
  }

  &.text-blue {
    cursor: pointer;
    color: var(--c-blue);
    text-decoration: underline;
  }

  &:last-child {
    border-right: none;
  }

  &.blue {
    cursor: pointer;
    color: var(--c-blue);
  }

  &.blue_under {
    cursor: pointer;
    color: var(--c-blue);
    text-decoration: underline;
  }

  &.red {
    color: var(--c-red);
  }
  &.red_under {
    cursor: pointer;
    color: var(--c-red);
    text-decoration: underline;
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TableCell = styled.td<Partial<CommonProps>>`
  ${createTableCell}
`;

const createMorphism = (props: Partial<CommonProps> = {}) => css`
  position: ${props.$position ?? "relative"};
  top: ${props.$top};
  width: ${props.$w ?? "100%"};
  max-width: ${props.$maxW};
  max-height: ${props.$maxH};
  height: ${props.$h ?? "100%"};

  margin: ${props.$mar};
  border-radius: ${props.$radius ?? "8px"};
  padding: ${props.$pad ?? "22px"};

  background: ${props.$backColor ?? "rgba(255, 255, 255, 0.8)"};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: ${props.$zIndex};

  display: ${props.$dis};
  gap: ${props.$gap};
  align-items: ${props.$align};
  bottom: ${props.$bottom};
  &.red-line {
    border: 1px solid var(--c-red);
  }
`;

const MorphismBox = styled.section<Partial<CommonProps>>`
  ${createMorphism}
`;

const RegisTitle = styled.div`
  gap: 4px;
  width: 200px;
  min-width: 200px;
  display: flex;
  align-items: center;
`;

const InfoLineBox = styled.div<Pick<CommonProps, "$h">>`
  padding: 20px 0;
  border-top: 1px solid var(--c-line);
  height: ${(props) => props.$h || "auto"};
  gap: 14px;
  display: flex;
  align-items: flex-start;
`;

const Dimmed = styled.div`
  background-color: var(--dim);
  backdrop-filter: blur(5px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const SelectBox = styled.div`
  position: relative;
  display: inline-block;

  text-align: center;
  vertical-align: middle;

  cursor: pointer;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 240px;
  min-width: 240px;
  padding: 10px 12px;
  border-radius: 8px;
`;

export {
  Img,
  Row,
  Text,
  Column,
  Dimmed,
  PadBox,
  FlexBox,
  Between,
  ErrorMsg,
  TableCell,
  SelectBox,
  RegisTitle,
  OverScroll,
  SectionBox,
  InfoLineBox,
  PositionBox,
  MorphismBox,
  LineSection,
};
