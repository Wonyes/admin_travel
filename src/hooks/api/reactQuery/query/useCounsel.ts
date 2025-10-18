import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { fetchData } from "./useQuerys";

export function useCounsel(params: {
  size: number;
  page: string | number;
  endDate: string;
  startDate: string;
  searchKeyword: string;
  filterInquiry: string;
  searchCondition: string;
}) {
  const url = "inquiry/product";

  return useQuery({
    queryKey: [
      queryKeys.counsel.counsel,
      params.page,
      params.endDate,
      params.startDate,
      params.searchKeyword,
    ],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
}

export function useQa(params: object) {
  const url = "inquiry";

  return useQuery({
    queryKey: [queryKeys.counsel.qa, params],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
}
export function useReport(params: object) {
  const url = "report";

  return useQuery({
    queryKey: [queryKeys.counsel.report, params],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
}
