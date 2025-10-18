import { useEffect } from "react";
import { usePageStore } from "./store/usePageStore";
import PagingBody from "@/containers/PagingBody";
import useQueryString from "./useQueryString";

interface PagingData {
  totalPages: number;
  number: number;
  size: number;
  totalElements?: number;
}

interface PagingProps {
  data?: any;
  pageData?: PagingData;
}

export default function Paging({ pageData }: PagingProps) {
  const { setParams } = useQueryString();
  const { currentPage, setCurrentPage } = usePageStore();

  const pageChange = (page: number) => {
    setCurrentPage(page);
    setParams({ page: String(page) });
  };

  const pageNumberFun = () => {
    if (!pageData) return [];

    const totalPage = pageData.totalPages;
    const current = pageData.number;
    const maxPagingView = 5;
    const currentGroup = Math.floor(current / maxPagingView);
    const start = currentGroup * maxPagingView + 1;
    const end = Math.min(start + maxPagingView - 1, totalPage);

    const pageArray = [];
    for (let i = start; i <= end; i++) {
      pageArray.push(i);
    }
    return pageArray;
  };

  const pageNumbers = pageNumberFun();

  useEffect(() => {
    setCurrentPage(pageData?.number || 0);
  }, []);

  return pageData?.totalPages > 1 ? (
    <PagingBody
      pageData={pageData}
      onClick={pageChange}
      currentPage={currentPage}
      pageNumbers={pageNumbers}
    />
  ) : null;
}
