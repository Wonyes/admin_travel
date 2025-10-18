import styled from "styled-components";

const DropMenuList = styled.li`
  padding: 12px;
  background-color: var(--c-text-2);

  font-size: var(--s-subText);
  font-family: var(--f-subText);
  line-height: var(--l-subText);

  cursor: pointer;

  border-radius: 4px;

  &:hover {
    background-color: var(--c-input);
  }
`;

const DropMenuContainer = styled.div`
  position: absolute;
  top: 100%;

  left: -1px;
  text-align: left;
  z-index: 999;
  width: 101%;
  margin-top: 6px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  padding: 4px;
`;

const DropMenuBox = styled.ul`
  overflow-y: auto;
  max-height: 300px;
  padding: 4px;

  &::-webkit-scrollbar {
    width: 2px !important;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--c-subText1);
    border-radius: 99px;
  }
`;

interface DropMenuProps {
  data?: MenuProps[];
  isState: (enumValue: string, meaning: string) => void;
}

interface MenuProps {
  enumValue: string;
  meaning: string;
}

export default function DropMenu({ data, isState }: DropMenuProps) {
  return (
    <DropMenuContainer>
      <DropMenuBox className="dropdown-menu">
        {data &&
          data.map(({ enumValue, meaning }, index) => (
            <DropMenuList
              key={index}
              onClick={() => isState(enumValue, meaning)}
            >
              {meaning}
            </DropMenuList>
          ))}
      </DropMenuBox>
    </DropMenuContainer>
  );
}
