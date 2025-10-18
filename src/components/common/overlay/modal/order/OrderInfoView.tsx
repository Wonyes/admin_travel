import { Column, Row, Text } from "@/assets/style/common/useCommonStyle";
import styled from "styled-components";
interface OrderInfoProps {
  orderNumber?: number;
  productNumber?: string;
  reservationDate?: string;
  buyername?: string;
  buyerPhone?: string;
}

const OrderInfo = styled.div`
  border-radius: 8px;
  background-color: var(--c-input);

  width: 100%;
  padding: 8px 16px;

  display: flex;
  align-items: flex-start;
`;
export function OrderInfoView({
  orderNumber,
  productNumber,
  reservationDate,
  buyerPhone,
  buyername,
}: OrderInfoProps) {
  return (
    <Column
      $gap="8px"
      $align="flex-start"
    >
      <Text>주문 정보</Text>
      <OrderInfo>
        <Text
          $w="130px"
          $tAlign="left"
          $class="subTitle"
        >
          주문 번호
        </Text>
        <Text
          $flex="1"
          $tAlign="left"
          $class="subTitle"
        >
          상품 번호
        </Text>
        <Text
          $w="130px"
          $tAlign="left"
          $class="subTitle"
        >
          구매자 정보
        </Text>
      </OrderInfo>
      <Row
        $w="100%"
        $pad="0px 16px 8px"
        $borB="1px solid var(--c-line)"
      >
        <Text
          $w="130px"
          $tAlign="left"
          $pad="0 16px 0 0"
        >
          {orderNumber}
        </Text>
        <Column
          $flex="1"
          $pad="0 16px 0 0"
        >
          <Text $tAlign="left">{productNumber}</Text>
          <Text $tAlign="left">예약날짜 : {reservationDate}</Text>
        </Column>

        <Column
          $w="130px"
          $pad="0 16px 0 0"
        >
          <Text $tAlign="left">{buyername}</Text>
          <Text $tAlign="left">{buyerPhone}</Text>
        </Column>
      </Row>
    </Column>
  );
}
