import { Row, TableCell } from "@/assets/style/common/useCommonStyle";

import { ScrollTable } from "@/hooks/useTable";
import { BlueBtn, WhiteBtn } from "@/hooks/useButton";

import GetChannel from "@/util/GetChannel";

const RequestTable = ({ list, requestClick, rejectClick }) =>
  list.map(
    ({
      id,
      channel,
      productId,
      directOption,
      purchaseUserName,
      phoneNumber,
      productName,
      channelProductOrderId,
      channelDetail,
      cancelOrReturnState,
      orderStateMeaning,
      cancelOrReturnStateMeaning,
    }) => (
      <tr key={id}>
        <TableCell>
          <Row
            $gap="8px"
            $jus="center"
          >
            <BlueBtn
              $pad="4px 12px"
              $w="fit-content"
              msg="승인"
              disabled={cancelOrReturnState === "사용완료"}
              onClick={() => requestClick(id, cancelOrReturnState, channel)}
            />
            <WhiteBtn
              $pad="4px 12px"
              $w="fit-content"
              msg="거부"
              disabled={cancelOrReturnState === "취소요청"}
              onClick={() =>
                rejectClick({
                  id,
                  productId,
                  directOption,
                  purchaseUserName,
                  phoneNumber,
                  productName,
                })
              }
            />
          </Row>
        </TableCell>
        <TableCell className="blue">{id}</TableCell>
        <TableCell>
          <GetChannel channel={channelDetail} />
        </TableCell>
        <TableCell className="break">{channelProductOrderId}</TableCell>
        <TableCell>{orderStateMeaning}</TableCell>
        <TableCell className="red">{cancelOrReturnStateMeaning}</TableCell>
      </tr>
    )
  );

const RequestScrollTable = ({ list }) =>
  list.map(
    ({
      id,
      productId,
      purchaseAt,
      productName,
      phoneNumber,
      directOption,
      purchaseUserId,
      purchaseQuantity,
      purchaseUserName,
      cancelOrReturnAt,
      cancelOrReturnReason,
    }) => (
      <tr key={id}>
        <TableCell>{purchaseAt}</TableCell>
        <TableCell>{cancelOrReturnAt}</TableCell>
        <TableCell className="blue_under">{cancelOrReturnReason}</TableCell>
        <TableCell>{productId}</TableCell>
        <TableCell>{productName}</TableCell>
        <TableCell>{directOption}</TableCell>
        <TableCell>{purchaseQuantity}</TableCell>
        <TableCell>{purchaseUserName ? purchaseUserName : "-"}</TableCell>
        <TableCell>{phoneNumber ? phoneNumber : "-"}</TableCell>
        <TableCell>{purchaseUserId ?? "-"}</TableCell>
      </tr>
    )
  );

const SuccessTable = ({ list }) =>
  list.map(
    ({
      id,
      purchaseAt,
      channelProductOrderId,
      orderStateMeaning,
      channelDetail,
      cancelOrReturnStateMeaning,
    }) => (
      <tr key={id}>
        <TableCell className="blue_under">{id}</TableCell>
        <TableCell>
          <GetChannel channel={channelDetail} />
        </TableCell>
        <TableCell>{channelProductOrderId}</TableCell>
        <TableCell>{orderStateMeaning}</TableCell>
        <TableCell>{cancelOrReturnStateMeaning ? cancelOrReturnStateMeaning : "-"}</TableCell>
        <TableCell>{purchaseAt}</TableCell>
      </tr>
    )
  );

const SuccessScrollTable = ({ list }) =>
  list.map(
    ({
      id,
      productId,
      phoneNumber,
      productName,
      directOption,
      purchaseUserId,
      purchaseQuantity,
      purchaseUserName,
      cancelOrReturnCompleteAt,
      cancelOrReturnReason,
      cancelOrReturnRequestAt,
    }) => (
      <tr key={id}>
        <TableCell>{cancelOrReturnRequestAt}</TableCell>
        <TableCell>{cancelOrReturnCompleteAt}</TableCell>
        <TableCell className="blue_under">{cancelOrReturnReason}</TableCell>
        <TableCell>{productId}</TableCell>
        <TableCell>{productName}</TableCell>
        <TableCell>{directOption}</TableCell>
        <TableCell>{purchaseQuantity}</TableCell>
        <TableCell>{purchaseUserName ? purchaseUserName : "-"}</TableCell>
        <TableCell>{phoneNumber ? phoneNumber : "-"}</TableCell>
        <TableCell>{purchaseUserId ?? "-"}</TableCell>
      </tr>
    )
  );

export default function Table({
  refundReject,
  refundRequest,
  list,
  headers,
  scrollHeaders,
  isSuccess,
}) {
  return (
    <ScrollTable
      headers={headers}
      scrollHeaders={scrollHeaders}
      fixedRows={
        isSuccess ? (
          <SuccessTable list={list} />
        ) : (
          <RequestTable
            list={list}
            rejectClick={refundReject}
            requestClick={refundRequest}
          />
        )
      }
      scrollRows={
        isSuccess ? <SuccessScrollTable list={list} /> : <RequestScrollTable list={list} />
      }
    />
  );
}
