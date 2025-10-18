import { Column } from "@/assets/style/common/useCommonStyle";
import { OrderInfoView } from "./order/OrderInfoView";
import OrderWarning from "./order/OrderWarning";
import RejectFiled from "./order/RejectFiled";

const warningMessage = [
  {
    key: 1,
    message: "구매자에게 반품불가 사유를  사전에 안내하시고 반품 철회 처리를 진행해 주세요.",
  },
  { key: 2, message: "입력하신 반품거부 사유는 구매자에게 안내됩니다." },
];

export default function RefundReject({ data }: any) {
  return (
    <Column $gap="22px">
      <OrderWarning warningMessage={warningMessage} />
      <OrderInfoView
        orderNumber={data.id}
        productNumber={data.productId}
        reservationDate={data.directOption}
        buyername={data.purchaseUserName}
        buyerPhone={data.phoneNumber}
      />
      <RejectFiled />
    </Column>
  );
}
