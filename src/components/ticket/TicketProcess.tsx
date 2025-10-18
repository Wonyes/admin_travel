import { useImg } from "@/assets/style/common/useImg";
import {
  Between,
  Column,
  Img,
  MorphismBox,
  Row,
  TableCell,
  Text,
} from "@/assets/style/common/useCommonStyle";

import Input from "@/hooks/Input";
import { ScrollTable } from "@/hooks/useTable";
import SubTitle from "../header/SubTitle";
import DropDown from "@/hooks/DropDown";
import { BlueBtn, WhiteBtn } from "@/hooks/useButton";

import Paging from "@/hooks/Paging";
import { ticketHeaders, ticketScrollHeaders } from "@/constant/useHeader";
import GetChannel from "@/util/GetChannel";
import { usePageStore } from "@/hooks/store/usePageStore";
import { useOverlay } from "@/hooks/useOverlay";
import NoItem from "../common/NoItem";
import { useInputStore } from "@/hooks/store/useInputStore";
import useQueryString from "@/hooks/useQueryString";
import { useTicketList } from "@/hooks/api/reactQuery/query/useTicket";
import { useTicketCondition } from "@/hooks/api/reactQuery/query/useEnums";
import { useMutation } from "@tanstack/react-query";
import { Post, Put } from "@/hooks/api/reactQuery/mutate/useMutations";
import Loading from "@/hooks/Loading";

export default function TicketProcess() {
  const { warning } = useImg();
  const { currentPage, size } = usePageStore();
  const { openConfirm, openToast } = useOverlay();

  const { setParams, getParams } = useQueryString();
  const params = getParams();

  const {
    condition: { ticketSearchValue },
  } = useInputStore();

  const { data: ticketCondition } = useTicketCondition();

  const {
    data: ticketList,
    refetch,
    isLoading,
  } = useTicketList({
    page: params.page ?? currentPage,
    size,
    searchCondition: params.ticketCondition,
    searchKeyword: params.search,
  });

  const onSearch = () => {
    setParams({
      search: ticketSearchValue ? decodeURI(ticketSearchValue.toString()) : "",
    });
  };

  const { mutate: usedTicket } = useMutation({
    mutationFn: ({ ticketKey }: { ticketKey: string }) => {
      return Put({
        url: `ticket/${ticketKey}`,
      });
    },
    onSuccess: () => {
      openToast({
        message: "티켓 사용이 완료되었습니다.",
      });
      refetch();
    },
  });

  const { mutate: refund } = useMutation({
    mutationFn: ({ productOrderId }: { productOrderId: number }) => {
      return Post({
        url: `/naver/product-order/${productOrderId}/return/reject`,
        params: {
          rejectReturnReason: "현장에서 티켓 사용처리가 진행되어 반품 요청이 취소되었습니다.",
        },
      });
    },
    onSuccess: () => {
      openToast({
        message: "철회가 진행중입니다. 반품 철회완료까지 일정 시간이 소요됩니다.",
      });
      refetch();
    },
  });

  const ticketUse = (ticketKey: string) => {
    openConfirm({
      title: "티켓 사용 처리",
      message: "티켓을 사용 처리하시겠습니까?",
      subBtn: "취소",
      mainBtn: "사용",
      onFunc: () => {
        usedTicket({ ticketKey });
      },
    });
  };

  const refundReject = (productOrderId: number) => {
    openConfirm({
      title: `주문번호 ‘${productOrderId}’의 반품을 철회하시겠습니까 ?`,
      message: "반품 철회 시 구매자에게 반품 철회 사유가 전달됩니다.",
      message2: "반품 철회 사유: 현장에서 티켓 사용처리가 진행되어 반품 요청이 취소되었습니다.",
      subBtn: "취소",
      mainBtn: "철회",
      onFunc: () => {
        refund({ productOrderId });
      },
    });
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <MorphismBox
        className="red-line"
        $h="fit-content "
      >
        <Row
          $gap="8px"
          $align="flex-start"
        >
          <Img
            $w="20px"
            $h="20px"
            src={warning}
            alt="warning"
          />
          <Text $class={["subTitle", "red"]}>
            티켓이 발급되지 않은 주문은 검색 결과에 제공되지 않습니다.
          </Text>
        </Row>
      </MorphismBox>
      <MorphismBox
        $h="fit-content"
        $zIndex="1"
      >
        <Between>
          <Column $gap="12px">
            <SubTitle
              pad="0"
              title="검색"
            />
            <Row $gap="12px">
              <DropDown
                name="ticketCondition"
                data={ticketCondition}
              />
              <Input
                name="ticketSearchValue"
                value={ticketSearchValue}
                place="검색어를 입력해주세요."
                onEnter={() => onSearch()}
              />
            </Row>
          </Column>
          <BlueBtn
            msg="검색"
            $w="fit-content"
            onClick={onSearch}
          />
        </Between>
      </MorphismBox>
      <MorphismBox>
        <SubTitle title={`검색 결과 (총 ${ticketList && ticketList.totalElements}건)`} />
        <Column $gap="14px">
          {ticketList === undefined ? null : ticketList.content.length === 0 ? (
            <NoItem text="사용할 티켓내역이 없습니다." />
          ) : (
            <ScrollTable
              headers={ticketHeaders}
              scrollHeaders={ticketScrollHeaders}
              fixedRows={
                <>
                  {ticketList &&
                    ticketList.content.map(
                      ({
                        ticketKey,
                        ticketUsedState,
                        productOrderId,
                        channelDetail,
                        channelProductOrderId,
                        purchaseQuantity,
                      }) => {
                        const isButtonEnabled = ticketUsedState !== "AVAILABLE";

                        return (
                          <tr key={productOrderId}>
                            <TableCell>
                              <BlueBtn
                                msg="사용"
                                $pad="4px 12px"
                                $w="fit-content"
                                onClick={() => ticketUse(ticketKey)}
                                disabled={isButtonEnabled}
                              />
                            </TableCell>
                            <TableCell>{productOrderId}</TableCell>
                            <TableCell>
                              <GetChannel channel={channelDetail} />
                            </TableCell>
                            <TableCell>{channelProductOrderId}</TableCell>
                            <TableCell>{purchaseQuantity}</TableCell>
                          </tr>
                        );
                      }
                    )}
                </>
              }
              scrollRows={
                <>
                  {ticketList &&
                    ticketList.content.map(
                      ({
                        usedAt,
                        ticketUsedStateMeaning,
                        productOrderId,
                        purchaseUserName,
                        phoneNumber,
                        productId,
                        productName,
                        directOption,
                        cancelOrReturnStateMeaning,
                      }) => {
                        return (
                          <tr key={productOrderId}>
                            <TableCell
                              className={ticketUsedStateMeaning === "사용가능" ? "blue" : "red"}
                            >
                              {ticketUsedStateMeaning}
                            </TableCell>
                            <TableCell>{usedAt ? usedAt : "-"}</TableCell>
                            <TableCell>
                              <Row
                                $gap="8px"
                                $jus="center"
                                $align="center"
                              >
                                <Text>{cancelOrReturnStateMeaning}</Text>
                                {cancelOrReturnStateMeaning === "반품요청" && (
                                  <WhiteBtn
                                    $pad="4px 12px"
                                    $w="fit-content"
                                    msg="반품철회"
                                    onClick={() => refundReject(productOrderId)}
                                  />
                                )}
                              </Row>
                            </TableCell>
                            <TableCell>{purchaseUserName ? purchaseUserName : "-"}</TableCell>
                            <TableCell>{phoneNumber ? phoneNumber : "-"}</TableCell>
                            <TableCell>{productId}</TableCell>
                            <TableCell>{productName}</TableCell>
                            <TableCell>{directOption}</TableCell>
                          </tr>
                        );
                      }
                    )}
                </>
              }
            ></ScrollTable>
          )}
        </Column>
      </MorphismBox>
      <Paging pageData={ticketList} />
    </>
  );
}
