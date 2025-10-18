import { Column, Img, MorphismBox, Row, Text } from "@/assets/style/common/useCommonStyle";
import { useBanPeriod } from "@/hooks/api/reactQuery/query/useEnums";
import DropDown from "@/hooks/DropDown";
import { CommonProps } from "@/typeing/styleInterface";
import styled from "styled-components";

const ReportReason = styled.div`
  overflow-y: auto;
  max-height: 60px;
  height: 60px;
  padding: 8px;
  border-radius: 8px;
`;

const ThumbnailWrap = styled.div<Partial<CommonProps>>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.$w || "100%"};
  min-width: ${(props) => props.$w};
  max-width: ${(props) => props.$maxW || "600px"};
  max-height: ${(props) => props.$maxH || "720px"};
  height: ${(props) => props.$h ?? "100%"};
  margin: ${(props) => props.$mar};
  border-radius: ${(props) => props.$radius};
  background: var(--c-input);
  border-radius: ${(props) => props.$radius};
  cursor: ${(props) => props.$cursor};
`;

const ThumbnailBox = styled.a<Pick<CommonProps, "$aspect">>`
  display: flex;
  position: relative;
  aspect-ratio: ${(props) => (props.$aspect ? props.$aspect : 5 / 6)};

  width: 100%;
  height: 100%;

  & > * img {
    inset: 0;
    margin: auto;
  }
`;

const ReviewContainer = styled(Column)`
  gap: 16px;
`;

const ReviewImgWrap = styled(Row)`
  overflow-x: auto;
  padding: 4 8px;
  margin-bottom: -12px;

  &::-webkit-scrollbar {
    height: 4px;
    margin-top: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 999px;
  }
`;

export default function ReportModal({ data, reject }: { data: any; reject?: boolean }) {
  const { data: banPeriod } = useBanPeriod();

  const horiziontalWhell = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

  return (
    <Column
      $gap="8px"
      $maxW="700px"
    >
      <Text
        as="h3"
        $class="red"
      >
        신고 내용
      </Text>
      <MorphismBox>
        <Column $gap="4px">
          <Row>
            <Text
              $class={["captionB", "blue"]}
              $minW="80px"
            >
              상품명
            </Text>
            <Text $class="captionB">: {data.productName}</Text>
          </Row>

          <Row>
            <Text
              $class={["captionB", "blue"]}
              $minW="80px"
            >
              상품번호
            </Text>
            <Text $class="captionB">: {data.productId}</Text>
          </Row>

          <Row>
            <Text
              $minW="80px"
              $class={["captionB", "red"]}
            >
              닉네임
            </Text>
            <Text $class="captionB"> : {data.memberNickname}</Text>
          </Row>
          <Row>
            <Text
              $minW="80px"
              $class={["captionB", "red"]}
            >
              유저번호
            </Text>
            <Text $class="captionB"> : {data.memberNo}</Text>
          </Row>
          <Row>
            <Text
              $minW="80px"
              $class={["captionB", "red"]}
            >
              유저 휴대번호
            </Text>
            <Text $class="captionB"> : {data.memberPhone}</Text>
          </Row>
          <Row>
            <Text
              $minW="80px"
              $class={["captionB", "blue"]}
            >
              신고 분류
            </Text>
            <Text $class="captionB"> : {data.titleMeaning}</Text>
          </Row>
          <Column $gap="4px">
            <Row $align="center">
              <Text
                $minW="80px"
                $class={["captionB", "blue"]}
              >
                신고 내용
              </Text>
              <Text>:</Text>
            </Row>
            <ReportReason className="morphism">
              <Text $class="captionB">{data.reason}</Text>
            </ReportReason>
          </Column>

          <Column $gap="4px">
            <Row $align="center">
              <Text
                $minW="80px"
                $class={["captionB", "blue"]}
              >
                리뷰 내용
              </Text>
              <Text>:</Text>
            </Row>
            <>
              <Column $backColor="var(--c-white)">
                <ReviewContainer className="morphism">
                  <ReviewImgWrap
                    $gap="4px"
                    onWheel={horiziontalWhell}
                  >
                    {data.reviewImages &&
                      data.reviewImages.map((item: string, index: string) => (
                        <ThumbnailWrap
                          key={index}
                          $w="150px"
                          $maxW="150px"
                          $radius="8px"
                        >
                          <ThumbnailBox $aspect="1/1">
                            <Img
                              src={item}
                              $w="100%"
                              $h="100%"
                              alt="reportImages"
                              $radius="8px"
                            />
                          </ThumbnailBox>
                        </ThumbnailWrap>
                      ))}
                  </ReviewImgWrap>
                  <ReportReason className="morphism">
                    <Text
                      $pad="8px 0 0"
                      $class="captionB"
                    >
                      {data.reviewContent}
                    </Text>
                  </ReportReason>
                </ReviewContainer>
              </Column>
            </>
          </Column>
        </Column>
      </MorphismBox>
      {data.isBanned && (
        <Row
          $pad="12px 0 0"
          $jus="center"
        >
          <Text $class={["title", "red"]}>제재기간 : {data.banPeriodRange}</Text>
        </Row>
      )}
      {!reject ||
        (data.isBanned && (
          <Column $gap="8px">
            <Text
              as="h3"
              $class="red"
            >
              제재기간
            </Text>
            <DropDown
              name="period"
              notSave={true}
              data={banPeriod}
            />
          </Column>
        ))}
    </Column>
  );
}
