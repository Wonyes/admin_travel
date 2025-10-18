import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { Column, MorphismBox, Row, TableCell } from "@/assets/style/common/useCommonStyle";

import Paging from "@/hooks/Paging";
import Loading from "@/hooks/Loading";
import { Table } from "@/hooks/useTable";
import { useOverlay } from "@/hooks/useOverlay";
import useQueryString from "@/hooks/useQueryString";
import { BlueBtn, WhiteBtn } from "@/hooks/useButton";
import { usePageStore } from "@/hooks/store/usePageStore";
import { Delete } from "@/hooks/api/reactQuery/mutate/useMutations";
import { useAdminList } from "@/hooks/api/reactQuery/query/useAdmin";

import NoItem from "@/components/common/NoItem";
import SubTitle from "@/components/header/SubTitle";

import { adminHeaders } from "@/constant/useHeader";

export default function AdminInquiry() {
  const navigate = useNavigate();

  const { openConfirm } = useOverlay();
  const { getParams } = useQueryString();
  const { currentPage, size } = usePageStore();

  const parmas = getParams();
  const page = parmas.page ?? currentPage;

  const { data: getAdmin, isLoading, refetch } = useAdminList({ size, page: page });

  const { mutate: adminDelete } = useMutation({
    mutationFn: ({ memberNo }: { memberNo: number }) => {
      return Delete({
        url: "admin",
        params: {
          memberNo: memberNo,
        },
      });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const isDelete = (memberNo: number) => {
    openConfirm({
      title: "운영자를 삭제하시겠습니까?",
      message: "삭제된 운영자 아이디는 복구가 불가능합니다.",
      subBtn: "취소",
      mainBtn: "삭제",
      onFunc: () => {
        adminDelete({ memberNo });
      },
    });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <MorphismBox $h="100%">
        <SubTitle title="운영자 목록" />
        {getAdmin === undefined ? null : getAdmin.content.length === 0 ? (
          <NoItem text="등록된 하위 운영자가 없습니다." />
        ) : (
          <Column $gap="22px">
            <Table
              tableW="fit-content"
              headers={adminHeaders}
            >
              {getAdmin &&
                getAdmin.content.map(({ roleName, id, memberNo }) => {
                  return (
                    <tr key={memberNo}>
                      <TableCell>
                        <Row
                          $gap="8px"
                          $jus="center"
                        >
                          <BlueBtn
                            $pad="4px 12px"
                            $w="fit-content"
                            msg="수정"
                            onClick={() => navigate(`/a.modify/${id}/${memberNo}`)}
                          />
                          <WhiteBtn
                            $pad="4px 12px"
                            $w="fit-content"
                            msg="삭제"
                            onClick={() => isDelete(memberNo)}
                          />
                        </Row>
                      </TableCell>
                      <TableCell>{id}</TableCell>
                      <TableCell>{roleName}</TableCell>
                    </tr>
                  );
                })}
            </Table>
          </Column>
        )}
      </MorphismBox>

      <Paging pageData={getAdmin} />
    </>
  );
}
