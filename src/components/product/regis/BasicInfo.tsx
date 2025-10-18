import CheckButton from "./CheckButton";
import SubTitle from "@/components/header/SubTitle";
import {
  Column,
  Img,
  InfoLineBox,
  RegisTitle,
  Row,
  Text,
} from "@/assets/style/common/useCommonStyle";
import { useImg } from "@/assets/style/common/useImg";

import Input from "@/hooks/Input";
import { useInputStore } from "@/hooks/store/useInputStore";
import { BasicCheck } from "@/hooks/useCheck";
import { BasicInfoProps } from "@/typeing/productInterface";
import { useChecked } from "@/util/useChecked";
import { useChannel } from "@/hooks/api/reactQuery/query/useEnums";
import ErrorMessage from "@/hooks/ErrorMessage";
import { useGlobalStore } from "@/hooks/store/useGlobalStore";

export default function BasicInfo({
  state,
  isChecked,
  useSelect,
  isEachCheck,
  setUseSelect,
}: BasicInfoProps) {
  const { required } = useImg();
  const { decoded } = useGlobalStore();
  const {
    product: { productName, productPrice, discountRate, discountPrice, stockNo },
  } = useInputStore();
  const { data: channel } = useChannel();

  useChecked(channel);

  return (
    <>
      <SubTitle title={"기본 정보"} />
      <InfoLineBox>
        <RegisTitle>
          <Text>상품명</Text>
          <Img
            $w="16px"
            $h="16px"
            src={required}
            alt="required"
          />
        </RegisTitle>
        <Column
          $gap="8px"
          $w="100%"
          $align="end"
        >
          <Input
            $maxW="100%"
            name="productName"
            value={productName}
            place="상품명을 입력해주세요."
          />
          <Text>{`${productName.length} / 100`}</Text>
        </Column>
      </InfoLineBox>
      <InfoLineBox>
        <RegisTitle>
          <Text>상품가격</Text>
          <Img
            $w="16px"
            $h="16px"
            src={required}
            alt="required"
          />
        </RegisTitle>
        <Row
          $w="100%"
          $gap="8px"
          $align="center"
        >
          <Input
            $maxW="320px"
            name="productPrice"
            place="상품가격을 입력해주세요."
            value={productPrice === 0 ? "" : productPrice.toLocaleString()}
          />
          <Text>원</Text>
        </Row>
      </InfoLineBox>
      <InfoLineBox>
        <RegisTitle>
          <Text>할인</Text>
        </RegisTitle>
        <Column $gap="14px">
          <CheckButton
            name="discount"
            titles={["사용", "미사용"]}
            state={useSelect.discount}
            setState={setUseSelect}
          />
          {useSelect.discount === 1 && (
            <>
              <Row
                $align="center"
                $gap="8px"
              >
                <Input
                  $maxW="320px"
                  place="할인률을 입력해주세요."
                  name="discountRate"
                  value={discountRate === 0 ? "" : discountRate?.toLocaleString()}
                />
                <Text $class={"title"}>%</Text>
              </Row>
              <Column>
                <Text $class={"captionB"}>1 ~ 99 사이 숫자로 입력해주세요.</Text>
                <Text $class={"captionB"}>할인된 총 가격을 100원 이상으로 입력해주세요.</Text>
              </Column>
              <Row
                $w="320px"
                $jus="space-between"
              >
                <Text $class={"title"}>할인적용 가격</Text>
                <Row $gap="4px">
                  {discountPrice !== null && discountRate !== 0 && (
                    <Text $class={"title"}>{discountPrice?.toLocaleString()}</Text>
                  )}
                  <Text $class={"title"}>원</Text>
                </Row>
              </Row>
              <ErrorMessage name="discountPrice" />
            </>
          )}
        </Column>
      </InfoLineBox>
      {useSelect.sale !== 3 && (
        <InfoLineBox>
          <RegisTitle>
            <Text>재고수량</Text>
            <Img
              $w="16px"
              $h="16px"
              src={required}
              alt="required"
            />
          </RegisTitle>
          <Column
            $gap="8px"
            $w="100%"
          >
            <Input
              $maxW="320px"
              name="stockNo"
              place="재고수량을 입력해주세요."
              value={stockNo === 0 ? "" : stockNo.toLocaleString()}
            />
            <Text $class="caption">1 이상의 숫자를 입력해주세요.</Text>
          </Column>
        </InfoLineBox>
      )}

      <InfoLineBox>
        <RegisTitle>상품상태</RegisTitle>
        <CheckButton
          name="sale"
          titles={state ? ["판매중", "판매 중지", "품절"] : ["판매 중"]}
          state={useSelect.sale}
          setState={setUseSelect}
        />
      </InfoLineBox>

      <InfoLineBox>
        <RegisTitle>판매채널</RegisTitle>
        {useSelect.channel ? (
          <>
            <Text
              $class="blue"
              $textDeco="underline"
            >
              {useSelect.channel}
            </Text>
          </>
        ) : (
          <>
            {channel &&
              channel.map((item) => (
                <Row
                  key={item.index}
                  $gap="8px"
                  $align="center"
                >
                  <BasicCheck
                    meaning={item.channel}
                    checked={isChecked(item.index)}
                    isDefault={item.isDefault}
                    disabled={decoded.role === "ROLE_GUEST"}
                    onChange={() => isEachCheck(item.index)}
                  />
                  <Text
                    as="label"
                    htmlFor={item.channel}
                    $class="subText"
                  >
                    {item.meaning}
                  </Text>
                </Row>
              ))}
          </>
        )}
      </InfoLineBox>
    </>
  );
}
