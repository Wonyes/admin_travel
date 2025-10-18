import { useEffect } from "react";
import { Between, Column, Img, MorphismBox, Row, Text } from "@/assets/style/common/useCommonStyle";

import { useImg } from "@/assets/style/common/useImg";
import Paging from "@/hooks/Paging";
import styled from "styled-components";
import { BlueBtn, WhiteBtn } from "@/hooks/useButton";
import Input from "@/hooks/Input";
import DropDown from "@/hooks/DropDown";

import DateFilter from "@/components/common/calendar/DateFilter";
import Calendar from "@/components/common/calendar/Calendar";

import { useInputStore } from "@/hooks/store/useInputStore";
import { usePageStore } from "@/hooks/store/usePageStore";
import useQueryString from "@/hooks/useQueryString";

import {
  requestHeaders,
  requestScrollHeaders,
  successHeaders,
  successScrollHeaders,
} from "@/constant/useHeader";

import Table from "./RequestTable";
import { useOverlay } from "@/hooks/useOverlay";
import { useCalendarStore } from "@/hooks/store/useCalendarStore";
import StateClear from "@/util/StateClear";
import NoItem from "@/components/common/NoItem";
import RefundReject from "@/components/common/overlay/modal/RefundReject";
import { useTextStore } from "@/hooks/store/useTextStore";
import { useCompleteCriteria, useSearchCondition } from "@/hooks/api/reactQuery/query/useEnums";
import { useReturnCount, useReturnList } from "@/hooks/api/reactQuery/query/useOrder";
import Loading from "@/hooks/Loading";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/hooks/api/reactQuery/mutate/useMutations";

const ChangeBox = styled.div`
  background-color: var(--c-white);
  padding: 24px 20px;
  border-radius: 8px;

  width: 100%;
  height: fit-content;

  cursor: pointer;

  display: flex;
  justify-content: space-between;
  gap: 8px;

  &:first-child {
    border-radius: 8px 0 0 8px;
  }
  &:last-child {
    border-radius: 0 8px 8px 0;
  }

  &.active {
    border: none;
    background-color: var(--c-blue);

    span {
      color: var(--c-white);
    }
  }
`;

const WarningInfo = ({ pages }) => (
  <Text $class={["subTitle", "red"]}>
    {pages
      ? "자동으로 환불처리된 경우 표에 반영되기까지 약 1분 정도 소요됩니다."
      : "발급된 티켓을 하나라도 사용한 경우 반품요청을 승인할 수 없습니다."}
  </Text>
);

export default function RequestManage() {
  const { warning } = useImg();
  const { openConfirm, openModal, openToast } = useOverlay();
  const {
    condition: { requestSearchValue },
    resetInputValues,
  } = useInputStore();

  const { orderReject } = useTextStore();
  const { resetToggleCalendar } = useCalendarStore();

  const { setParams, getParams, paramsClear } = useQueryString();
  const params = getParams();

  const { clear } = StateClear();
  const { currentPage, size, resetPageParams } = usePageStore();
  const { data: dateCriteria } = useCompleteCriteria(
    params.pages === "success" ? "success" : undefined
  );
  const { data: searchCondition } = useSearchCondition();

  const getState = () => {
    dateCriteria();
    searchCondition();
  };

  const listUrl =
    params.pages === "success"
      ? "product-order/cancel-return-complete"
      : "product-order/cancel-return-request";
  const {
    data: getList,
    refetch,
    isLoading,
  } = useReturnList(listUrl, {
    page: params.page ?? currentPage,
    size: size,
    endDate: params.endDate,
    startDate: params.startDate,
    searchKeyword: params.search,
    dateCriteria: params.dateCriteria,
    searchCondition: params.searchCondition,
  });

  const { data: getCount, isLoading: countLoading } = useReturnCount();

  const paramsSave = () => {
    setParams({
      search: requestSearchValue ? decodeURI(requestSearchValue.toString()) : "",
    });
  };

  const pageChange = (state: string) => {
    resetPageParams();
    resetInputValues();
    resetToggleCalendar();
    paramsClear(["pages"]);
    setParams({ pages: state });
  };

  useEffect(() => {
    refetch();
    resetPageParams();
    resetInputValues();
    paramsClear(["pages"]);
  }, [params.pages]);

  const { mutate: requsetRefund } = useMutation({
    mutationFn: ({ url }: { url: string }) => Post({ url: url }),
    onSuccess: () => {
      openToast({
        message: "승인이 완료되었습니다.",
      });
      refetch();
    },
  });

  const { mutate: rejectRefund } = useMutation({
    mutationFn: ({ url }: { url: string }) =>
      Post({ url, params: { rejectReturnReason: orderReject } }),
    onSuccess: () => {
      openToast({
        message: "거부가 완료되었습니다.",
      });
      refetch();
    },
  });

  const refundRequest = (orderId: number, state: string, channel: string) => {
    const cancelText = state === "취소요청" ? "취소" : "반품";
    let cancelUrl = "";

    switch (true) {
      case state === "취소요청" && channel === "NAVER":
        cancelUrl = `naver/product-order/${orderId}/cancel/request`;
        break;
      case state !== "취소요청" && channel === "NAVER":
        cancelUrl = `naver/product-order/${orderId}/return/request-approve`;
        break;
      case state === "취소요청" && channel === "TRAVELIDGE":
        cancelUrl = `product-order/${orderId}/cancel/request`;
        break;
      case state !== "취소요청" && channel === "TRAVELIDGE":
        cancelUrl = `product-order/${orderId}/return/request-approve`;
        break;
    }

    openConfirm({
      title: `${cancelText}요청을 승인하시겠습니까?`,
      message: `${cancelText}완료까지 최소 1분 정도 소요됩니다.`,
      message2: `${cancelText}완료된 항목은 취소/반품 완료 내역에서 확인할 수 있습니다.`,
      mainBtn: "승인",
      subBtn: "취소",
      onFunc: () => {
        requsetRefund({ url: cancelUrl });
      },
    });
  };

  const refundReject = (data: {
    id: number;
    productId: number;
    directOption: string;
    purchaseUserName: string;
    phoneNumber: string;
    productName: string;
  }) => {
    const cancelUrl = `/naver/product-order/${data.id}/return/reject`;

    openModal({
      title: "반품 철회",
      subBtn: "닫기",
      mainBtn: "반품 철회",
      content: <RefundReject data={data} />,
      onFunc: () => {
        rejectRefund({ url: cancelUrl });
      },
    });
  };

  if (isLoading || countLoading) return <Loading />;

  return (
    <>
      <MorphismBox
        $h="fit-content"
        $pad="0"
      >
        <Row>
          <ChangeBox
            className={params.pages !== "success" ? "active" : ""}
            onClick={() => params.pages === "success" && pageChange("request")}
          >
            <Text $class="title">취소/반품 요청</Text>
            <Text $size="var(--s-header)">{getCount.requestCount}건</Text>
          </ChangeBox>
          <ChangeBox
            className={params.pages === "success" ? "active" : ""}
            onClick={() => params.pages !== "success" && pageChange("success")}
          >
            <Text $class="title">취소/반품 완료</Text>
            <Text $size="var(--s-header)">{getCount.completeCount}건</Text>
          </ChangeBox>
        </Row>
      </MorphismBox>
      <MorphismBox
        $h="fit-content"
        className="red-line"
      >
        <Row
          $gap="8px"
          $align="center"
        >
          <Img
            $w="22px"
            $h="22px"
            src={warning}
            alt="warning"
          />
          <WarningInfo pages={params.pages} />
        </Row>
      </MorphismBox>
      <MorphismBox
        $zIndex="1"
        $h="fit-content"
      >
        <Between
          $h="100%"
          $w="100%"
          $gap="22px"
          $flexWrap="wrap"
        >
          <Column $gap="14px">
            <Row
              $gap="12px"
              $align="center"
            >
              <Text $minW="100px">조회기간</Text>
              <DropDown
                name="dateCriteria"
                data={dateCriteria}
              />
              <DateFilter />
              <Calendar />
            </Row>
            <Row
              $gap="12px"
              $align="center"
            >
              <Text $minW="100px">상세조건</Text>
              <DropDown
                name="searchCondition"
                data={searchCondition}
              />
              <Input
                name="requestSearchValue"
                value={requestSearchValue}
                place="검색어를 입력해주세요."
                onEnter={() => paramsSave()}
              />
            </Row>
          </Column>
          <Row
            $gap="12px"
            $align="center"
          >
            <WhiteBtn
              $w="77px"
              $h="46px"
              msg="초기화"
              onClick={() => clear(getState, params.pages === "success" ? ["pages"] : [])}
            />
            <BlueBtn
              $w="77px"
              $h="46px"
              msg="검색"
              onClick={paramsSave}
            />
          </Row>
        </Between>
      </MorphismBox>
      <MorphismBox>
        {getList === undefined ? null : getList.content.length === 0 ? (
          <NoItem text="취소/반품 내역이 없습니다." />
        ) : (
          <Table
            refundReject={refundReject}
            refundRequest={refundRequest}
            list={getList && getList.content}
            isSuccess={params.pages === "success"}
            headers={params.pages === "success" ? successHeaders : requestHeaders}
            scrollHeaders={params.pages === "success" ? successScrollHeaders : requestScrollHeaders}
          />
        )}
      </MorphismBox>
      <Paging pageData={getList} />
    </>
  );
}
