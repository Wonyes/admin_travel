import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { fetchData } from "./useQuerys";

export function useProductDetail({ url, params }: { url: string; params?: object }) {
  return useQuery({
    queryKey: [queryKeys.product.detail, url, params],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
}

export function useProductModify({ url, params }: { url: string; params?: object }) {
  return useQuery({
    queryKey: [queryKeys.product.modify, url],
    queryFn: () => fetchData({ url, params }),
  });
}

export function useAllProduct({ params }: { params?: object }) {
  const url = "product";
  return useQuery({
    queryKey: [queryKeys.product.all, url, params],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
}
export function useRecommend() {
  const url = "recommended";
  return useQuery({
    queryKey: [queryKeys.product.recommend, url],
    queryFn: () => fetchData({ url }),
    staleTime: 0,
  });
}
