import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useImg } from "@/assets/style/common/useImg";
import { useOverlay } from "@/hooks/useOverlay";
import { usePageStore } from "@/hooks/store/usePageStore";
import useQueryString from "@/hooks/useQueryString";
import {
  Column,
  Img,
  MorphismBox,
  Row,
  TableCell,
  Text,
} from "@/assets/style/common/useCommonStyle";
import DropDown from "@/hooks/DropDown";
import Input from "@/hooks/Input";
import { BlueBtn, WhiteBtn } from "@/hooks/useButton";
import SubTitle from "@/components/header/SubTitle";
import NoItem from "@/components/common/NoItem";
import { ScrollTable } from "@/hooks/useTable";
import { Valid } from "@/util/ValidPeriod";
import Paging from "@/hooks/Paging";
import GetChannel from "@/util/GetChannel";
import { productHeaders, productScrollHeaders } from "@/constant/useHeader";
import { useInputStore } from "@/hooks/store/useInputStore";
import { useAllProduct, useRecommend } from "@/hooks/api/reactQuery/query/useProduct";
import Loading from "@/hooks/Loading";
import { useSearchState } from "@/hooks/api/reactQuery/query/useEnums";
import { useMutation } from "@tanstack/react-query";
import { Delete, Post } from "@/hooks/api/reactQuery/mutate/useMutations";
import { useState } from "react";
import { useGlobalStore } from "@/hooks/store/useGlobalStore";

const RecommendBox = styled.div`
  gap: 4px;
  width: fit-content;
  padding: 8px 12px;
  display: flex;
  border-radius: 999px;
  align-items: center;
  background-color: rgb(46, 129, 255, 0.15);
  border: 1px solid rgb(46, 129, 255, 0.3);
`;

const CategoryWrap = styled(Row)`
  gap: 8px;
`;

const Category = styled.li`
  padding: 4px 10px;
  border-radius: 8px;
  color: var(--c-gray888);
  border: 1px solid var(--c-line);
  background-color: var(--c-white);

  cursor: pointer;

  &.active {
    color: var(--c-white);
    background-color: var(--c-blue);
    border: 1px solid transparent;
  }
`;

const CategoryText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  max-width: 70px;
`;

export default function ProductInquiry() {
  const navigate = useNavigate();
  const { deleted } = useImg();
  const { decoded } = useGlobalStore();

  const { openConfirm, openToast } = useOverlay();
  const [filterTab, setFilterTab] = useState<string | null>(null);
  const filters = [
    { enumValue: null, meaning: "전체" },
    { enumValue: "TRAVELIDGE", meaning: "자사" },
    { enumValue: "NAVER", meaning: "네이버" },
  ];

  const {
    product: { recommend },
  } = useInputStore();
  const { setParams, getParams } = useQueryString();
  const params = getParams();

  const { setCurrentPage, currentPage, size, state } = usePageStore();
  const { data: productSearch, refetch: searchRefetch } = useSearchState({
    params: { page: currentPage, size, state },
  });

  const {
    data: getProduct,
    isLoading,
    refetch,
  } = useAllProduct({
    params: {
      page: params.page ?? currentPage,
      size,
      state: params.state ?? state,
      channel: filterTab,
    },
  });

  const { data: getRecommend, isLoading: recommendLoading, refetch: reRecommend } = useRecommend();

  const { mutate: deleteProduct } = useMutation({
    mutationFn: ({ url }: { url: string }) => Delete({ url }),
    onSuccess: () => {
      openToast({ message: "삭제가 완료 되었습니다." });
      refetch();
    },
  });

  const productDelete = (enums: string, id: number) => {
    openConfirm({
      title: "상품을 정말 삭제하시겠습니까?",
      message: "삭제된 상품은 복구가 불가능합니다.",
      subBtn: "취소",
      mainBtn: "삭제 하기",
      onFunc: () => {
        deleteProduct({
          url: enums === "TRAVELIDGE" ? `product/${id}` : `naver/product/${id}`,
        });
      },
    });
  };

  const { mutate: recommendAddMutate } = useMutation({
    mutationFn: () => Post({ url: `recommended/${recommend}` }),
    onSuccess: () => {
      reRecommend();
    },
  });

  const { mutate: deleteRecommended } = useMutation({
    mutationFn: (id: number) => Delete({ url: `recommended/${id}` }),
    onSuccess: () => {
      reRecommend();
    },
  });

  const recommendAdd = () => {
    recommendAddMutate();
  };

  const deleteRecommend = (id: number) => {
    openConfirm({
      title: "추천 상품을 삭제하시겠습니까?",
      message: "삭제된 상품은 클라이언트 페이지에서 제거됩니다.",
      subBtn: "취소",
      mainBtn: "삭제하기",
      onFunc: () => {
        deleteRecommended(id);
      },
    });
  };

  const filterCategory = (value: string) => {
    setFilterTab(value);
    refetch();
    setCurrentPage(0);
    setParams({
      page: 0,
    });
  };

  if (isLoading || recommendLoading) return <Loading />;

  return (
    <>
      <MorphismBox
        $zIndex="1"
        $h="fit-content"
      >
        <Column $gap="12px">
          <Row
            $gap="12px"
            $align="center"
          >
            <Text $minW="100px">판매 상태</Text>
            <DropDown
              name="state"
              data={productSearch}
              request={searchRefetch}
            />
          </Row>
          <Row
            $gap="12px"
            $align="center"
          >
            <Text $minW="100px">추천 상품 추가</Text>
            <Input
              $maxW="240px"
              name="recommend"
              value={recommend === 0 ? "" : recommend?.toLocaleString()}
              place="상품 번호를 입력해 주세요."
            />
            <BlueBtn
              $w="fit-content"
              msg="추가"
              onClick={recommendAdd}
            />
          </Row>
          <Row
            $gap="12px"
            $align="center"
          >
            <Text $minW="100px">카테고리</Text>
            <CategoryWrap>
              {filters?.map(({ meaning, enumValue }) => (
                <Category
                  key={enumValue}
                  onClick={() => filterCategory(enumValue)}
                  className={filterTab === enumValue ? "active" : ""}
                >
                  {meaning}
                </Category>
              ))}
            </CategoryWrap>
          </Row>
        </Column>
      </MorphismBox>
      <MorphismBox
        $h="fit-content"
        $pad="12px 22px"
      >
        <Row
          $gap="12px"
          $align="center"
        >
          <Column $align="center">
            <Text $wSpace="nowrap">추천된 상품 목록 TOP 10</Text>
            <Text
              $wSpace="nowrap"
              $class={["captionB", "red"]}
            >
              (자사 상품만 추천 가능합니다.)
            </Text>
          </Column>
          <Row
            $gap="4px"
            $flexWrap="wrap"
          >
            {getRecommend &&
              getRecommend.map(({ productId, productName }) => (
                <RecommendBox key={productId}>
                  <Img
                    $w="20px"
                    $h="20px"
                    src={deleted}
                    alt="deleted"
                    $mar="0 0 2px 0"
                    $cursor="pointer"
                    onClick={() => deleteRecommend(productId)}
                  />
                  <Row $gap="2px">
                    <CategoryText $class={["captionB", "blue"]}>{productName}</CategoryText>
                    <CategoryText $class={["captionB", "blue"]}>({productId})</CategoryText>
                  </Row>
                </RecommendBox>
              ))}
          </Row>
        </Row>
      </MorphismBox>
      <MorphismBox>
        <SubTitle
          pad="0 0 28px"
          title="상품 목록"
        />
        {getProduct === undefined ? null : getProduct.content.length === 0 ? (
          <NoItem text="등록한 상품이 없습니다." />
        ) : (
          <ScrollTable
            headers={productHeaders}
            scrollHeaders={productScrollHeaders}
            fixedRows={
              <>
                {getProduct &&
                  getProduct.content.map(({ id, channelDetail, productName }) => {
                    return (
                      <tr key={id}>
                        <TableCell>
                          <Row
                            $jus="center"
                            $gap="8px"
                          >
                            <BlueBtn
                              $w="fit-content"
                              $pad="4px 12px"
                              msg="수정"
                              disabled={
                                decoded?.role !== "ROLE_GEUST" &&
                                channelDetail?.channelEnum === "NAVER"
                              }
                              onClick={() => navigate(`/p.modify/${id}`)}
                            />
                            <WhiteBtn
                              $w="fit-content"
                              $pad="4px 12px"
                              msg="삭제"
                              disabled={
                                decoded?.role !== "ROLE_GEUST" &&
                                channelDetail?.channelEnum === "NAVER"
                              }
                              onClick={() => productDelete(channelDetail?.channelEnum, id)}
                            />
                          </Row>
                        </TableCell>
                        <TableCell>
                          <GetChannel channel={channelDetail} />
                        </TableCell>
                        <TableCell
                          className="text-blue"
                          onClick={() => navigate(`/p.detail/${id}`)}
                        >
                          {id}
                        </TableCell>
                        <TableCell
                          className="text-blue"
                          onClick={() => navigate(`/p.detail/${id}`)}
                        >
                          {productName}
                        </TableCell>
                      </tr>
                    );
                  })}
              </>
            }
            scrollRows={
              <>
                {getProduct &&
                  getProduct.content.map(
                    ({ id, price, discountRate, stock, productStateName, discountPrice }) => {
                      return (
                        <tr key={id}>
                          <TableCell>{Valid(productStateName)}</TableCell>
                          <TableCell>{Valid(stock)}</TableCell>
                          <TableCell>{price?.toLocaleString()}</TableCell>
                          <TableCell>{Valid(discountPrice)}</TableCell>
                          <TableCell>{discountRate ? discountRate + "%" : "-"}</TableCell>
                        </tr>
                      );
                    }
                  )}
              </>
            }
          ></ScrollTable>
        )}
      </MorphismBox>
      <Paging pageData={getProduct} />
    </>
  );
}
