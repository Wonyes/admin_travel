import Paging from "@/hooks/Paging";

import { Column, MorphismBox, Row, TableCell, Text } from "@/assets/style/common/useCommonStyle";
import { useReport } from "@/hooks/api/reactQuery/query/useCounsel";
import { usePageStore } from "@/hooks/store/usePageStore";
import { ScrollTable } from "@/hooks/useTable";
import { reportHeaders, reportScrollHeaders } from "@/constant/useHeader";
import useQueryString from "@/hooks/useQueryString";
import { useBanSatae } from "@/hooks/api/reactQuery/query/useEnums";
import Loading from "@/hooks/Loading";
import DropDown from "@/hooks/DropDown";
import DateFilter from "../common/calendar/DateFilter";
import Calendar from "../common/calendar/Calendar";
import NoItem from "../common/NoItem";
import { format } from "date-fns";
import { BlueBtn, LineBtn, RedBtn } from "@/hooks/useButton";
import ReportModal from "./modal/ReportModal";
import { useOverlay } from "@/hooks/useOverlay";
import { Patch } from "@/hooks/api/reactQuery/mutate/useMutations";
import { useMutation } from "@tanstack/react-query";

export default function Report() {
  const { getState } = usePageStore;
  const { getParams } = useQueryString();
  const { currentPage, size, setSelectMeaning } = usePageStore();

  const params = getParams();

  const { data: filter } = useBanSatae();
  const { openModal, openAlert } = useOverlay();
  const {
    data: getReport,
    isLoading,
    refetch,
  } = useReport({
    size,
    endDate: params.endDate,
    reportState: params.filter,
    startDate: params.startDate,
    page: params.page ?? currentPage,
  });

  const onReport = (data: {
    id;
    reason;
    isBanned?;
    reviewId: number;
    productId;
    reportedAt;
    reporterId;
    productName;
    memberPhone;
    reviewImages;
    titleMeaning;
    reviewContent;
    memberNickname;
    banPeriodRange?;
  }) => {
    getState().state = null;
    setSelectMeaning({ period: "" });
    openModal({
      title: "신고",
      content: <ReportModal data={data} />,
      mainBtn: "제재",
      subBtn: "취소",
      onFunc: () => {
        banReport(data.reviewId);
      },
    });
  };

  const onReject = (data: {
    id;
    reason;
    reviewId: number;
    productId;
    reportedAt;
    reporterId;
    memberPhone;
    productName;
    reviewImages;
    titleMeaning;
    reviewContent;
    memberNickname;
  }) => {
    getState().state = null;
    setSelectMeaning({ period: "" });

    openModal({
      title: "반려",
      content: (
        <ReportModal
          data={data}
          reject={true}
        />
      ),
      mainBtn: "반려",
      subBtn: "취소",
      onFunc: () => {
        notReport(data.reviewId);
      },
    });
  };

  const { mutate: banReport } = useMutation({
    mutationFn: (reviewId: number) => {
      return Patch({
        url: `report/${reviewId}/ban`,
        body: {
          period: getState().state,
        },
      });
    },
    onSuccess: () => {
      openAlert({
        title: "사용자 제재가 완료되었습니다.",
        mainBtn: "확인",
        onFunc: () => {
          refetch();
        },
      });
    },
  });
  const { mutate: notReport } = useMutation({
    mutationFn: (reviewId: number) => {
      return Patch({
        url: `report/${reviewId}/reject`,
      });
    },
    onSuccess: () => {
      openAlert({
        title: "제재 반려가 완료되었습니다.",
        mainBtn: "확인",
        onFunc: () => {
          refetch();
        },
      });
    },
  });
  console.log(getReport);
  if (isLoading) return <Loading />;

  return (
    <>
      <MorphismBox $h="fit-content">
        <Column $gap="16px">
          <Row
            $gap="12px"
            $align="center"
          >
            <Text $minW="100px">조회기간</Text>

            <DateFilter />
            <Calendar />
          </Row>

          <Row
            $gap="12px"
            $align="center"
          >
            <Text $minW="100px">답변상태</Text>
            <DropDown
              data={filter}
              name="filter"
              request={refetch}
            />
          </Row>
        </Column>
      </MorphismBox>

      <MorphismBox>
        {getReport === undefined ? null : getReport.content.length === 0 ? (
          <NoItem text="접수된 신고문의 내역이 없습니다." />
        ) : (
          <ScrollTable
            headers={reportHeaders}
            scrollHeaders={reportScrollHeaders}
            fixedRows={
              <>
                {getReport.content.map(
                  ({
                    id,
                    reason,
                    isBanned,
                    reviewId,
                    productId,
                    reporterId,
                    reportedAt,
                    memberPhone,
                    productName,
                    reviewImages,
                    titleMeaning,
                    reviewContent,
                    reporterPhone,
                    banPeriodRange,
                    memberNickname,
                    reporterNickname,
                  }) => (
                    <tr key={id}>
                      <TableCell>
                        <Row
                          $gap="8px"
                          $jus="center"
                        >
                          {isBanned ? (
                            <BlueBtn
                              $pad="4px 12px"
                              $w="fit-content"
                              msg="보기"
                              onClick={() =>
                                onReport({
                                  id,
                                  reason,
                                  reviewId,
                                  isBanned,
                                  productId,
                                  reportedAt,
                                  reporterId,
                                  productName,
                                  memberPhone,
                                  reviewImages,
                                  titleMeaning,
                                  reviewContent,
                                  banPeriodRange,
                                  memberNickname,
                                })
                              }
                            />
                          ) : (
                            <RedBtn
                              $pad="4px 12px"
                              $w="fit-content"
                              msg="제제"
                              onClick={() =>
                                onReport({
                                  id,
                                  reason,
                                  reviewId,
                                  productId,
                                  reportedAt,
                                  reporterId,
                                  productName,
                                  memberPhone,
                                  reviewImages,
                                  titleMeaning,
                                  reviewContent,
                                  memberNickname,
                                })
                              }
                            />
                          )}
                          {!isBanned && (
                            <LineBtn
                              msg="반려"
                              $pad="4px 12px"
                              $w="fit-content"
                              onClick={() =>
                                onReject({
                                  id,
                                  reason,
                                  reviewId,
                                  productId,
                                  reportedAt,
                                  reporterId,
                                  productName,
                                  memberPhone,
                                  reviewImages,
                                  titleMeaning,
                                  reviewContent,
                                  memberNickname,
                                })
                              }
                            />
                          )}
                        </Row>
                      </TableCell>

                      <TableCell>{reporterId}</TableCell>
                      <TableCell>{reporterNickname}</TableCell>
                      <TableCell>{reporterPhone}</TableCell>
                    </tr>
                  )
                )}
              </>
            }
            scrollRows={
              <>
                {getReport &&
                  getReport.content.map(
                    ({
                      id,
                      reason,
                      memberNo,
                      memberName,
                      memberNickname,
                      memberPhone,
                      titleMeaning,
                      productName,
                      productId,
                      bannedAt,
                      reportedAt,
                      banPeriodRange,
                    }) => {
                      return (
                        <tr key={id}>
                          <TableCell>{productId}</TableCell>
                          <TableCell>{productName}</TableCell>
                          <TableCell className="red">{memberNo}</TableCell>
                          <TableCell className="red">{memberName ? memberName : "-"}</TableCell>
                          <TableCell className="red">{memberNickname}</TableCell>
                          <TableCell className="red">{memberPhone}</TableCell>
                          <TableCell className="red">{titleMeaning}</TableCell>
                          <TableCell>{reason ? reason : "-"}</TableCell>
                          <TableCell>{format(reportedAt, "yyyy-MM-dd HH:mm")}</TableCell>
                          <TableCell className="red">
                            {bannedAt ? format(bannedAt, "yyyy-MM-dd HH:mm") : "-"}
                          </TableCell>
                          <TableCell className="red">{banPeriodRange}</TableCell>
                        </tr>
                      );
                    }
                  )}
              </>
            }
          ></ScrollTable>
        )}
      </MorphismBox>
      <Paging pageData={getReport} />
    </>
  );
}
