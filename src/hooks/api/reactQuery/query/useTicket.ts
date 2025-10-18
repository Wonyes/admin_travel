import { useQuery } from "@tanstack/react-query";

import { fetchData } from "./useQuerys";
import { queryKeys } from "../queryKeys";

export function useTicketList(params: {
  page: number | string;
  size: number;
  searchCondition?: string;
  searchKeyword?: string;
}) {
  const url = "/ticket";

  return useQuery({
    queryKey: [queryKeys.ticket, params.page, params.searchKeyword],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
}
