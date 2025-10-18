import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { fetchData } from "./useQuerys";

// 운영자 목록 조회
export function useAdminList(params: { size: number; page?: number | string }) {
  const url = "admin";

  return useQuery({
    queryKey: [queryKeys.admin.list, params],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
}

// 운영자 등록 시 중복 확인
export function useAdminExist(params: { id: string }) {
  const url = "admin/exist-id";

  return useQuery({
    queryKey: [queryKeys.admin.exist],
    queryFn: () => fetchData({ url, params }),
    staleTime: 1000 * 60 * 5,
    enabled: false,
  });
}
