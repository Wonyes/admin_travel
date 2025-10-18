import Paging from "@/hooks/Paging";

import {
  Between,
  Column,
  MorphismBox,
  Row,
  TableCell,
  Text,
} from "@/assets/style/common/useCommonStyle";
import { useCounsel } from "@/hooks/api/reactQuery/query/useCounsel";
import { usePageStore } from "@/hooks/store/usePageStore";
import { ScrollTable } from "@/hooks/useTable";
import { counselHeaders, counselScrollHeaders } from "@/constant/useHeader";
import { BlueBtn, RedBtn, WhiteBtn } from "@/hooks/useButton";
import { useNavigate } from "react-router-dom";
import GetChannel from "@/util/GetChannel";
import { useOverlay } from "@/hooks/useOverlay";
import CounselModal from "./CounselModal";
import DateFilter from "../common/calendar/DateFilter";
import DropDown from "@/hooks/DropDown";
import Calendar from "../common/calendar/Calendar";
import Input from "@/hooks/Input";
import { useFilterInquiry, useInquiryCondition } from "@/hooks/api/reactQuery/query/useEnums";
import useQueryString from "@/hooks/useQueryString";
import StateClear from "@/util/StateClear";
import { useInputStore } from "@/hooks/store/useInputStore";
import NoItem from "../common/NoItem";
import Loading from "@/hooks/Loading";
import { useMutation } from "@tanstack/react-query";
import { useTextStore } from "@/hooks/store/useTextStore";
import { Put } from "@/hooks/api/reactQuery/mutate/useMutations";

export default function Counsel() {
  const navigate = useNavigate();
  const { clear } = StateClear();
  const { currentPage, size } = usePageStore();
  const {
    condition: { counselSearchValue },
  } = useInputStore();
  const { getParams, setParams } = useQueryString();
  const { resetTextValues, inquiryAnswer } = useTextStore();

  const params = getParams();

  const { openModal } = useOverlay();
  const { data: filter } = useFilterInquiry();
  const { data: condition } = useInquiryCondition();
  const {
    data: counselData,
    refetch,
    isLoading,
  } = useCounsel({
    size,
    page: params.page ?? currentPage,
    endDate: params.endDate,
    startDate: params.startDate,
    searchKeyword: params.search,
    filterInquiry: params.filter,
    searchCondition: params.conditionState,
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

  const isCounsel = (data: { id; productName; channel; inquiry; memberNo; nickname; answer }) => {
    resetTextValues();

    openModal({
      subBtn: "닫기",
      mainBtn: "답변완료",
      title: "상품 문의 답변",
      content: <CounselModal data={data} />,
      onFunc: () => {
        if (!data.answer) {
          answerMutate(data.id);
        }
      },
    });
  };

  const paramsSave = () => {
    setParams({
      search: counselSearchValue ? decodeURI(counselSearchValue.toString()) : "",
    });

    refetch();
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
              />
            </Row>

            <Row
              $gap="12px"
              $align="center"
            >
              <Text $minW="100px">상세조건</Text>
              <DropDown
                data={condition}
                name="condition"
              />
              <Input
                name="counselSearchValue"
                value={counselSearchValue}
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
        {counselData === undefined ? null : counselData.content.length === 0 ? (
          <NoItem text="접수된 상품문의 내역이 없습니다." />
        ) : (
          <ScrollTable
            headers={counselHeaders}
            scrollHeaders={counselScrollHeaders}
            fixedRows={
              <>
                {counselData &&
                  counselData.content.map(
                    ({
                      id,
                      productId,
                      channel,
                      inquiry,
                      answer,
                      productName,
                      memberNo,
                      nickname,
                    }) => {
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
                          <TableCell>{id}</TableCell>
                          <TableCell>
                            <GetChannel channel={channel} />
                          </TableCell>
                          <TableCell
                            className="text-blue"
                            onClick={() => navigate(`/p.detail/${productId}`)}
                          >
                            {productId}
                          </TableCell>
                          <TableCell
                            className="text-blue"
                            onClick={() => navigate(`/p.detail/${productId}`)}
                          >
                            {inquiry.length > 10 ? inquiry.slice(0, 10) + "..." : inquiry}
                          </TableCell>
                        </tr>
                      );
                    }
                  )}
              </>
            }
            scrollRows={
              <>
                {counselData &&
                  counselData.content.map(
                    ({
                      id,
                      answerAt,
                      nickname,
                      productName,
                      inquiryAt,
                      resolvedMeaning,
                      memberNo,
                    }) => {
                      return (
                        <tr key={id}>
                          <TableCell>{productName}</TableCell>
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
      <Paging pageData={counselData} />
    </>
  );
}
