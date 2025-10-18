import Paging from "@/hooks/Paging";

import {
  Between,
  Column,
  Img,
  MorphismBox,
  Row,
  TableCell,
  Text,
} from "@/assets/style/common/useCommonStyle";
import { useImg } from "@/assets/style/common/useImg";

import Input from "@/hooks/Input";
import DropDown from "@/hooks/DropDown";
import DateFilter from "@/components/common/calendar/DateFilter";
import Calendar from "@/components/common/calendar/Calendar";

import { ScrollTable } from "@/hooks/useTable";
import { BlueBtn, WhiteBtn } from "@/hooks/useButton";

import GetChannel from "@/util/GetChannel";
import StateClear from "@/util/StateClear";
import NoItem from "@/components/common/NoItem";
import useQueryString from "@/hooks/useQueryString";
import OrderRefundModal from "@/components/common/overlay/modal/OrderRefundModal";

import { useOverlay } from "@/hooks/useOverlay";
import { usePageStore } from "@/hooks/store/usePageStore";
import { useInputStore } from "@/hooks/store/useInputStore";
import { issueHeaders, issueScrollHeaders } from "@/constant/useHeader";

import { useMutation } from "@tanstack/react-query";
import { Post } from "@/hooks/api/reactQuery/mutate/useMutations";
import { useGetIssue } from "@/hooks/api/reactQuery/query/useOrder";
import { useNonTicektCriteria, useSearchCondition } from "@/hooks/api/reactQuery/query/useEnums";
import Loading from "@/hooks/Loading";

export default function IssueCancell() {
  const { warning } = useImg();

  const {
    condition: { issueSearchValue },
  } = useInputStore();

  const { clear } = StateClear();
  const { openModal, openConfirm, openToast } = useOverlay();
  const { setParams, getParams } = useQueryString();
  const { size, currentPage } = usePageStore();
  const { getState } = usePageStore;

  const { data: searchCondition } = useSearchCondition();
  const { data: nonTicketCondition } = useNonTicektCriteria();

  const params = getParams();

  const {
    data: issueGet,
    refetch,
    isLoading,
  } = useGetIssue({
    page: params.page ?? currentPage,
    size: size,
    endDate: params.endDate,
    startDate: params.startDate,
    searchKeyword: params.search,
    dateCriteria: params.nonTicketCondition,
    searchCondition: params.searchCondition,
  });

  const { mutate: cancelMutation } = useMutation({
    mutationFn: ({ id, channel }: { id: number; channel: string }) => {
      const url =
        channel === "NAVER"
          ? `naver/product-order/${id}/cancel`
          : `product-order/${id}/cancel/request`;
      return Post({
        url: url,
        params: { cancelReason: getState().state },
      });
    },
    onSuccess: () => {
      openToast({
        message: "취소가 완료되었습니다.",
      });
      refetch();
    },
  });

  const ticketCancel = (id: number, channel: string) => {
    cancelMutation({ id, channel });
  };

  const paramsSave = () => {
    setParams({
      search: issueSearchValue ? decodeURI(issueSearchValue.toString()) : "",
    });
  };

  const isCancelModal = (data: {
    id: number;
    productId: number;
    directOption: string;
    purchaseUserName: string;
    phoneNumber: string;
    productName: string;
    channel: string;
  }) => {
    openModal({
      title: "판매자 직접 취소",
      subBtn: "취소",
      mainBtn: "삭제",
      content: <OrderRefundModal data={data} />,
      onFunc: () => {
        ticketCancel(data.id, data.channel);
      },
    });
  };

  const { mutate: ticketRequest } = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return Post({
        url: `ticket/${id}`,
      });
    },
    onSuccess: () => {
      openToast({
        message: "발급이 완료되었습니다.",
      });
      refetch();
    },
  });

  const isTicketRequest = (id: number) => {
    openConfirm({
      title: "티켓 발급",
      message: "티켓을 정말 발급하시겠습니까?",
      subBtn: "취소",
      mainBtn: "발급",
      onFunc: () => {
        ticketRequest({ id });
      },
    });
  };

  if (isLoading) return <Loading />;

  return (
    <>
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
          <Text $class={["subText", "red"]}>
            네이버 스마트 스토어 주문에 대한 티켓 발급기한을 지켜주세요. 발급기한 이내에 티켓이
            발급되지 않은 경우 페널티가 부과됩니다.
          </Text>
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
                name="nonTicketCondition"
                data={nonTicketCondition}
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
                name="issueSearchValue"
                value={issueSearchValue}
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
              onClick={() => clear(issueGet)}
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
        {issueGet === undefined ? null : issueGet.content.length === 0 ? (
          <NoItem text="발급/취소 주문건이 없습니다." />
        ) : (
          <ScrollTable
            headers={issueHeaders}
            scrollHeaders={issueScrollHeaders}
            fixedRows={
              <>
                {issueGet &&
                  issueGet.content.map(
                    ({
                      id,
                      channel,
                      productName,
                      directOption,
                      purchaseUserName,
                      phoneNumber,
                      productId,
                      channelDetail,
                      orderStateMeaning,
                      channelProductOrderId,
                      ticketStateMeaning,
                    }) => (
                      <tr key={id}>
                        <TableCell>
                          <Row
                            $gap="8px"
                            $jus="center"
                          >
                            <BlueBtn
                              $pad="4px 12px"
                              $w="fit-content"
                              msg="발급"
                              onClick={() => isTicketRequest(id)}
                            />
                            <WhiteBtn
                              $pad="4px 12px"
                              $w="fit-content"
                              msg="취소"
                              onClick={() =>
                                isCancelModal({
                                  id,
                                  productId,
                                  directOption,
                                  purchaseUserName,
                                  phoneNumber,
                                  productName,
                                  channel,
                                })
                              }
                            />
                          </Row>
                        </TableCell>
                        <TableCell>{id}</TableCell>
                        <TableCell>
                          <GetChannel channel={channelDetail} />
                        </TableCell>
                        <TableCell>{channelProductOrderId ? channelProductOrderId : "-"}</TableCell>
                        <TableCell>{orderStateMeaning ? orderStateMeaning : "-"}</TableCell>
                        <TableCell className="red">{ticketStateMeaning}</TableCell>
                      </tr>
                    )
                  )}
              </>
            }
            scrollRows={
              <>
                {issueGet &&
                  issueGet.content.map(
                    ({
                      id,
                      productId,
                      purchaseAt,
                      phoneNumber,
                      productName,

                      directOption,
                      purchaseUserId,
                      shippingDueDate,
                      purchaseQuantity,
                      purchaseUserName,
                    }) => (
                      <tr key={id}>
                        <TableCell $w="160px"> {purchaseAt}</TableCell>
                        <TableCell className="red">{shippingDueDate}</TableCell>
                        <TableCell>{productId}</TableCell>
                        <TableCell>{productName}</TableCell>
                        <TableCell>{directOption ? directOption : "-"}</TableCell>
                        <TableCell>{purchaseQuantity ? purchaseQuantity : "-"}</TableCell>
                        <TableCell>{purchaseUserName ? purchaseUserName : "-"}</TableCell>
                        <TableCell>{phoneNumber ? phoneNumber : "-"}</TableCell>
                        <TableCell>{purchaseUserId ? purchaseUserId : "-"}</TableCell>
                      </tr>
                    )
                  )}
              </>
            }
          />
        )}
      </MorphismBox>
      <Paging pageData={issueGet} />
    </>
  );
}
