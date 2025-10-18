import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import {
  Between,
  Column,
  Img,
  InfoLineBox,
  MorphismBox,
  RegisTitle,
  Row,
  Text,
} from "@/assets/style/common/useCommonStyle";

import SubTitle from "@/components/header/SubTitle";

import Loading from "@/hooks/Loading";
import { useOverlay } from "@/hooks/useOverlay";
import { BlueBtn, RedBtn, WhiteBtn } from "@/hooks/useButton";
import { useProductDetail } from "@/hooks/api/reactQuery/query/useProduct";
import { useMutation } from "@tanstack/react-query";
import { Delete } from "@/hooks/api/reactQuery/mutate/useMutations";

export type { DOMNode } from "html-dom-parser";

import parse from "html-react-parser";
import { CommonProps } from "@/typeing/styleInterface";
import { useGlobalStore } from "@/hooks/store/useGlobalStore";

const ChannleMove = styled.a`
  color: var(--c-blue);
  cursor: pointer;
  text-decoration: underline;
`;

const ScrollInfoBox = styled.div<Partial<CommonProps>>`
  width: 100%;

  padding: 8px;
  border-radius: 8px;

  overflow-y: auto;

  height: ${(props) => props.$h ?? "160px"};
  max-height: ${(props) => props.$maxH ?? "160px"};

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 4px !important;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--c-subText1);
    border-radius: 999px;
  }
`;

const ScrollInfo = styled(Column)`
  &::-webkit-scrollbar {
    width: 4px !important;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--c-subText1);
    border-radius: 999px;
  }
`;

export default function ProductDetail() {
  const navigate = useNavigate();

  const { no } = useParams();
  const { decoded } = useGlobalStore();
  const { openConfirm } = useOverlay();

  const { data: detailData } = useProductDetail({ url: `product/${no}` });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: () => Delete({ url: `product/${no}` }),
    onSuccess: () => {
      navigate("/p.inquiry");
    },
  });

  const productDelete = () => {
    openConfirm({
      title: "상품을 정말 삭제하시겠습니까 ?",
      message: "삭제된 상품은 복구가 불가능합니다.",
      subBtn: "취소",
      mainBtn: "삭제",
      onFunc: () => {
        deleteProduct();
      },
    });
  };

  if (!detailData) {
    return <Loading />;
  }

  return (
    <Column
      $h="100%"
      $gap="22px"
      $jus="space-between"
    >
      <ScrollInfo
        $gap="22px"
        $overY="scroll"
      >
        <MorphismBox $h="fit-content">
          <DefualtInfo detailData={detailData} />
        </MorphismBox>
        <MorphismBox $h="100%">
          <DetailInfo detailData={detailData} />
        </MorphismBox>
      </ScrollInfo>
      <MorphismBox
        $pad="12px"
        $h="fit-cotent"
      >
        <Between>
          <WhiteBtn
            msg="뒤로가기"
            $w="fit-content"
            onClick={() => navigate("/p.inquiry")}
          />
          <Row $gap="12px">
            <RedBtn
              msg="삭제"
              $w="fit-content"
              disabled={
                decoded?.role !== "ROLE_GEUST" && detailData.channelDetail?.channelEnum === "NAVER"
              }
              onClick={() => productDelete()}
            />
            <BlueBtn
              msg="수정"
              $w="fit-content"
              disabled={
                decoded?.role !== "ROLE_GEUST" && detailData.channelDetail?.channelEnum === "NAVER"
              }
              onClick={() => navigate(`/p.modify/${no}`)}
            />
          </Row>
        </Between>
      </MorphismBox>
    </Column>
  );
}

const DefualtInfo = ({ detailData }) => {
  return (
    <>
      <SubTitle title="기본 정보" />
      <InfoLineBox>
        <RegisTitle>
          <Text>상품명</Text>
        </RegisTitle>
        <Text>{detailData.productName}</Text>
      </InfoLineBox>
      <InfoLineBox>
        <RegisTitle>
          <Text>상품 가격</Text>
        </RegisTitle>
        <Text>{detailData.price?.toLocaleString()}원</Text>
      </InfoLineBox>
      <InfoLineBox>
        <RegisTitle>
          <Text>할인</Text>
        </RegisTitle>
        <Text>
          {detailData && detailData.discountRate
            ? `${
                detailData.discountRate
              }% - (할인가: ${detailData.discountPrice?.toLocaleString()}원)`
            : "할인 없음"}
        </Text>
      </InfoLineBox>
      <InfoLineBox>
        <RegisTitle>
          <Text>재고 수량</Text>
        </RegisTitle>
        <Text>{detailData.stock?.toLocaleString()}개</Text>
      </InfoLineBox>
      <InfoLineBox>
        <RegisTitle>
          <Text>상품 상태</Text>
        </RegisTitle>
        <Text>{detailData.productStateName}</Text>
      </InfoLineBox>
      <InfoLineBox>
        <RegisTitle>
          <Text>판매 채널</Text>
        </RegisTitle>
        <ChannleMove
          href={detailData?.channelDetail?.detailUrl}
          target="_blank"
        >
          {detailData?.channelDetail?.name}
        </ChannleMove>
      </InfoLineBox>
    </>
  );
};

const DetailInfo = ({ detailData }) => {
  return (
    <>
      <SubTitle title="상세 정보" />
      <InfoLineBox>
        <RegisTitle>
          <Text>대표 이미지</Text>
        </RegisTitle>
        <Img
          $w="120px"
          $h="120px"
          $radius="8px"
          src={detailData.pri}
        />
      </InfoLineBox>
      {detailData.pdi.length !== 0 && (
        <InfoLineBox>
          <RegisTitle>
            <Text>추가 이미지</Text>
          </RegisTitle>
          {detailData.pdi.map((src: string, index: string) => (
            <Img
              key={index}
              $w="120px"
              $h="120px"
              $radius="8px"
              src={src}
              alt={`pdi_imgs ${index}`}
            />
          ))}
        </InfoLineBox>
      )}
      <InfoLineBox>
        <RegisTitle>
          <Text>설명</Text>
        </RegisTitle>
        <ScrollInfoBox
          $h="300px"
          $maxH="300px"
        >
          {parse(detailData.description, {
            replace: (domNode) => {
              if (domNode.type === "tag" && domNode.tagName === "img") {
                return (
                  <Img
                    $w="100%"
                    $maxH="300px"
                    $objectFit="contain"
                    src={domNode.attribs?.src}
                    alt={domNode.attribs?.alt || "image"}
                  />
                );
              }
              return domNode;
            },
          })}
        </ScrollInfoBox>
      </InfoLineBox>
    </>
  );
};
