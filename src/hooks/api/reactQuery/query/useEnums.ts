import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { fetchData } from "./useQuerys";

// 상품 문의내역 필터
export const useTicketCondition = () => {
  const url = "enums/ticket/search-condition";
  return useQuery({
    queryKey: [queryKeys.enums.ticket, url],
    queryFn: () => fetchData({ url }),
    staleTime: 0,
  });
};

// 상품 문의내역 필터
export const useFilterInquiry = () => {
  const url = "enums/inquiry/states";
  return useQuery({
    queryKey: [queryKeys.enums.inquiryFilter, url],
    queryFn: () => fetchData({ url }),
    staleTime: 1000 * 60,
  });
};
// 상품 문의내역 검색조건
export const useInquiryCondition = () => {
  const url = "enums/inquiry/search-condition";
  return useQuery({
    queryKey: [queryKeys.enums.inquiryCondition, url],
    queryFn: () => fetchData({ url }),
    staleTime: 1000 * 60,
  });
};

// 취소 이유
export const useCancelReason = () => {
  const url = "enums/product-order/cancel-reason";
  return useQuery({
    queryKey: [queryKeys.enums.cancelReason, url],
    queryFn: () => fetchData({ url }),
    staleTime: 1000 * 60,
  });
};

// 반품이유
export const useReturnReason = () => {
  const url = "enums/product-order/return-reason";
  return useQuery({
    queryKey: [queryKeys.enums.returnReason, url],
    queryFn: () => fetchData({ url }),
    staleTime: 1000 * 60,
  });
};

// 취소/반품 상태
export const useCancelReturnState = () => {
  const url = "enums/product-order/cancel-return-state";
  return useQuery({
    queryKey: [queryKeys.enums.cancelReturnState, url],
    queryFn: () => fetchData({ url }),
    staleTime: 1000 * 60,
  });
};

// 전체 주문내역 > 조회기간
export const useCriteria = () => {
  const url = "enums/product-order/data-criteria";
  return useQuery({
    queryKey: [queryKeys.enums.criteria, url],
    queryFn: () => fetchData({ url }),
    staleTime: 1000 * 60,
  });
};

// 티켓발급 취소관리 리스트 > 조회기간
export const useNonTicektCriteria = () => {
  const url = "enums/product-order/non-ticket/data-criteria";
  return useQuery({
    queryKey: [queryKeys.enums.nonTicketCriteria, url],
    queryFn: () => fetchData({ url }),
    staleTime: 1000 * 60,
  });
};

// 주문상태 드롭박스
export const useOrderState = () => {
  const url = "enums/product-order/product-order-state";
  return useQuery({
    queryKey: [queryKeys.enums.orderState, url],
    queryFn: () => fetchData({ url }),
    staleTime: 1000 * 60,
  });
};

// 취소/반품완료 조회기간
export const useCompleteCriteria = (success?: string) => {
  const url =
    success === "success"
      ? "enums/product-order/return-complete/data-criteria"
      : "enums/product-order/return-request/data-criteria";
  return useQuery({
    queryKey: [queryKeys.enums.changeCriteria, url],
    queryFn: () => fetchData({ url }),
    staleTime: 1000 * 60,
  });
};

// 상세조건
export const useSearchCondition = () => {
  const url = "enums/product-order/search-condition";
  return useQuery({
    queryKey: [queryKeys.enums.searchCondition, url],
    queryFn: () => fetchData({ url }),
    staleTime: 1000 * 60,
  });
};

// 상품 판매 채널
export const useChannel = () => {
  const url = "enums/product/channel";
  return useQuery({
    queryKey: [queryKeys.enums.channel, url],
    queryFn: () => fetchData({ url }),
    staleTime: 1000 * 60,
  });
};

// 상품 상태 (등록,수정 페이지)
export const useSaleState = () => {
  const url = "enums/product/sales/states";
  return useQuery({
    queryKey: [queryKeys.enums.saleState, url],
    queryFn: () => fetchData({ url }),
    staleTime: 1000 * 60,
  });
};

// 상품 상태 (검색)
export const useSearchState = (params: object) => {
  const url = "enums/product/states";
  return useQuery({
    queryKey: [queryKeys.enums.searchState, url],
    queryFn: () => fetchData({ url, params }),
    staleTime: 1000 * 60,
  });
};

// 유저 벤 기간
export const useBanPeriod = () => {
  const url = "enums/user/ban-period";
  return useQuery({
    queryKey: [queryKeys.enums.ban, url],
    queryFn: () => fetchData({ url }),
    staleTime: 1000 * 60,
  });
};

// 유저 벤 기간
export const useBanSatae = () => {
  const url = "enums/report/ban-state";
  return useQuery({
    queryKey: [queryKeys.enums.ban, url],
    queryFn: () => fetchData({ url }),
    staleTime: 1000 * 60,
  });
};
