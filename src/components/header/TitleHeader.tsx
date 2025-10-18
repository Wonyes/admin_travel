import { MorphismBox, Text } from "@/assets/style/common/useCommonStyle";
import { useLocation } from "react-router-dom";

export default function TitleHeader() {
  const pathname = useLocation().pathname;

  const title = [
    { title: "상품 조회", path: "/p.inquiry" },
    { title: "상품 정보", path: "/p.detail" },
    { title: "상품 등록", path: "/p.regis" },
    { title: "상품 수정", path: "/p.modify" },

    { title: "전체 주문 내역", path: "/o.inquiry" },
    { title: "티켓 발급/취소 관리", path: "/o.manage" },
    { title: "취소/반품 관리", path: "/o.refund" },

    { title: "운영자 등록", path: "/a.regis" },
    { title: "운영자 조회", path: "/a.inquiry" },
    { title: "운영자 정보 수정", path: "/a.modify" },

    { title: "상품 문의", path: "/m.counsel" },
    { title: "1:1 문의", path: "/m.qa" },
    { title: "신고 문의", path: "/m.report" },

    { title: "내 정보", path: "/mypage" },
  ];

  let currentTitle = null;
  if (pathname === "/") {
    currentTitle = "티켓 사용처리";
  } else {
    currentTitle = title.find((item) => pathname.includes(item.path))?.title;
  }

  return (
    <MorphismBox
      $pad="0"
      $h="fit-content"
    >
      <Text
        as="h1"
        $class="title"
        $pad="12px 22px"
        $w="100%"
      >
        {currentTitle ? currentTitle : "미정"}
      </Text>
    </MorphismBox>
  );
}
