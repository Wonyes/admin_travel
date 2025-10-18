const requestHeaders = [
  { name: "취소/반품", key: 1, w: "120px" },
  { name: "주문번호", key: 2, w: "60px" },
  { name: "구매채널", key: 3, w: "56px" },
  { name: "소셜상품주문번호", key: 4, w: "300px" },
  { name: "주문상태", key: 5, w: "88px" },
  { name: "티켓상태", key: 6, w: "88px" },
];

const requestScrollHeaders = [
  { name: "주문일시", key: 8, w: "160px" },
  { name: "취소/반품요청일시", key: 9, w: "160px" },
  { name: "취소/반품요청사유", key: 10, w: "120px" },
  { name: "상품번호", key: 12, w: "160px" },
  { name: "상품명", key: 13, w: "200px" },
  { name: "옵션", key: 14, w: "200px" },
  { name: "수량", key: 15, w: "56px" },
  { name: "구매자명", key: 16, w: "120px" },
  { name: "구매자연락처", key: 17, w: "120px" },
  { name: "구매자ID", key: 18, w: "120px" },
];

const successHeaders = [
  { name: "주문번호", key: 2, w: "60px" },
  { name: "구매채널", key: 3, w: "56px" },
  { name: "소셜상품주문번호", key: 4, w: "300px" },
  { name: "주문상태", key: 5, w: "88px" },
  { name: "취소/반품상태", key: 6, w: "120px" },
  { name: "주문일시", key: 7, w: "160px" },
];

const successScrollHeaders = [
  { name: "취소/반품요청일시", key: 8, w: "160px" },
  { name: "환불일시", key: 9, w: "160px" },
  { name: "취소/반품요청사유", key: 10, w: "160px" },
  { name: "상품번호", key: 11, w: "160px" },
  { name: "상품명", key: 12, w: "200px" },
  { name: "옵션", key: 13, w: "200px" },
  { name: "수량", key: 14, w: "56px" },
  { name: "구매자명", key: 15, w: "120px" },
  { name: "구매자연락처", key: 16, w: "120px" },
  { name: "구매자ID", key: 17, w: "120px" },
];

const adminHeaders = [
  { name: "수정 / 삭제", key: 1, w: "120px" },
  { name: "아이디", key: 2, w: "160px" },
  { name: "권한", key: 3, w: "160px" },
];

const orderHeaders = [
  { name: "판매자취소/반품", key: 1, w: "100px" },
  { name: "주문번호", key: 2, w: "56px" },
  { name: "구매채널", key: 3, w: "56px" },
  { name: "주문상태", key: 4, w: "88px" },
  { name: "티켓상태", key: 5, w: "88px" },
  { name: "취소/반품상태", key: 6, w: "180px" },
];

const orderScrollHeaders = [
  { name: "주문일시", key: 7, w: "160px" },
  { name: "상품번호", key: 8, w: "200px" },
  { name: "상품명", key: 9, w: "200px" },
  { name: "옵션", key: 10, w: "200px" },
  { name: "수량", key: 11, w: "200px" },
  { name: "구매자명", key: 12, w: "200px" },
  { name: "구매자연락처", key: 13, w: "200px" },
  { name: "구매자ID", key: 14, w: "200px" },
];

const issueHeaders = [
  { name: "티켓 발급/취소", key: 1, w: "120px" },
  { name: "주문번호", key: 2, w: "160px" },
  { name: "구매채널", key: 3, w: "56px" },
  { name: "소셜상품주문번호", key: 4, w: "300px" },
  { name: "주문상태", key: 5, w: "88px" },
  { name: "티켓상태", key: 6, w: "88px" },
];

const issueScrollHeaders = [
  { name: "주문일시", key: 8, w: "160px" },
  { name: "발급기한", key: 9, w: "160px" },
  { name: "상품번호", key: 10, w: "160px" },
  { name: "상품명", key: 11, w: "200px" },
  { name: "옵션", key: 12, w: "200px" },
  { name: "수량", key: 13, w: "56px" },
  { name: "구매자명", key: 14, w: "120px" },
  { name: "구매자연락처", key: 15, w: "120px" },
  { name: "구매자ID", key: 16, w: "120px" },
];

const productHeaders = [
  { name: "수정/삭제", key: 1, w: "140px" },
  { name: "판매 채널", key: 2, w: "80px" },
  { name: "상품 번호", key: 3, w: "80px" },
  { name: "상품명", key: 4, w: "300px" },
];

const productScrollHeaders = [
  { name: "판매 상태", key: 5, w: "120px" },
  { name: "재고 수량", key: 6, w: "120px" },
  { name: "가격", key: 7, w: "160px" },
  { name: "할인가", key: 8, w: "160px" },
  { name: "할인율", key: 9, w: "160px" },
];

const ticketHeaders = [
  { name: "티켓 사용", key: 0, w: "80px" },
  { name: "주문 번호", key: 1, w: "160px" },
  { name: "구매 채널", key: 2, w: "80px" },
  { name: "소셜상품주문번호", key: 3, w: "300px" },
  { name: "구매수량", key: 4, w: "80px" },
];

const ticketScrollHeaders = [
  { name: "티켓상태", key: 5, w: "88px" },
  { name: "티켓사용일시", key: 6, w: "160px" },
  { name: "취소/반품상태", key: 7, w: "160px" },
  { name: "구매자 명", key: 8, w: "120px" },
  { name: "구매자 연락처", key: 9, w: "120px" },
  { name: "상품 번호", key: 10, w: "160px" },
  { name: "상품명", key: 11, w: "200px" },
  { name: "옵션", key: 12, w: "160px" },
];

const counselHeaders = [
  { name: "-", key: 0, w: "80px" },
  { name: "No.", key: 1, w: "80px" },
  { name: "상품채널", key: 2, w: "80px" },
  { name: "상품번호", key: 3, w: "80px" },
  { name: "문의내용", key: 4 },
];

const counselScrollHeaders = [
  { name: "상품명", key: 4, w: "160px" },
  { name: "답변 상태", key: 5, w: "60px" },
  { name: "답변일", key: 6, w: "60px" },
  { name: "문의일", key: 7, w: "60px" },
  { name: "닉네임", key: 8, w: "100px" },
  { name: "유저번호", key: 9, w: "60px" },
];

const qaHeaders = [
  { name: "-", key: 0, w: "80px" },
  { name: "상품채널", key: 1, w: "80px" },
  { name: "문의번호", key: 2, w: "80px" },
  { name: "문의내용", key: 3 },
];

const qaScrollHeaders = [
  { name: "답변 상태", key: 5, w: "120px" },
  { name: "답변일", key: 6, w: "120px" },
  { name: "문의일", key: 7, w: "160px" },
  { name: "닉네임", key: 8, w: "120px" },
  { name: "유저번호", key: 9, w: "160px" },
];

const reportHeaders = [
  { name: "제재/반려", key: 1, w: "120px" },
  { name: "신고 유저", key: 2, w: "90px" },
  { name: "신고 유저 이름", key: 3, w: "160px" },
  { name: "신고 유저 번호", key: 4, w: "130px" },
];

const reportScrollHeaders = [
  { name: "상품번호", key: 15, w: "120px" },
  { name: "상품명", key: 14, w: "700px" },
  { name: "신고 대상 유저", key: 5, w: "90px" },
  { name: "신고 대상 유저 이름", key: 6, w: "160px" },
  { name: "신고 대상 유저 닉네임", key: 7, w: "160px" },
  { name: "신고 대상 유저 번호", key: 8, w: "120px" },
  { name: "신고 사유", key: 9, w: "160px" },
  { name: "신고 상세 사유", key: 10, w: "300px" },
  { name: "신고일", key: 11, w: "140px" },
  { name: "제재일", key: 12, w: "140px" },
  { name: "제재기간", key: 13, w: "200px" },
];

export {
  adminHeaders,
  ticketHeaders,
  ticketScrollHeaders,
  productHeaders,
  productScrollHeaders,
  issueHeaders,
  issueScrollHeaders,
  orderHeaders,
  orderScrollHeaders,
  requestHeaders,
  requestScrollHeaders,
  successHeaders,
  successScrollHeaders,
  counselHeaders,
  counselScrollHeaders,
  qaHeaders,
  qaScrollHeaders,
  reportHeaders,
  reportScrollHeaders,
};
