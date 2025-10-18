import { useMutation } from "@tanstack/react-query";

import {
  Between,
  Column,
  MorphismBox,
  Row,
  TableCell,
  Text,
} from "@/assets/style/common/useCommonStyle";

import Input from "@/hooks/Input";
import Paging from "@/hooks/Paging";
import DropDown from "@/hooks/DropDown";
import { ScrollTable } from "@/hooks/useTable";
import { BlueBtn, WhiteBtn } from "@/hooks/useButton";

import DateFilter from "@/components/common/calendar/DateFilter";
import Calendar from "@/components/common/calendar/Calendar";
import OrderRefundModal from "@/components/common/overlay/modal/OrderRefundModal";

import { useOverlay } from "@/hooks/useOverlay";
import useQueryString from "@/hooks/useQueryString";
import { usePageStore } from "@/hooks/store/usePageStore";
import { useInputStore } from "@/hooks/store/useInputStore";
import { Post } from "@/hooks/api/reactQuery/mutate/useMutations";
import { useAllOrderList } from "@/hooks/api/reactQuery/query/useOrder";

import NoItem from "@/components/common/NoItem";

import { orderHeaders, orderScrollHeaders } from "@/constant/useHeader";

import GetChannel from "@/util/GetChannel";
import StateClear from "@/util/StateClear";

import {
  useCriteria,
  useOrderState,
  useSearchCondition,
  useCancelReturnState,
} from "@/hooks/api/reactQuery/query/useEnums";
import Loading from "@/hooks/Loading";

type AvailableCancelOrReturnState = "CANCEL_REQUEST" | "RETURN_REQUEST" | "RETURN_REJECT";

export default function OrderInquiry() {
  const { openModal, openToast } = useOverlay();
  const {
    condition: { orderSearchValue },
  } = useInputStore();

  const { currentPage, size } = usePageStore();
  const { getState } = usePageStore;
  const { setParams, getParams } = useQueryString();

  const params = getParams();
  const { clear } = StateClear();

  const { data: orderState } = useOrderState();
  const { data: criteriaState } = useCriteria();
  const { data: conditionState } = useSearchCondition();
  const { data: cancelReasonState } = useCancelReturnState();

  const {
    data: orderList,
    refetch,
    isLoading,
  } = useAllOrderList({
    page: params.page ?? currentPage,
    size: size,
    endDate: params.endDate,
    startDate: params.startDate,
    searchKeyword: params.search,
    dateCriteria: params.criteriaState,
    productOrderState: params.orderState,
    searchCondition: params.conditionState,
    cancelOrReturnState: params.cancelReasonState,
  });

  const paramsSave = () => {
    setParams({
      search: orderSearchValue ? decodeURI(orderSearchValue.toString()) : "",
    });
  };

  const { mutate: cancelTicket } = useMutation({
    mutationFn: ({
      id,
      channel,
      availableCancelOrReturnState,
    }: {
      id: number;
      channel: string;
      availableCancelOrReturnState: AvailableCancelOrReturnState;
    }) => {
      let url = "";
      let paramState = "";

      switch (availableCancelOrReturnState) {
        case "CANCEL_REQUEST":
          paramState = "cancelReason";
          if (channel === "TRAVELIDGE") {
            url = `product-order/${id}/cancel/request`;
          } else {
            url = `naver/product-order/${id}/cancel/request`;
          }
          break;

        case "RETURN_REQUEST":
          paramState = "returnReason";
          if (channel === "TRAVELIDGE") {
            url = `product-order/${id}/return/request-approve`;
          } else {
            url = `naver/product-order/${id}/return/request-approve`;
          }
          break;

        default:
          throw new Error("Invalid availableCancelOrReturnState");
      }
      const currentState = getState().state;
      return Post({
        url,
        params: { [paramState]: currentState },
      });
    },
    onSuccess: () => {
      openToast({
        message: "처리가 완료되었습니다.",
      });
      refetch();
    },
  });

  const ticketCancel = (id: number, availableCancelOrReturnState: any, channel: string) => {
    cancelTicket({ availableCancelOrReturnState, id, channel });
  };

  const isCancellModal = (data: {
    id: number;
    productId: number;
    directOption: string;
    purchaseUserName: string;
    phoneNumber: string;
    productName: string;
    availableCancelOrReturnState: string;
    orderState: string;
    channel: string;
  }) => {
    const title =
      data.availableCancelOrReturnState === "CANCEL_REQUEST"
        ? "판매자 직접 취소"
        : "판매자 직접 반품";

    openModal({
      title: title,
      subBtn: "취소",
      mainBtn: "완료",
      content: <OrderRefundModal data={data} />,
      onFunc: () => {
        ticketCancel(data.id, data.availableCancelOrReturnState, data.channel);
      },
    });
  };

  if (isLoading) return <Loading />;

  return (
    <>
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
                name="criteriaState"
                data={criteriaState}
              />
              <DateFilter />
              <Calendar />
            </Row>
            <Row
              $gap="12px"
              $align="center"
            >
              <Text $minW="100px">주문상태</Text>
              <DropDown
                name="orderState"
                data={orderState}
              />
            </Row>
            <Row
              $gap="12px"
              $align="center"
            >
              <Text $minW="100px">취소/반품상태</Text>
              <DropDown
                name="cancelReasonState"
                data={cancelReasonState}
              />
            </Row>
            <Row
              $gap="12px"
              $align="center"
            >
              <Text $minW="100px">상세조건</Text>
              <DropDown
                name="conditionState"
                data={conditionState}
              />
              <Input
                name="orderSearchValue"
                value={orderSearchValue}
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
              onClick={() => clear(refetch)}
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
        {orderList === undefined ? null : orderList.content.length === 0 ? (
          <NoItem text="주문 내역이 없습니다." />
        ) : (
          <ScrollTable
            headers={orderHeaders}
            scrollHeaders={orderScrollHeaders}
            fixedRows={
              <>
                {orderList &&
                  orderList.content.map(
                    ({
                      id,
                      channel,
                      productId,
                      orderState,
                      phoneNumber,
                      productName,
                      directOption,
                      channelDetail,
                      purchaseUserName,
                      orderStateMeaning,
                      ticketStateMeaning,
                      ticketUsedStateMeaning,
                      cancelOrReturnStateMeaning,
                      availableCancelOrReturnState,
                    }) => (
                      <tr key={id}>
                        <TableCell $w="160px">
                          <BlueBtn
                            $pad="4px 12px"
                            $w="fit-content"
                            msg={
                              availableCancelOrReturnState === "CANCEL_REQUEST"
                                ? "취소"
                                : availableCancelOrReturnState === "RETURN_REJECT"
                                ? "대기"
                                : availableCancelOrReturnState === "RETURN_REQUEST"
                                ? "반품"
                                : "완료"
                            }
                            onClick={() =>
                              isCancellModal({
                                id,
                                channel,
                                productId,
                                directOption,
                                purchaseUserName,
                                phoneNumber,
                                productName,
                                availableCancelOrReturnState,
                                orderState,
                              })
                            }
                            disabled={
                              availableCancelOrReturnState === "NOTHING" ||
                              availableCancelOrReturnState === "RETURN_REJECT"
                            }
                          />
                        </TableCell>
                        <TableCell>{id}</TableCell>
                        <TableCell>
                          <GetChannel channel={channelDetail} />
                        </TableCell>
                        <TableCell>{orderStateMeaning ? orderStateMeaning : "-"}</TableCell>
                        <TableCell>{ticketStateMeaning ? ticketStateMeaning : "-"}</TableCell>
                        <TableCell>
                          <Row
                            $gap="4px"
                            $jus="center"
                            $align="center"
                          >
                            {cancelOrReturnStateMeaning !== "-" && (
                              <Text $class="blue">{cancelOrReturnStateMeaning} /</Text>
                            )}
                            <Text $class="red">{ticketUsedStateMeaning}</Text>
                          </Row>
                        </TableCell>
                      </tr>
                    )
                  )}
              </>
            }
            scrollRows={
              <>
                {orderList &&
                  orderList.content.map(
                    ({
                      id,
                      productId,
                      purchaseAt,
                      phoneNumber,
                      productName,
                      directOption,
                      purchaseUserId,
                      purchaseQuantity,
                      purchaseUserName,
                    }) => (
                      <tr key={id}>
                        <TableCell $w="160px"> {purchaseAt}</TableCell>
                        <TableCell>{productId}</TableCell>
                        <TableCell>{productName}</TableCell>
                        <TableCell>{directOption ? directOption : "-"}</TableCell>
                        <TableCell>{purchaseQuantity}</TableCell>
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
      <Paging pageData={orderList} />
    </>
  );
}
