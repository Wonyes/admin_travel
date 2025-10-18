import { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import { useImg } from "@/assets/style/common/useImg";
import { useGlobalStore } from "@/hooks/store/useGlobalStore";

import { MenuArrow } from "@/assets/style/common/useIconCompo";
import { Column, Img, Row, Text } from "@/assets/style/common/useCommonStyle";

const MenuBox = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  position: relative;

  width: 100%;
  text-align: left;

  cursor: pointer;

  background-color: var(--c-bg);

  &.active {
    background-color: var(--c-main);
  }

  &:first-child {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
`;

const DropDownBox = styled.div`
  width: 100%;
  display: flex;
  padding: 16px 20px;
  align-items: center;
  justify-content: space-between;
`;

const Aside = styled.aside``;

const AsideWrap = styled.div`
  width: 240px;

  padding-bottom: 28px;
  height: 100%;

  border-radius: 8px;
  box-shadow: var(--shadow);

  background-color: var(--c-bg);
`;

const MenuTitle = styled.span`
  color: var(--c-white);
  font-size: var(--s-title);
  line-height: var(--l-title);

  &.active {
    color: var(--c-blue);
  }
`;

const DropDownMenu = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  text-align: left;
  padding: 16px 20px;

  background-color: var(--c-bg2);
`;

const DropMenuTxt = styled.li`
  display: inline-block;
`;

const MenuMove = styled.a`
  color: var(--c-subText2);
  font-size: var(--s-subTitle);
  line-height: var(--l-subTitle);

  &.active {
    color: var(--c-blue);
  }
`;

const ArrowIcon = styled.div`
  width: 24px;
  height: 24px;
  transition: 0.3s;
  transform: rotate(360deg);

  &.active {
    transform: rotate(180deg);
    transition: 0.3s;
  }
`;

const menuList = [
  { menuTitle: "티켓 사용처리", pathArray: ["/"], path: "/", menuType: 0 },
  {
    menuTitle: "상품 관리",
    menuType: 1,
    pathArray: ["/p.regis", "/p.modify", "/p.inquiry", "/p.detail"],
    menuDrop: [
      { dropTitle: "상품 등록", path: "/p.regis", relatedPath: "/p.modify" },
      { dropTitle: "상품 조회", path: "/p.inquiry", relatedPath: "/p.detail" },
    ],
  },
  {
    menuTitle: "주문 관리",
    menuType: 2,
    pathArray: ["/o.inquiry", "/o.manage", "/o.refund"],
    menuDrop: [
      { dropTitle: "전체 주문 내역", path: "/o.inquiry" },
      { dropTitle: "티켓 발급/취소 관리", path: "/o.manage" },
      { dropTitle: "취소/반품 관리", path: "/o.refund" },
    ],
  },
  {
    menuTitle: "운영자 관리",
    menuType: 3,
    pathArray: ["/a.regis", "/a.inquiry", "/a.modify"],
    menuDrop: [
      { dropTitle: "운영자 등록", path: "/a.regis", provitePath: true },
      {
        dropTitle: "운영자 조회",
        path: "/a.inquiry",
        relatedPath: "/a.modify",
      },
    ],
  },
  {
    menuTitle: "문의 관리",
    menuType: 4,
    pathArray: ["/m.counsel", "/m.qa", "/m.report"],
    menuDrop: [
      { dropTitle: "신고 문의", path: "/m.report", relatedPath: "/p.detail" },
      { dropTitle: "상품 문의", path: "/m.counsel", relatedPath: "/p.modify" },
      { dropTitle: "1:1 문의", path: "/m.qa", relatedPath: "/p.detail" },
    ],
  },
];

export default function AsideCompo() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { decoded } = useGlobalStore();

  const { white_logo } = useImg();
  const { userId } = useGlobalStore();

  const [menuNo, setMenuNo] = useState<number | null>(null);

  const toggleMenu = (typeNo: number) => {
    if (typeNo === 0) {
      navigate("/");
    }
    setMenuNo((prevType) => (prevType === typeNo ? null : typeNo));
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const isPathMatch = (currentPath: string, menuPath: string) => {
    if (menuPath === "/") return currentPath === menuPath;

    return currentPath.startsWith(menuPath);
  };

  return (
    <Aside>
      <AsideWrap>
        <Column
          $h="100%"
          $jus="space-between"
          as="nav"
        >
          <Column as="ul">
            {menuList.map(({ menuTitle, menuType, menuDrop, pathArray }) => {
              return (
                <MenuBox key={menuType}>
                  <DropDownBox onClick={() => toggleMenu(menuType)}>
                    <MenuTitle
                      className={
                        pathArray.some((path) => isPathMatch(pathname, path)) ? "active" : ""
                      }
                    >
                      {menuTitle}
                    </MenuTitle>
                    {menuDrop && (
                      <ArrowIcon
                        className={
                          pathArray.some((path) => isPathMatch(pathname, path)) ||
                          menuNo === menuType
                            ? "active"
                            : ""
                        }
                      >
                        <MenuArrow
                          size="24"
                          fill="#f5f5f5"
                        />
                      </ArrowIcon>
                    )}
                  </DropDownBox>
                  {menuDrop &&
                    (pathArray.some((path) => isPathMatch(pathname, path)) ||
                      (menuDrop && menuNo === menuType)) && (
                      <DropDownMenu>
                        {menuDrop?.map(({ dropTitle, path, relatedPath, provitePath }) => {
                          if (provitePath && decoded.role === "ROLE_GUEST") {
                            return null;
                          }

                          return (
                            <DropMenuTxt key={path}>
                              <MenuMove
                                href={path}
                                className={
                                  pathname.includes(path) ||
                                  (relatedPath && pathname.includes(relatedPath))
                                    ? "active"
                                    : ""
                                }
                              >
                                {dropTitle}
                              </MenuMove>
                            </DropMenuTxt>
                          );
                        })}
                      </DropDownMenu>
                    )}
                </MenuBox>
              );
            })}
          </Column>
          <Column
            $gap="20px"
            $jus="center"
            $align="center"
          >
            <Img
              $w="fit-content"
              $h="fit-content"
              src={white_logo}
              alt="logo"
            />
            <Row
              $gap="20px"
              $w="100%"
              $jus="center"
            >
              <Text $class={["white", "subTitle"]}>{userId}</Text>
              <Text
                as="button"
                $class={["white", "subTitle"]}
                onClick={() => navigate("/mypage")}
              >
                내 정보
              </Text>
              <Text
                as="button"
                $class={["white", "subTitle"]}
                onClick={logout}
              >
                로그아웃
              </Text>
            </Row>
          </Column>
        </Column>
      </AsideWrap>
    </Aside>
  );
}
