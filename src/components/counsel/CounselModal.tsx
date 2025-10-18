import { Between, Column, MorphismBox, Row, Text } from "@/assets/style/common/useCommonStyle";
import GetChannel from "@/util/GetChannel";
import TextFiled from "@/hooks/TextFiled";
import { useTextStore } from "@/hooks/store/useTextStore";
import styled from "styled-components";

const InquiryBox = styled.div`
  overflow-y: auto;
  max-height: 200px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid var(--c-input);
`;

export default function CounselModal({ data }: { data: any }) {
  const { inquiryAnswer } = useTextStore();
  if (!data) return null;
  return (
    <Column
      $gap="16px"
      $maxW="700px"
    >
      <Text
        as="h3"
        $class="title"
      >
        문의 내용
      </Text>
      <MorphismBox>
        <Column $gap="4px">
          {data.productName && (
            <Row>
              <Text
                $class={["captionB", "blue"]}
                $minW="80px"
              >
                상품명
              </Text>
              <Text $class="captionB"> {data.productName}</Text>
            </Row>
          )}
          <Row>
            <Text
              $minW="80px"
              $class={["captionB", "blue"]}
            >
              채널
            </Text>
            <GetChannel channel={data.channel} />
          </Row>
          <Row>
            <Text
              $minW="80px"
              $class={["captionB", "blue"]}
            >
              닉네임
            </Text>
            <Text $class="captionB"> : {data.nickname}</Text>
          </Row>
          <Row>
            <Text
              $minW="80px"
              $class={["captionB", "blue"]}
            >
              유저번호
            </Text>
            <Text $class="captionB"> : {data.memberNo}</Text>
          </Row>
          <Column $gap="4px">
            <Text $class={["captionB", "blue"]}>문의 내용</Text>
            <InquiryBox>
              <Text $class="captionB">{data.inquiry}</Text>
            </InquiryBox>
          </Column>
        </Column>
      </MorphismBox>

      <Column $gap="16px">
        <Text
          as="h3"
          $class="title"
        >
          {data.answer ? "답변내용" : "답변하기"}
        </Text>
        {data.answer ? (
          <MorphismBox>
            <Text
              as="pre"
              $wSpace="pre-wrap"
              $class="blue"
            >
              {data.answer}
            </Text>
          </MorphismBox>
        ) : (
          <>
            <TextFiled
              h="150px"
              name="inquiryAnswer"
              value={inquiryAnswer}
              place="답변을 입력해 주세요."
            />
            <Between>
              <Text $class="caption">답변은 최대 300자까지 작성 가능합니다.</Text>
              <Text $class="caption">{inquiryAnswer.length} / 300</Text>
            </Between>
          </>
        )}
      </Column>
    </Column>
  );
}
