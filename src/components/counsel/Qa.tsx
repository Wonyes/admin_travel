import Paging from "@/hooks/Paging";

import { Column, MorphismBox, Row, TableCell, Text } from "@/assets/style/common/useCommonStyle";
import { useQa } from "@/hooks/api/reactQuery/query/useCounsel";
import { usePageStore } from "@/hooks/store/usePageStore";
import { ScrollTable } from "@/hooks/useTable";
import { qaHeaders, qaScrollHeaders } from "@/constant/useHeader";
import { BlueBtn, RedBtn } from "@/hooks/useButton";
import GetChannel from "@/util/GetChannel";
import { useOverlay } from "@/hooks/useOverlay";
import CounselModal from "./CounselModal";
import useQueryString from "@/hooks/useQueryString";
import { useFilterInquiry } from "@/hooks/api/reactQuery/query/useEnums";
import Loading from "@/hooks/Loading";
import DropDown from "@/hooks/DropDown";
import DateFilter from "../common/calendar/DateFilter";
import Calendar from "../common/calendar/Calendar";
import NoItem from "../common/NoItem";
import { useMutation } from "@tanstack/react-query";
import { Put } from "@/hooks/api/reactQuery/mutate/useMutations";
import { useTextStore } from "@/hooks/store/useTextStore";

export default function Qa() {
  const { currentPage, size } = usePageStore();

  const { getParams } = useQueryString();

  const params = getParams();
  const { resetTextValues, inquiryAnswer } = useTextStore();

  const { openModal } = useOverlay();
  const { data: filter } = useFilterInquiry();
  const {
    data: qaData,
    isLoading,
    refetch,
  } = useQa({
    size,
    page: params.page ?? currentPage,
    endDate: params.endDate,
    startDate: params.startDate,
    filterInquiry: params.filter,
  });

  const { mutate: answerMutate } = useMutation({
    mutationFn: (id) => {
      return Put({
        url: `inquiry/${id}/reply`,
        body: {
          answer: inquiryAnswer,
        },
      });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const isCounsel = (data: { id; productName; answer; channel; inquiry; memberNo; nickname }) => {
    resetTextValues();
    openModal({
      subBtn: "닫기",
      mainBtn: "확인",
      title: "답변완료",
      content: <CounselModal data={data} />,
      onFunc: () => {
        answerMutate(data.id);
      },
    });
  };

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
        {qaData === undefined ? null : qaData.content.length === 0 ? (
          <NoItem text="접수된 1:1문의 내역이 없습니다." />
        ) : (
          <ScrollTable
            headers={qaHeaders}
            scrollHeaders={qaScrollHeaders}
            fixedRows={
              <>
                {qaData &&
                  qaData.content.map(
                    ({ id, answer, productName, channel, inquiry, memberNo, nickname }) => {
                      return (
                        <tr key={id}>
                          <TableCell>
                            <Row
                              $jus="center"
                              $gap="8px"
                            >
                              {answer ? (
                                <RedBtn
                                  msg={"보기"}
                                  $pad="4px 12px"
                                  $w="fit-content"
                                  onClick={() =>
                                    isCounsel({
                                      id,
                                      productName,
                                      channel,
                                      inquiry,
                                      memberNo,
                                      nickname,
                                      answer,
                                    })
                                  }
                                />
                              ) : (
                                <BlueBtn
                                  $w="fit-content"
                                  $pad="4px 12px"
                                  msg={"답변"}
                                  onClick={() =>
                                    isCounsel({
                                      id,
                                      productName,
                                      channel,
                                      inquiry,
                                      memberNo,
                                      nickname,
                                      answer,
                                    })
                                  }
                                />
                              )}
                            </Row>
                          </TableCell>
                          <TableCell>
                            <GetChannel channel={channel} />
                          </TableCell>

                          <TableCell>{id}</TableCell>

                          <TableCell className="text-blue">
                            {inquiry.length > 20 ? inquiry.slice(0, 20) + "..." : inquiry}
                          </TableCell>
                        </tr>
                      );
                    }
                  )}
              </>
            }
            scrollRows={
              <>
                {qaData &&
                  qaData.content.map(
                    ({ id, answerAt, nickname, inquiryAt, resolvedMeaning, memberNo }) => {
                      return (
                        <tr key={id}>
                          <TableCell
                            $color={resolvedMeaning === "미답변" ? "var(--c-blue)" : "var(--c-red)"}
                          >
                            {resolvedMeaning}
                          </TableCell>
                          <TableCell>{answerAt ? answerAt : "-"}</TableCell>
                          <TableCell>{inquiryAt}</TableCell>
                          <TableCell>{nickname?.slice(0, 10)}</TableCell>
                          <TableCell>{memberNo}</TableCell>
                        </tr>
                      );
                    }
                  )}
              </>
            }
          ></ScrollTable>
        )}
      </MorphismBox>
      <Paging pageData={qaData} />
    </>
  );
}
