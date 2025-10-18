import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./useQuerys";
import { queryKeys } from "../queryKeys";

export function useAllOrderList(params: {
  page: number | string;
  size: number;
  startDate?: string;
  endDate?: string;
  searchKeyword?: string;
  searchCondition?: string;
  productOrderState?: string;
  cancelOrReturnState?: string;
  dateCriteria?: string;
}) {
  const url = "product-order";
  return useQuery({
    queryKey: [
      queryKeys.order.all,
      params.page,
      params.endDate,
      params.startDate,
      params.searchKeyword,
    ],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
}

export function useGetIssue(params?: {
  page: number | string;
  size: number;
  endDate: string;
  startDate: string;
  searchKeyword: string;
  dateCriteria: string;
  searchCondition: string;
}) {
  const url = "product-order/none-tickets";
  return useQuery({
    queryKey: [
      queryKeys.order.issue,
      params?.page,
      params?.endDate,
      params?.startDate,
      params?.searchKeyword,
    ],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
}

export function useReturnCount() {
  const url = "product-order/return-count";
  return useQuery({
    queryKey: [queryKeys.order.count],
    queryFn: () => fetchData({ url }),
    staleTime: 3000,
  });
}

export function useReturnList(
  url: string,
  params: {
    page: number | string;
    size: number;
    endDate: string;
    startDate: string;
    dateCriteria: string;
    searchKeyword: string;
    searchCondition: string;
  }
) {
  return useQuery({
    queryKey: [
      queryKeys.order.return,
      params.page,
      params.endDate,
      params.startDate,
      params.searchKeyword,
    ],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
}
