import { Column } from "@/assets/style/common/useCommonStyle";

import { OrderInfoView } from "./order/OrderInfoView";
import OrderWarning from "./order/OrderWarning";
import OrderReason from "./order/OrderReason";
import { useCancelReason, useReturnReason } from "@/hooks/api/reactQuery/query/useEnums";

const warningMessage = [
  {
    key: 1,
    message:
      "판매취소 사유를 실제 사유와 무관하게 임의 설정하거나 구매자의 동의 없이 임의로 취소할 경우 고의적 부당행위로 간주, 판매관리 프로그램에 의해 조치될 수 있으니 정확한 사유를 선택해주세요.",
  },
  {
    key: 2,
    message: " 입력된 취소사유는 구매자에게 안내됩니다.",
  },
];

export default function OrderRefundModal({ data }: any) {
  const { data: cancelReason } = useCancelReason();
  const { data: returnReason } = useReturnReason();

  const reasonTitle =
    data.availableCancelOrReturnState === "CANCEL_REQUEST" ? "취소 사유" : "반품 사유";

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
      <OrderReason
        title={reasonTitle}
        reason={
          data.availableCancelOrReturnState === "CANCEL_REQUEST" ? cancelReason : returnReason
        }
      />
    </Column>
  );
}
